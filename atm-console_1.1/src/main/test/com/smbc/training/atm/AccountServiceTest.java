package com.smbc.training.atm;

import static org.junit.Assert.assertEquals;

import java.math.BigDecimal;

import org.junit.Test;

import com.smbcgroup.training.atm.AccountService;
import com.smbcgroup.training.atm.AccountNotFoundException;
import com.smbcgroup.training.atm.InvalidAmountException;
import com.smbcgroup.training.atm.dao.AccountDAO;

public class AccountServiceTest {

	private MockAccountDAO mockDAO = new MockAccountDAO();
	private AccountService service = new AccountService(mockDAO);

	@Test(expected = AccountNotFoundException.class)
	public void test_getAccountBalance_Fail() throws Exception {
		mockDAO.stub_getAccountBalance(new AccountNotFoundException());
		service.getAccountBalance("000000");
	}

	@Test
	public void test_getAccountBalance_Success() throws Exception {
		mockDAO.stub_getAccountBalance(BigDecimal.valueOf(100));
		assertEquals(BigDecimal.valueOf(100), service.getAccountBalance("100.00"));
	}

	@Test(expected = InvalidAmountException.class)
	public void test_deposit_Fail() throws Exception {
		mockDAO.stub_getAccountBalance(BigDecimal.valueOf(100));
		service.deposit("jwong", "123456", BigDecimal.valueOf(-1));
	}

	@Test
	public void test_deposit_Success() throws Exception {
		mockDAO.stub_getAccountBalance(BigDecimal.valueOf(100));
		service.deposit("jwong", "123456", BigDecimal.valueOf(50));
		Object[] captureArgs = mockDAO.spy_updateAccountBalance();
		assertEquals("123456", captureArgs[0]);
		assertEquals(BigDecimal.valueOf(150), captureArgs[1]);
		Object[] transactionArgs = mockDAO.spy_updateUserTransactions();
		assertEquals("jwong", transactionArgs[0]);
		assertEquals("123456", transactionArgs[1]);
		assertEquals(BigDecimal.valueOf(50), transactionArgs[2]);
		assertEquals("Deposit", transactionArgs[3]);
		assertEquals("+", transactionArgs[4]);
	}

	@Test(expected = InvalidAmountException.class)
	public void test_withdraw_checkPositive() throws Exception {
		mockDAO.stub_getAccountBalance(BigDecimal.valueOf(100));
		service.withdraw("jwong", "123456", BigDecimal.valueOf(-1));
	}
	
	@Test(expected = InvalidAmountException.class)
	public void test_withdraw_lessThanTen() throws Exception {
		mockDAO.stub_getAccountBalance(BigDecimal.valueOf(100));
		service.withdraw("jwong", "123456", BigDecimal.valueOf(100));
	}
	
	@Test
	public void test_withdraw_Success() throws Exception {
		mockDAO.stub_getAccountBalance(BigDecimal.valueOf(100));
		service.withdraw("jwong", "123456", BigDecimal.valueOf(50));
		Object[] captureArgs = mockDAO.spy_updateAccountBalance();
		assertEquals("123456", captureArgs[0]);
		assertEquals(BigDecimal.valueOf(50), captureArgs[1]);
		Object[] transactionArgs = mockDAO.spy_updateUserTransactions();
		assertEquals("jwong", transactionArgs[0]);
		assertEquals("123456", transactionArgs[1]);
		assertEquals(BigDecimal.valueOf(50), transactionArgs[2]);
		assertEquals("Withdraw", transactionArgs[3]);
		assertEquals("-", transactionArgs[4]);
	}
	


	private static class MockAccountDAO implements AccountDAO {

		private String[] getUserAccounts_value;
		private RuntimeException getUserAccounts_exception;

		@Override
		public String[] getUserAccounts(String userId) {
			return getUserAccounts_value;
		}

		public void stub_getUserAccounts(String[] accounts) {
			getUserAccounts_value = accounts;
		}

		public void stub_getUserAccounts(RuntimeException exception) {
			getUserAccounts_exception = exception;
		}

		private BigDecimal getAccountBalance_value;
		private AccountNotFoundException getAccountBalance_exception;

		@Override
		public BigDecimal getAccountBalance(String accountNumber) {
			return getAccountBalance_value;
		}

		public void stub_getAccountBalance(BigDecimal balance) {
			getAccountBalance_value = balance;
		}

		public void stub_getAccountBalance(AccountNotFoundException exception) {
			getAccountBalance_exception = exception;
		}

		private String[] getUserTransactions_value;
		private RuntimeException getUserTransactions_exception;

		@Override
		public String[] getUserTransactions(String userId) {
			return getUserTransactions_value;
		}

		public void stub_getUserTransactions(String[] transactions) {
			getUserTransactions_value = transactions;
		}

		public void stub_getUserTransactions(RuntimeException exception) {
			getUserTransactions_exception = exception;
		}

		private Object[] updateAccountBalance_capture;

		@Override
		public void updateAccountBalance(String accountNumber, BigDecimal balance) {
			updateAccountBalance_capture = new Object[] { accountNumber, balance };
		}

		public Object[] spy_updateAccountBalance() {
			return updateAccountBalance_capture;
		}

		private Object[] updateUserTransactions_capture;

		@Override
		public void updateUserTransactions(String userId, String accountNumber, BigDecimal amount, String type,
				String sign) {
			updateUserTransactions_capture = new Object[] { userId, accountNumber, amount, type, sign };
		}

		public Object[] spy_updateUserTransactions() {
			return updateUserTransactions_capture;
		}

		private String clearUserTransactions_capture;

		@Override
		public void clearUserTransactions(String userId) {
			clearUserTransactions_capture = userId;
		}

		public String spy_clearUserTransactions() {
			return clearUserTransactions_capture;
		}

		private Object[] createAccount_capture;

		@Override
		public void createAccount(String userId, String accountNumber) {
			createAccount_capture = new Object[] { userId, accountNumber };
		}

		public Object[] spy_createAccount() {
			return createAccount_capture;
		}

	}

}
