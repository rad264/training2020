package com.smbcgroup.training.atm;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import java.math.BigDecimal;

import org.junit.Test;

import com.smbcgroup.training.atm.ATMServiceException.Type;
import com.smbcgroup.training.atm.dao.AccountDAO;
import com.smbcgroup.training.atm.dao.AccountNotFoundException;
import com.smbcgroup.training.atm.dao.UserNotFoundException;

public class ATMServiceTest {

	private MockAccountDAO mockDAO = new MockAccountDAO();
	private ATMService service = new ATMService(mockDAO);

	@Test(expected = UserNotFoundException.class)
	public void testGetUserAccounts_AccountNumberDoesntExist() throws Exception {
		mockDAO.stub_getUserAccounts(new UserNotFoundException());
		service.getUserAccounts("rdelaney");
	}

	@Test
	public void testGetUserAccounts_Success() throws Exception {
		mockDAO.stub_getUserAccounts(new String[] { "123456" });
		assertArrayEquals(new String[] { "123456" }, service.getUserAccounts("rdelaney"));
	}

	@Test(expected = AccountNotFoundException.class)
	public void testGetBalance_AccountNumberDoesntExist() throws Exception {
		mockDAO.stub_getAccountBalance(new AccountNotFoundException());
		service.getBalance("123456");
	}

	@Test
	public void testGetBalance_Success() throws Exception {
		mockDAO.stub_getAccountBalance(new BigDecimal("100.00"));
		assertEquals(new BigDecimal("100.00"), service.getBalance("123456"));
	}

	@Test
	public void testDeposit_AccountNumberDoesntExist() throws Exception {
		mockDAO.stub_getAccountBalance(new AccountNotFoundException());
		try {
			service.deposit("123456", new BigDecimal("99.99"));
			fail();
		} catch (AccountNotFoundException e) {
			assertAccountBalanceNotUpdated();
		}
	}

	@Test
	public void testDeposit_NegativeNumber() throws Exception {
		mockDAO.stub_getAccountBalance(new BigDecimal("100.00"));
		try {
			service.deposit("123456", new BigDecimal("-99.99"));
			fail();
		} catch (ATMServiceException e) {
			assertEquals(Type.NON_POSITIVE_AMOUNT, e.getType());
			assertAccountBalanceNotUpdated();
		}
	}

	@Test
	public void testDeposit_Success() throws Exception {
		mockDAO.stub_getAccountBalance(new BigDecimal("100.00"));
		service.deposit("123456", new BigDecimal("99.99"));
		Object[] capturedArgs = mockDAO.spy_updateAccountBalance();
		assertEquals("123456", capturedArgs[0]);
		assertEquals(new BigDecimal("199.99"), capturedArgs[1]);
	}

	@Test
	public void testWithdraw_AccountNumberDoesntExist() throws Exception {
		mockDAO.stub_getAccountBalance(new AccountNotFoundException());
		try {
			service.withdraw("123456", new BigDecimal("99.99"));
			fail();
		} catch (AccountNotFoundException e) {
			assertAccountBalanceNotUpdated();
		}
	}

	@Test
	public void testWithdraw_NegativeNumber() throws Exception {
		mockDAO.stub_getAccountBalance(new BigDecimal("100.00"));
		try {
			service.deposit("123456", new BigDecimal("-99.99"));
			fail();
		} catch (ATMServiceException e) {
			assertEquals(Type.NON_POSITIVE_AMOUNT, e.getType());
			assertAccountBalanceNotUpdated();
		}
	}

	@Test
	public void testWithdraw_InsufficientFunds() throws Exception {
		mockDAO.stub_getAccountBalance(new BigDecimal("100.00"));
		try {
			service.withdraw("123456", new BigDecimal("90.01"));
			fail();
		} catch (ATMServiceException e) {
			assertEquals(Type.INSUFFICIENT_FUNDS, e.getType());
			assertAccountBalanceNotUpdated();
		}
	}

	@Test
	public void testWithdraw_Success() throws Exception {
		mockDAO.stub_getAccountBalance(new BigDecimal("100.00"));
		service.withdraw("123456", new BigDecimal("90"));
		Object[] capturedArgs = mockDAO.spy_updateAccountBalance();
		assertEquals("123456", capturedArgs[0]);
		assertEquals(new BigDecimal("10.00"), capturedArgs[1]);
	}

	private void assertAccountBalanceNotUpdated() {
		Object[] capturedArgs = mockDAO.spy_updateAccountBalance();
		assertArrayEquals((Object[]) null, capturedArgs);
	}

	private static class MockAccountDAO implements AccountDAO {

		private String[] getUserAccounts_value;
		private UserNotFoundException getUserAccounts_exception;

		@Override
		public String[] getUserAccounts(String userId) throws UserNotFoundException {
			if (getUserAccounts_exception != null)
				throw getUserAccounts_exception;
			return getUserAccounts_value;
		}

		public void stub_getUserAccounts(String[] accounts) {
			getUserAccounts_value = accounts;
		}

		public void stub_getUserAccounts(UserNotFoundException exception) {
			getUserAccounts_exception = exception;
		}

		private BigDecimal getAccountBalance_value;
		private AccountNotFoundException getAccountBalance_exception;

		@Override
		public BigDecimal getAccountBalance(String accountNumber) throws AccountNotFoundException {
			if (getAccountBalance_exception != null)
				throw getAccountBalance_exception;
			return getAccountBalance_value;
		}

		public void stub_getAccountBalance(BigDecimal balance) {
			getAccountBalance_value = balance;
		}

		public void stub_getAccountBalance(AccountNotFoundException exception) {
			getAccountBalance_exception = exception;
		}

		private Object[] updateAccountBalance_capture;

		@Override
		public void updateAccountBalance(String accountNumber, BigDecimal balance) {
			updateAccountBalance_capture = new Object[] { accountNumber, balance };
		}

		public Object[] spy_updateAccountBalance() {
			return updateAccountBalance_capture;
		}

	}

}
