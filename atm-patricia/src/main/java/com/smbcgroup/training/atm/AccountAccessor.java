package com.smbcgroup.training.atm;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.sql.Timestamp;
import java.util.Random;

import java.util.ArrayList;
import java.util.Arrays;

public class AccountAccessor {
	
	public static String createAccount(String userId) {
		try {
			String newAccount = generateAccountNumber(userId);
			stringToResource("data/users/" + userId, "," + newAccount);
			accountFileCreation(newAccount);
			return newAccount;
		} catch (Exception e) {
			throw new RuntimeException("Failed to create account for user: " + userId, e);
		}
	}

	public static String[] getUserAccounts(String userId) {
		try {
			return resourceToString("data/users/" + userId).split(",");
		} catch (Exception e) {
			throw new RuntimeException("Failed to read accouns for user: " + userId, e);
		}
	}
	
	public static BigDecimal getAccountBalance(String accountNumber) {
		try {
			return new BigDecimal(resourceToString("data/accounts/" + accountNumber).split("\n")[0]);
		} catch (Exception e) {
			throw new RuntimeException("Failed to read balance for account: " + accountNumber, e);
		}
	}
	
	public static String getAccountActivity(String accountNumber) {
		try {
			return resourceToString("data/accounts/" + accountNumber + "history");
		} catch (Exception e) {
			throw new RuntimeException("Failed to get account activity for account: " + accountNumber, e);
		}
	}
	
	public static boolean deposit(String accountNumber, String amount) {
		try {
			String newBalance = (getAccountBalance(accountNumber).add(new BigDecimal(amount))).toString();
			logging(accountNumber, null, newBalance, amount, "deposit");
			return true;
		} catch (NumberFormatException e) {
			return false;
		} catch (IOException e) {
			throw new RuntimeException("Failed to deposit for account: " + accountNumber, e);
		}
	}
	
	public static boolean withdraw(String accountNumber, String amount) {
		try {
			String newBalance = (getAccountBalance(accountNumber).subtract(new BigDecimal(amount))).toString();
			logging(accountNumber, null, newBalance, amount, "withdraw");
			return true;
		} catch (NumberFormatException e) {
			return false;
		} catch (IOException e) {
			throw new RuntimeException("Failed to deposit for account: " + accountNumber, e);
		}
	}
	
	public static void transfer(String homeAccount, String destinationAccount, String amount) {
		try {
			logging(homeAccount, destinationAccount, null, amount, "transferPartOne");
			withdraw(homeAccount, amount);
			deposit(destinationAccount, amount);
			logging(homeAccount, destinationAccount, null, amount, "transferPartTwo");
			
		} catch (Exception e) {
			throw new RuntimeException("Failed to transfer from " + homeAccount + " to " + destinationAccount);
		}
	}
	
	public static String withdrawSuccess(String accountNumber, String amount) {
		try {
			if (!(getAccountBalance(accountNumber).subtract(new BigDecimal(amount)).compareTo(BigDecimal.ZERO) == 1))
				return "False";
			return "True";
		} catch (NumberFormatException e) {
			return "Error";
		}
	}
	
	private static void logging(String homeAccount, String destinationAccount, String newBalance, String amount, String transactionType) throws IOException {
		switch (transactionType) {
		case "withdraw":
			stringToResourceReplace("data/accounts/" + homeAccount, newBalance);
			stringToResource("data/accounts/" + homeAccount+"history", logTime() + " -" + amount + " | Balance: " + newBalance + "\n");
			return;
		case "deposit":
			stringToResourceReplace("data/accounts/" + homeAccount, newBalance);
			stringToResource("data/accounts/" + homeAccount+"history", logTime() + " +" + amount + " | Balance: " + newBalance + "\n");
			return;
		case "transferPartOne":
			stringToResource("data/accounts/" + homeAccount+"history", logTime() + " --- TRANSFER TO ACCOUNT #" + destinationAccount + "\n");
			stringToResource("data/accounts/" + destinationAccount+"history", logTime() + " --- TRANSFER FROM ACCOUNT #" + homeAccount + "\n");
			return;
		case "transferPartTwo":
			stringToResource("data/accounts/" + homeAccount+"history", logTime() + " ---"+"\n");
			stringToResource("data/accounts/" + destinationAccount+"history", logTime() + " ---"+"\n");
			return;
		}
	}
	
	private static String generateAccountNumber(String userId) {
		String accountNumber = Integer.toString(new Random().nextInt(900000) + 100000);
		ArrayList<String> existingAccounts = new ArrayList<>(Arrays.asList(getUserAccounts(userId)));
		if (existingAccounts.contains(accountNumber)) accountNumber = Integer.toString(new Random().nextInt(900000) + 100000);
		return accountNumber;
	}
	
	private static void accountFileCreation(String newAccount) throws IOException {
		Files.createFile(Paths.get("data/accounts/" + newAccount + ".txt"));
		stringToResource("data/accounts/" + newAccount, "0.00\n");
		Files.createFile(Paths.get("data/accounts/" + newAccount + "history.txt"));
		stringToResource("data/accounts/" + newAccount + "history", new Timestamp(System.currentTimeMillis()) + " Account creation - 0.00\n");
	}
	
	private static Timestamp logTime() {
		return new Timestamp(System.currentTimeMillis());
	}

	private static String resourceToString(String fileName) throws IOException {
		return Files.readString(Path.of(fileName + ".txt"));
	}
	
	private static void stringToResource(String fileName, String addition) throws IOException {
		Files.write(Path.of(fileName + ".txt"), addition.getBytes(), StandardOpenOption.APPEND);
	}
	
	private static void stringToResourceReplace(String fileName, String addition) throws IOException {
		Files.write(Path.of(fileName + ".txt"), addition.getBytes(), StandardOpenOption.WRITE);
	}

}
