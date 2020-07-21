package com.smbcgroup.training.atm;

import static org.junit.jupiter.api.Assertions.*;

import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.smbcgroup.training.account_dao.AccountDAO;
import com.smbcgroup.training.account_service.AccountService;


class TestAccountService {

	private Map<String,BigDecimal> accountBalances;
	private AccountService service;
	private static final String testUserId = "test";
	private static final String testAccount1 = "111111";
	private static final String testAccount1InitialBalance = "100.00";
	private static final String testAccount2 = "222222";
	private static final String testAccount2InitialBalance = "200.00";

	
	
	@BeforeEach
	void setup() {
		accountBalances = new HashMap<String,BigDecimal>();
		accountBalances.put(testAccount1, new BigDecimal(testAccount1InitialBalance));
		accountBalances.put(testAccount2, new BigDecimal(testAccount2InitialBalance));

		service = new AccountService(new MockAccountDAO(accountBalances));
		
		service.setLoggedInUser(testUserId);
		service.setSelectedAccount(testAccount1);
		service.setUserAccounts((new String[] {testAccount1, testAccount2}));
		
	}
	
	@Test
	void testLoginSetsCorrectUser() {
		service.setUserAccounts(null);
		service.setLoggedInUser(null);
		
		try {
			service.login(testUserId);
			assertEquals(testUserId, service.getLoggedInUser());
			assertArrayEquals((new String[] {testAccount1, testAccount2}), service.getUserAccounts());			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	@Test
	void testChangeAccount() {
		service.setSelectedAccount(null);

		try {
			service.changeAccount(testAccount1);
			assertEquals(testAccount1, service.getSelectedAccount());			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Test
	void testCheckBalance() {
		try {
			assertEquals(new BigDecimal(testAccount1InitialBalance), service.checkBalance());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Test
	void testDeposit() {
		try {
			String depositAmount = "150.73";
			service.deposit(new BigDecimal(depositAmount ));
			assertEquals((new BigDecimal(testAccount1InitialBalance).add(new BigDecimal(depositAmount))), service.checkBalance());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Test
	void testWithdraw() {
		try {
			String withdrawAmount = "150.73";
			service.withdraw(new BigDecimal(withdrawAmount));
			assertEquals((new BigDecimal(testAccount1InitialBalance).subtract(new BigDecimal(withdrawAmount ))), service.checkBalance());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Test
	void testCreateAccount() {
		try {
			String expectedNewAccountNumber = "333333";
			assertEquals(expectedNewAccountNumber, service.createAccount());
			Files.deleteIfExists(Paths.get("data/audit/" + expectedNewAccountNumber + ".txt"));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Test
	void testHistory() {
		try {
			service.deposit(new BigDecimal("10"));
			assertFalse(service.history().isBlank());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	private class MockAccountDAO implements AccountDAO{

		private Map<String,BigDecimal> accountBalances = new HashMap<String,BigDecimal>();
		private Map<String,String> accountHistory = new HashMap<String,String>();
		
		public MockAccountDAO(Map<String,BigDecimal> map) {
			accountBalances = map;
		}
		
		@Override
		public String[] getUserAccounts(String userId) {
			
			return (new String[]{"111111","222222"});
		}

		@Override
		public BigDecimal getAccountBalance(String accountNumber) {
			
			return accountBalances.get(accountNumber);
		}

		@Override
		public void updateAccountBalance(String accountNumber, BigDecimal balance) {
			accountBalances.put(accountNumber, balance);
		}

		@Override
		public String createAccount(String userId) {
			// TODO Auto-generated method stub
			return "333333";
		}

		@Override
		public String getAccountHistory(String accountNumber) {
			return accountHistory.get(accountNumber);
		}

		@Override
		public void appendAudit(String accountNumber, String action) {
			accountHistory.put(accountNumber, action);
		}
		
	}
	
}
