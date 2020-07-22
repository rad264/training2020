package com.smbcgroup.training.atm.dao.txtFile;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import com.smbcgroup.training.atm.dao.AccountDAO;
import com.smbcgroup.training.atm.dao.AccountNotFoundException;
import com.smbcgroup.training.atm.dao.UserNotFoundException;

public class AccountDAOTxtFileImplTest {

	private static final String TEST_DATA_LOCATION = "test-data/";

	private AccountDAO accountDAO = new AccountDAOTxtFileImpl();

	@BeforeClass
	public static void changeDataLocation() {
		AccountDAOTxtFileImpl.dataLocation = TEST_DATA_LOCATION;
	}

	@Before
	public void createData() throws IOException {
		clearFolder("users");
		clearFolder("accounts");
		Files.writeString(Path.of(TEST_DATA_LOCATION + "users/rdelaney.txt"), "123456", StandardOpenOption.CREATE_NEW);
		Files.writeString(Path.of(TEST_DATA_LOCATION + "accounts/123456.txt"), "100.00", StandardOpenOption.CREATE_NEW);
	}

	private static void clearFolder(String folder) throws IOException {
		try (DirectoryStream<Path> entries = Files.newDirectoryStream(Path.of(TEST_DATA_LOCATION + folder))) {
			for (Path entry : entries) {
				Files.delete(entry);
			}
		}
	}

	@Test(expected = UserNotFoundException.class)
	public void testGetUserAccounts_UserFileDoesntExist() throws Exception {
		accountDAO.getUserAccounts("schan");
	}

	@Test
	public void testGetUserAccounts_Success() throws Exception {
		String[] accounts = accountDAO.getUserAccounts("rdelaney");
		assertArrayEquals(new String[] { "123456" }, accounts);
	}

	@Test(expected = AccountNotFoundException.class)
	public void testGetAccountBalance_AccountFileDoesntExist() throws Exception {
		accountDAO.getAccountBalance("123457");
	}

	@Test
	public void testGetAccountBalance_Success() throws Exception {
		BigDecimal balance = accountDAO.getAccountBalance("123456");
		assertEquals(new BigDecimal("100.00"), balance);
	}

	@Test
	public void testUpdateAccountBalance_AccountFileDoesntExist() throws Exception {
		accountDAO.updateAccountBalance("123457", new BigDecimal("200.00"));
		assertEquals("200.00", Files.readString(Path.of(TEST_DATA_LOCATION + "accounts/123457.txt")));
	}

	@Test
	public void testUpdateAccountBalance_Success() throws Exception {
		accountDAO.updateAccountBalance("123456", new BigDecimal("1000.00"));
		assertEquals("1000.00", Files.readString(Path.of(TEST_DATA_LOCATION + "accounts/123456.txt")));
	}

}
