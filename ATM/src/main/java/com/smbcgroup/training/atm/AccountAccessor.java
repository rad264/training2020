package com.smbcgroup.training.atm;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;
import java.util.Scanner;

public class AccountAccessor {
	
	private static final String accountPath = "data/accounts/";
	private static final String userPath = "data/users/";
	private static final String transactionHistoryPath = "data/transaction_history/";
	
	public static String[] getUserAccounts(String userId) {
		try {
			return resourceToString("data/users/" + userId).split(",");
		} catch (Exception e) {
			throw new RuntimeException("Failed to read accouns for user: " + userId, e);
		}
	}

	public static BigDecimal getAccountBalance(String accountNumber) {
		try {
			return new BigDecimal(resourceToString("data/accounts/" + accountNumber));
		} catch (Exception e) {
			throw new RuntimeException("Failed to read balance for account: " + accountNumber, e);
		}
	}
	
	public static void writeAccountBalance(String accountNumber, BigDecimal deposit) {
		BigDecimal currBalance = getAccountBalance(accountNumber);
		try {
			FileWriter myWriter = new FileWriter(constructFilePath(accountPath, accountNumber));
		    BigDecimal newBalance = currBalance.add(deposit);
			myWriter.write(newBalance.toString());
		    myWriter.close();
		} catch (IOException e) {
			System.out.println("An error occurred.");
		    e.printStackTrace();
		}
	}
	
	public static void recordTransactionHistory(String transactionType, String amount, String userId, String accountNumber) throws IOException {
		Date date = new Date();
		SimpleDateFormat DateFor = new SimpleDateFormat("MM/dd/yyyy hh:mm:ss");
		String recordTime = DateFor.format(date);
		String filePath = constructFilePath(transactionHistoryPath, userId + "_" + accountNumber);
	    FileWriter myWriter = new FileWriter(filePath, true);
	    BufferedWriter br = new BufferedWriter(myWriter);
	    if (!transactionType.equals("Open account"))
	    	br.newLine();
	    br.write(transactionType + "," + amount + "," + recordTime);
	    br.close();
	    myWriter.close();
	}
	
	public static void transferMoney(String fromAccount, String toAccount, String fromUserId, String toUserId, BigDecimal amount) throws IOException {
		writeAccountBalance(toAccount, amount);
		writeAccountBalance(fromAccount, amount.negate());
		recordTransactionHistory("Transfer out", amount.toString(), fromUserId, fromAccount);
		recordTransactionHistory("Transfer in", amount.toString(), toUserId, toAccount);
	}
	
	public static String createNewUser(String userId) throws IOException {
		String accountNumber = getRandomNumberString();
		File accountFile = new File(constructFilePath(accountPath, accountNumber));
	    while (!accountFile.createNewFile()) {
	    	accountNumber = getRandomNumberString();
	    	accountFile =  new File(constructFilePath(accountPath, accountNumber));
	    }
	    File transactionHistoryFile = new File(constructFilePath(transactionHistoryPath, userId + "_" + accountNumber));
	    File userFile = new File(constructFilePath(userPath, userId));
	    userFile.createNewFile();
	    transactionHistoryFile.createNewFile();
	    FileWriter myWriter = new FileWriter(userFile);
		myWriter.write(accountNumber);
	    myWriter.close();
	    myWriter = new FileWriter(accountFile);
	    myWriter.write(Integer.toString(0));
	    myWriter.close();
	    recordTransactionHistory("Open account", "0", userId, accountNumber);
	    return accountNumber;
	}
	
	public static String addUserAccount(String userId) throws IOException {
		String accountNumber = getRandomNumberString();
		File accountFile = new File(constructFilePath(accountPath, accountNumber));
	    while (!accountFile.createNewFile()) {
	    	accountNumber = getRandomNumberString();
	    	accountFile =  new File(constructFilePath(accountPath, accountNumber));
	    }
	    File transactionHistoryFile = new File(constructFilePath(transactionHistoryPath, userId + "_" + accountNumber));
	    transactionHistoryFile.createNewFile();
	    File userFile = new File(constructFilePath(userPath, userId));
	    FileWriter myWriter = new FileWriter(userFile, true);
	    BufferedWriter br = new BufferedWriter(myWriter);
	    br.write("," + accountNumber);
	    br.close();
	    myWriter.close();
	    myWriter.close();
	    myWriter = new FileWriter(accountFile);
	    myWriter.write(Integer.toString(0));
	    myWriter.close();
	    recordTransactionHistory("Open account", "0", userId, accountNumber);
	    return accountNumber;
	}
	
	public static void printTransactionHistory(String userId, String accountNumber) {
		FileInputStream fis = null;
		try {
			fis = new FileInputStream(constructFilePath(transactionHistoryPath, userId + "_" + accountNumber));
		} catch (FileNotFoundException e) {
			System.out.println("File not found");
			e.printStackTrace();
		}
		Scanner sc = new Scanner(fis);
		while(sc.hasNextLine())  {  
			String[] currLine = sc.nextLine().split(",");
			if (currLine[0].equals("Open account")) {
				System.out.println("Account opened on " + currLine[2]);
			} else {
				System.out.println("Transaction type: " + currLine[0] + " Transaction amount: " + currLine[1] + " Transaction datetime: " + currLine[2]);
			}
		}
		sc.close();  
	}
	
	public static void printAccountSummary(String userId) {
		String[] accounts = getUserAccounts(userId);
		BigDecimal total = new BigDecimal("0");
		for (String currAccount : accounts) {
			BigDecimal currBalance = getAccountBalance(currAccount);
			System.out.println("Account " + currAccount + " balance: " + currBalance);
			total = total.add(currBalance);
		}
		System.out.println("Total balance: " + total);
	}
	
	public static boolean isValidAccount(String userId, String accountNumber) {
		String FilePath = constructFilePath(transactionHistoryPath, userId + "_" + accountNumber);
		if (!Files.exists(Path.of(FilePath))) {
			System.out.println("Account does not exist or account does not belong to the giver user");
			return false;
		}
		return true;
	}
	
	private static String getRandomNumberString() {
	    Random rnd = new Random();
	    int number = rnd.nextInt(999999);
	    return String.format("%06d", number);
	}
	
	private static String constructFilePath(String folderName, String fileName) {
		return folderName + fileName + ".txt";
	}

	private static String resourceToString(String fileName) throws IOException {
		return Files.readString(Path.of(fileName + ".txt"));
	}

}
