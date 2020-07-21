package com.smbcgroup.training.account_accessor;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Calendar;
import java.util.Random;

public class AccountAccessor {

	public static String[] getUserAccounts(String userId) {
		try {
			return resourceToString("data/users/" + userId).split(",");
		} catch (Exception e) {
			throw new RuntimeException("Failed to read account for user: " + userId, e);
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
			writeStringToFile("data/accounts/" + accountNumber, balance.toPlainString());
		} catch (IOException e) {
			throw new RuntimeException("Failed to update account balance for" + accountNumber, e);
		}
	}
	
	public static String createNewAccount(String userId) {
		try {
			
			Integer random = (new Random().nextInt(900000) + 100000);
			String accountNumber = random.toString();
			
			File file = new File("data/accounts/" + accountNumber + ".txt");
			while(file.exists()) {
				random = (new Random().nextInt(900000) + 100000);
				accountNumber = random.toString();
				file = new File("data/accounts/" + accountNumber + ".txt");
			}
			
			createFile("data/accounts/" + accountNumber);
			writeStringToFile("data/accounts/" + accountNumber, "0.00");

			String currentAccounts = resourceToString("data/users/" + userId);
			currentAccounts += "," + accountNumber;
			
			writeStringToFile("data/users/" + userId, currentAccounts);

			return accountNumber;
			
		} catch (Exception e) {
			throw new RuntimeException("Failed to create account for user: " + userId, e);
		}
	}
	
	public static String getAccountHistory(String accountNumber) {
		try{
			return resourceToString("data/audit/" + accountNumber);
		} catch (Exception e) {
			throw new RuntimeException("Failed to retrieve audit history for" + accountNumber, e);

		}
	}
	
	public static void appendAudit(String accountNumber, String action) {
		try {
			String path = "data/audit/" + accountNumber;
			File file = new File(path + ".txt");
			if(!file.exists()) {
				createFile(path);
			}
			String contents = resourceToString(path);
			
			contents += action;
			
			writeStringToFile(path,contents);
		}
		catch (Exception e) {
			throw new RuntimeException("Failed to append audit for: " + accountNumber, e);
		}

		
	}
	
	private class AccountNotFoundException extends Exception {
		public AccountNotFoundException(String message) {
			super(message);
		}
	}

	
	private static void writeStringToFile(String fileName, String newContents) throws IOException  {
		FileWriter fileWriter = new FileWriter(new File(fileName + ".txt"), false);
		fileWriter.write(newContents);
		fileWriter.close();
	}
	
	private static void createFile(String fileName) throws IOException {
		FileWriter fileWriter = new FileWriter(fileName + ".txt");
		fileWriter.close();
	}

	private static String resourceToString(String fileName) throws IOException {
		return Files.readString(Path.of(fileName + ".txt"));
	}


}
