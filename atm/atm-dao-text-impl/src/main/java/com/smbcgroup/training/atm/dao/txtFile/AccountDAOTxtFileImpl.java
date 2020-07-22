package com.smbcgroup.training.atm.dao.txtFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;

import com.smbcgroup.training.atm.dao.AccountDAO;
import com.smbcgroup.training.atm.dao.AccountNotFoundException;
import com.smbcgroup.training.atm.dao.UserNotFoundException;

public class AccountDAOTxtFileImpl implements AccountDAO {

	static String dataLocation = "data/";

	@Override
	public String[] getUserAccounts(String userId) throws UserNotFoundException {
		try {
			return resourceToString(dataLocation + "users/" + userId).split(",");
		} catch (Exception e) {
			System.out.println("IO exception: " + e.getMessage());
			throw new UserNotFoundException("Failed to read accouns for user: " + userId, e);
		}
	}

	@Override
	public BigDecimal getAccountBalance(String accountNumber) throws AccountNotFoundException {
		try {
			return new BigDecimal(resourceToString(dataLocation + "accounts/" + accountNumber));
		} catch (Exception e) {
			throw new AccountNotFoundException("Failed to read balance for account: " + accountNumber, e);
		}
	}

	@Override
	public void updateAccountBalance(String accountNumber, BigDecimal balance) {
		try {
			writeStringToFile(dataLocation + "accounts/" + accountNumber, balance.toPlainString());
		} catch (IOException e) {
			throw new RuntimeException("Failed to update balance for account: " + accountNumber, e);
		}
	}

	private static String resourceToString(String fileName) throws IOException {
		return Files.readString(Path.of(fileName + ".txt"));
	}

	private static void writeStringToFile(String fileName, String newContents) throws IOException {
		Files.writeString(Path.of(fileName + ".txt"), newContents);
	}

}
