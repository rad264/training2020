package com.smbcgroup.training.atm;

import static junit.framework.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.*;

import java.io.FileWriter;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Paths;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.smbcgroup.training.account_dao.AccountDAOStaticImpl;

class TestAccountDAOStaticImpl {

	private AccountDAOStaticImpl dao = new AccountDAOStaticImpl();
	private static final String testUserId = "test";
	private static final String testAccount1 = "111111";
	private static final String testAccount1InitialBalance = "100.00";
	private static final String testAccount2 = "222222";
	private static final String testAccount2InitialBalance = "200.00";
	
	@BeforeEach
	void setup() {
		try {
			FileWriter userWriter = new FileWriter("data/users/" + testUserId + ".txt");
			userWriter.write(testAccount1 + "," + testAccount2);
			userWriter.close();
			
			FileWriter account1Writer = new FileWriter("data/accounts/" + testAccount1 + ".txt");
			account1Writer.write(testAccount1InitialBalance);
			account1Writer.close();
			
			FileWriter account2Writer = new FileWriter("data/accounts/" + testAccount2 + ".txt");
			account2Writer.write(testAccount2InitialBalance);
			account2Writer.close();
			
		} catch (IOException e) {
			e.printStackTrace();
		}

	}
	
	@Test
	void testGetUserAccounts() {
		String[] userAccounts = dao.getUserAccounts(testUserId);
		assertEquals(2, userAccounts.length);
		assertEquals(testAccount1, userAccounts[0]);
		assertEquals(testAccount2, userAccounts[1]);
	}
	
	@Test
	void testGetUserAccounts_AccountDoesNotExist() {
		assertThrows(RuntimeException.class, () -> {
			dao.getUserAccounts("not a real id");
		});
	}
	
	@Test
	void testGetAccountBalance() {
		assertEquals(new BigDecimal(testAccount1InitialBalance), dao.getAccountBalance(testAccount1));
	}
	
	@Test
	void testUpdateAccountBalancePositiveBalance() {
		String augment = "50.13";
		dao.updateAccountBalance(testAccount1, new BigDecimal(testAccount1InitialBalance).add(new BigDecimal(augment)));
		assertEquals(new BigDecimal(testAccount1InitialBalance).add(new BigDecimal(augment)), dao.getAccountBalance(testAccount1));
	}
	
	@Test
	void testUpdateAccountBalance_FailsOnNull() {
		assertThrows(RuntimeException.class, () -> {
			dao.updateAccountBalance(testAccount1, null);
		});
	
	}
	

	@Test
	void testUpdateAccountBalanceNegativeBalance() {
		String augment = "150.13";
		dao.updateAccountBalance(testAccount1, new BigDecimal(testAccount1InitialBalance).subtract(new BigDecimal(augment)));
		assertEquals(new BigDecimal(testAccount1InitialBalance).subtract(new BigDecimal(augment)), dao.getAccountBalance(testAccount1));
	}
	
	
	@Test
	void testAppendAudit() {
		String testAuditMessage = "Test audit";
		dao.appendAudit(testAccount1, testAuditMessage);
		assertTrue(Files.exists(Paths.get("data/audit/" + testAccount1 + ".txt")));
	}
	
	@Test
	void testGetAccountHistory() {
		String testAuditMessage = "Test audit";
		dao.appendAudit(testAccount1, testAuditMessage);
		assertEquals(testAuditMessage, dao.getAccountHistory(testAccount1));
	}
	
	@Test
	void testCreateAccount() throws IOException {
		String newAccountNumber = dao.createAccount(testUserId);
		assertTrue(Files.exists(Paths.get("data/accounts/" + newAccountNumber + ".txt")));
		
		Files.deleteIfExists(Paths.get("data/accounts/" + newAccountNumber + ".txt"));
	}
	
	@Test
	void testCreateAccountCreates6CharacterAccountNumbers() throws IOException {
		String newAccountNumber = dao.createAccount(testUserId);
		assertEquals(6,newAccountNumber.length());
		Files.deleteIfExists(Paths.get("data/accounts/" + newAccountNumber + ".txt"));
	}
	
	@AfterEach
	void teardown() {
		try {

			Files.deleteIfExists(Paths.get("data/users/" + testUserId + ".txt"));
			Files.deleteIfExists(Paths.get("data/accounts/" + testAccount1 + ".txt"));
			Files.deleteIfExists(Paths.get("data/accounts/" + testAccount2 + ".txt"));
			Files.deleteIfExists(Paths.get("data/audit/" + testAccount1 + ".txt"));


		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
	}

}
