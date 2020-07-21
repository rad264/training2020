package com.smbc.training.atm.dao.txtFileImpl;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

public class AccountAccessor {

	public static String[] getUserAccounts(String userId) {
		try {
			return resourceToString("data/users/" + userId).split(",");
		} catch (Exception e) {
			throw new RuntimeException("Failed to read accounts for user: " + userId, e);
		}
	}

	public static BigDecimal getAccountBalance(String accountNumber) {
		try {
			return new BigDecimal(resourceToString("data/accounts/" + accountNumber));
		} catch (Exception e) {
			throw new RuntimeException("Failed to read balance for account: " + accountNumber, e);
		}
	}

	public static void updateAccountBalance(String accountNumber, BigDecimal balance) {
		try {
			writeStringToFile("data/accounts/" + accountNumber, bigDecToString(balance));
		} catch (Exception e) {
			throw new RuntimeException("Failed to update balance for account: " + accountNumber, e);
		}
	}

	public static void updateTransactions(String userId, String accountNumber, BigDecimal amount, String type,
			String sign) {
		try {
			appendStringToFile("data/transactions/" + userId,
					"," + type + "(" + accountNumber + "): " + sign + "$" + bigDecToString(amount));
		} catch (Exception e) {
			throw new RuntimeException("Failed to update accounts for user: " + userId, e);
		}
	}

	public static void clearTransactions(String userId) {
		try {
			writeStringToFile("data/transactions/" + userId, "");
		} catch (Exception e) {
			throw new RuntimeException("Failed to clear transactions for user: " + userId, e);
		}
	}

	public static void createAccount(String userId, String accountNumber) {
		try {
			appendStringToFile("data/users/" + userId, "," + accountNumber);
			writeStringToFile("data/accounts/" + accountNumber, "0.00");
		} catch (Exception e) {
			throw new RuntimeException("Failed to create account with number: " + accountNumber, e);
		}
	}

	public static String[] getTransactions(String userId) {
		try {
			return resourceToString("data/transactions/" + userId).split(",");
		} catch (Exception e) {
			throw new RuntimeException("Failed to read transactions for user: " + userId, e);
		}
	}

	private static String resourceToString(String fileName) throws IOException {
		return Files.readString(Path.of(fileName + ".txt"));
	}

	private static void writeStringToFile(String fileName, String content) throws IOException {
		Files.writeString(Path.of(fileName + ".txt"), content);
	}

	private static void appendStringToFile(String fileName, String content) throws IOException {
		Files.writeString(Path.of(fileName + ".txt"), content, StandardOpenOption.APPEND);
	}

	private static String bigDecToString(BigDecimal d) {
		return d.setScale(2, RoundingMode.CEILING).toString();
	}

}
