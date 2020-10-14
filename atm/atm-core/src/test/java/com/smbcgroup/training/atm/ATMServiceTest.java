package com.smbcgroup.training.atm;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertSame;
import static org.junit.Assert.fail;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import com.smbcgroup.training.atm.ATMServiceException.Type;
import com.smbcgroup.training.atm.dao.AccountDAO;
import com.smbcgroup.training.atm.dao.AccountNotFoundException;
import com.smbcgroup.training.atm.dao.InsufficientBalanceException;
import com.smbcgroup.training.atm.dao.UserNotFoundException;

public class ATMServiceTest { 

	private MockAccountDAO mockDAO = new MockAccountDAO(); 
	private ATMService service = new ATMService(mockDAO);

	@Test(expected = UserNotFoundException.class)
	public void testgetUser_AccountNumberDoesntExist() throws Exception {
		mockDAO.stub_getUser(new UserNotFoundException());
		service.getUser("rdelaney");
	}

	@Test
	public void testgetUser_Success() throws Exception {
		User user = new User();
		user.setAccounts(new String[] { "123456" });
		mockDAO.stub_getUser(user);
		assertArrayEquals(new String[] { "123456" }, service.getUser("rdelaney").getAccounts());
	}

	@Test(expected = AccountNotFoundException.class)
	public void testGetAccount_AccountNumberDoesntExist() throws Exception {
		mockDAO.stub_getAccount(new AccountNotFoundException());
		service.getAccount("123456");
	}

	@Test
	public void testGetAccount_Success() throws Exception {
		Account account = new Account();
		account.setAccountNumber("123456");
		account.setBalance(new BigDecimal("100.00"));
		mockDAO.stub_getAccount(account);
		assertSame(account, service.getAccount("123456"));
	}
	
	@Test(expected = UserNotFoundException.class)
	public void testCreateAccount_UserDoesntExist() throws Exception {
		mockDAO.stub_getUser(new UserNotFoundException());
		service.createAccount("schan");
	}
	
	@Test(expected = AccountNotFoundException.class)
	public void testCreateAccount_AccountNumberDoesntExist() throws Exception {
		User user = new User();
		user.setUserId("pkusuma");
		user.setAccounts(new String[] {"123456"});
		Account account = new Account();
		account.setAccountNumber("123456");
		account.setBalance(BigDecimal.ZERO);
		mockDAO.stub_getUser(user);
		mockDAO.stub_createAccount(new AccountNotFoundException());
		service.createAccount("pkusuma"); 
	}
	
	@Test
	public void testCreateAccount_Success() throws Exception {
		User user = new User();
		user.setUserId("pkusuma");
		user.setAccounts(new String[] {"123456"});
		Account account = new Account();
		account.setAccountNumber("123456");
		account.setBalance(BigDecimal.ZERO);
		mockDAO.stub_getUser(user);
		mockDAO.createAccount(account, user);
		mockDAO.writeAccountLog("123456", "creation", BigDecimal.ZERO);
		service.createAccount("pkusuma");
		assertEquals(user, mockDAO.spyUser_createAccount());
	}

	@Test(expected = AccountNotFoundException.class)
	public void testDeposit_AccountNumberDoesntExist() throws Exception {
		mockDAO.stub_deposit(new AccountNotFoundException());
		service.deposit("123456", new BigDecimal("99.99"));
	}

	@Test
	public void testDeposit_Success() throws Exception {
		mockDAO.deposit("123456", new BigDecimal("99.99"));
		mockDAO.writeAccountLog("123456", "deposit", new BigDecimal(99.99));
		service.deposit("123456", new BigDecimal("99.99"));
		assertEquals("123456", mockDAO.spyAccountNumber_deposit());
		assertEquals(new BigDecimal("99.99"), mockDAO.spyAmount_deposit());
		assertEquals("deposit", mockDAO.spyTransaction_writeAccountLog());
	}
	
	@Test(expected = InsufficientBalanceException.class)
	public void testWithdraw_InsufficientFunds() throws Exception {
		mockDAO.stub_withdraw(new InsufficientBalanceException());
		service.withdraw("123456", new BigDecimal("99.99"));
	}
	
	@Test(expected = AccountNotFoundException.class)
	public void testWithdraw_AccountNumberDoesntExist() throws Exception {
		mockDAO.stub_withdraw(new AccountNotFoundException());
		service.withdraw("123456", new BigDecimal("99.99"));
	}

	@Test
	public void testWithdraw_Success() throws Exception {
		mockDAO.withdraw("123456", new BigDecimal(10));
		mockDAO.writeAccountLog("123456", "withdraw", new BigDecimal(10));
		service.withdraw("123456", new BigDecimal(10));
		assertEquals("123456", mockDAO.spyAccountNumber_withdraw());
		assertEquals(new BigDecimal(10), mockDAO.spyAmount_withdraw());
		assertEquals("withdraw", mockDAO.spyTransaction_writeAccountLog());
	}
	
	@Test(expected = InsufficientBalanceException.class)
	public void testTransfer_InsufficientFunds() throws Exception {
		mockDAO.stub_withdraw(new InsufficientBalanceException());
		service.transfer("123456", "999999", new BigDecimal("99.99"));
	}
	
	@Test(expected = AccountNotFoundException.class)
	public void testTransfer_HomeAccountNumberDoesntExist() throws Exception {
		mockDAO.stub_withdraw(new AccountNotFoundException());
		service.transfer("123456", "999999", new BigDecimal("99.99"));
	}
	
	@Test(expected = AccountNotFoundException.class)
	public void testTransfer_DestinationAccountNumberDoesntExist() throws Exception {
		mockDAO.withdraw("123456", new BigDecimal(10));
		mockDAO.writeAccountLog("123456", "transfer to " + "999999", new BigDecimal(10));
		mockDAO.stub_deposit(new AccountNotFoundException());
		service.transfer("123456", "999999", new BigDecimal("99.99"));
	}
	
	@Test
	public void testTransfer_Success() throws Exception {
		mockDAO.withdraw("123456", new BigDecimal(10));
		mockDAO.writeAccountLog("123456", "transfer to " + "999999", new BigDecimal(10));
		mockDAO.deposit("999999", new BigDecimal(10));
		mockDAO.writeAccountLog("999999", "transfer from " + "123456", new BigDecimal(10));
		service.transfer("123456", "999999", new BigDecimal(10));
		assertEquals("123456", mockDAO.spyAccountNumber_withdraw());
		assertEquals("999999", mockDAO.spyAccountNumber_deposit());
	}
	
	@Test(expected = AccountNotFoundException.class)
	public void testGetAccountLogs_AccountNumberDoesntExist() throws Exception {
		mockDAO.stub_getAccountLogs(new AccountNotFoundException());
		service.getAccountLogs("999999");
	}
	
	@Test
	public void testGetAccountLogs_success() throws Exception {
		mockDAO.stub_getAccountLogs(new ArrayList<Logger>());
		List<Logger> result = service.getAccountLogs("999999");
		assertSame(result, mockDAO.getAccountLogs("999999"));
	}
	
	@Test(expected = UserNotFoundException.class)
	public void testGetUserAccounts_UserDoesntExist() throws Exception {
		mockDAO.stub_getUser(new UserNotFoundException());
		service.getUserAccounts("999999");
	}
	
	@Test(expected = AccountNotFoundException.class)
	public void testGetUserAccounts_AccountNumberDoesntExist() throws Exception {
		Account account = new Account();
		account.setAccountNumber("999999");
		account.setBalance(new BigDecimal(10));
		User user = new User();
		user.setUserId("pkusuma");
		user.setAccounts(new String[] {"999999"});
		mockDAO.stub_getUser(user);
		mockDAO.stub_getAccount(new AccountNotFoundException());
		service.getUserAccounts("999999");
	}
	
	@Test
	public void testGetUserAccounts_success() throws UserNotFoundException, AccountNotFoundException {
		Account account = new Account();
		account.setAccountNumber("999999");
		account.setBalance(new BigDecimal(10));
		User user = new User();
		user.setUserId("pkusuma");
		user.setAccounts(new String[] {"999999"});
		mockDAO.stub_getUser(user);
		mockDAO.stub_getAccount(account);
		List<Account> result = service.getUserAccounts("999999");
		assertSame(mockDAO.getAccount("999999"), result.get(0));
	}
	
	@Test
	public void testGetUserAccounts_NoAccounts() throws Exception {
		User user = new User();
		user.setUserId("pkusuma");
		user.setAccounts(new String[]{});
		mockDAO.stub_getUser(user);
		assertNull(service.getUserAccounts("999999"));
	}

	private static class MockAccountDAO implements AccountDAO {

		private User getUser_value;
		private UserNotFoundException getUser_exception;

		@Override
		public User getUser(String userId) throws UserNotFoundException {
			if (getUser_exception != null)
				throw getUser_exception;
			return getUser_value;
		}

		public void stub_getUser(User user) {
			getUser_value = user;
		}

		public void stub_getUser(UserNotFoundException exception) {
			getUser_exception = exception;
		}

		private Account getAccount_value;
		private AccountNotFoundException getAccount_exception;

		@Override
		public Account getAccount(String accountNumber) throws AccountNotFoundException {
			if (getAccount_exception != null)
				throw getAccount_exception;
			return getAccount_value;
		}

		public void stub_getAccount(Account account) {
			getAccount_value = account;
		}

		public void stub_getAccount(AccountNotFoundException exception) {
			getAccount_exception = exception;
		}

		private Account updateAccount_capture;

		@Override
		public void updateAccount(Account account) {
			updateAccount_capture = account;
		}

		public Account spy_updateAccount() {
			return updateAccount_capture;
		}
		
		private Account createAccount_captureAccount;
		private User createAccount_captureUser;
		private UserNotFoundException createAccount_userException;
		private AccountNotFoundException createAccount_accountException;

		@Override
		public void createAccount(Account account, User user) throws UserNotFoundException, AccountNotFoundException {
			if (createAccount_userException != null) throw createAccount_userException;
			if (createAccount_accountException != null) throw createAccount_accountException;
			createAccount_captureAccount = account;
			createAccount_captureUser = user;
			
		}
		
		public void stub_createAccount(UserNotFoundException e) {
			createAccount_userException = e;
		}
		
		public void stub_createAccount(AccountNotFoundException e) {
			createAccount_accountException = e;
		}
		
		public Account spyAccount_createAccount() {
			return createAccount_captureAccount;
		}
		
		public User spyUser_createAccount() {
			return createAccount_captureUser;
		}
		
		private String writeAccountLog_captureAccountNumber;
		private String writeAccountLog_captureTransaction;
		private BigDecimal writeAccountLog_captureAmount;
		private AccountNotFoundException writeAccountLog_exception;
		
		@Override
		public void writeAccountLog(String accountNumber, String transaction, BigDecimal amount)
				throws AccountNotFoundException {
			if (writeAccountLog_exception != null) throw writeAccountLog_exception;
			writeAccountLog_captureAccountNumber = accountNumber;
			writeAccountLog_captureTransaction = transaction;
			writeAccountLog_captureAmount = amount;
		}
		
		public void stub_writeAccountLog(AccountNotFoundException e) {
			writeAccountLog_exception = e;
		}
		
		public String spyAccountNumber_writeAccountLog() {
			return writeAccountLog_captureAccountNumber;
		}
		
		public String spyTransaction_writeAccountLog() {
			return writeAccountLog_captureTransaction;
		}
		
		public BigDecimal spyAmount_writeAccountLog() {
			return writeAccountLog_captureAmount;
		}
		
		private String deposit_accountNumber;
		private BigDecimal deposit_amount;
		private AccountNotFoundException deposit_exception;

		@Override
		public void deposit(String accountNumber, BigDecimal amount) throws AccountNotFoundException {
			if (deposit_exception != null) throw deposit_exception;
			deposit_accountNumber = accountNumber;
			deposit_amount = amount;
		}
		
		public void stub_deposit(AccountNotFoundException e) {
			deposit_exception = e;
		}
		
		public String spyAccountNumber_deposit() {
			return deposit_accountNumber;
		}
		
		public BigDecimal spyAmount_deposit() {
			return deposit_amount;
		}
		
		private String withdraw_accountNumber;
		private BigDecimal withdraw_amount;
		private AccountNotFoundException withdraw_accountException;
		private InsufficientBalanceException withdraw_insufficientException;

		@Override
		public void withdraw(String accountNumber, BigDecimal amount)
				throws AccountNotFoundException, InsufficientBalanceException {
			if (withdraw_accountException != null) throw withdraw_accountException;
			if (withdraw_insufficientException != null) throw withdraw_insufficientException;
			withdraw_accountNumber = accountNumber;
			withdraw_amount = amount;
		}
		
		public void stub_withdraw(AccountNotFoundException e) {
			withdraw_accountException = e;
		}
		
		public void stub_withdraw(InsufficientBalanceException e) {
			withdraw_insufficientException = e;
		}
		
		public String spyAccountNumber_withdraw() {
			return withdraw_accountNumber;
		}
		
		public BigDecimal spyAmount_withdraw() {
			return withdraw_amount;
		}
		
		private List<Logger> getAccountLogs_value;
		private AccountNotFoundException getAccountLogs_exception;

		@Override
		public List<Logger> getAccountLogs(String accountNumber) throws AccountNotFoundException {
			if (getAccountLogs_exception != null) throw getAccountLogs_exception;
			return getAccountLogs_value;
		}
		
		public void stub_getAccountLogs(List<Logger> logList) {
			getAccountLogs_value = logList;
		}
		
		public void stub_getAccountLogs(AccountNotFoundException e) {
			getAccountLogs_exception = e;
		}

	}

}