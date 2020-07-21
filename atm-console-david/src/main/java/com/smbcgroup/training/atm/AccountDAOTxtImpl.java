package com.smbcgroup.training.atm;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Calendar;
import java.util.LinkedList;

public class AccountDAOTxtImpl implements AccountDAO{

	
	private static String accountsPath = "";
	private static String userPath = "";
	private static String historyPath = "";
	
	//path should end in /
	public AccountDAOTxtImpl(String path) {
		userPath = path + "users/";
		accountsPath = path + "accounts/";
		historyPath = path + "history/";
	}
	
	public String[] getUserAccounts(String userId) {
		try {
			return resourceToString(userPath + userId).split("\n");
		} catch (Exception e) {
			throw new RuntimeException("Failed to read accounts for user: " + userId, e);
		}
	}

	public BigDecimal getAccountBalance(String accountNumber) {
		try {
			return new BigDecimal(resourceToString(accountsPath + accountNumber));
		} catch (Exception e) {
			throw new RuntimeException("Failed to read balance for account: " + accountNumber, e);
		}
	}

	public void setAccountBalance(String accountNumber, BigDecimal newBalance) {
		try {
			overrideResource(accountsPath + accountNumber, newBalance.toString());
		} catch (Exception e) {
			throw new RuntimeException("Failed to deposit to account: " + accountNumber, e);
		}
		
	}
	
	private static String resourceToString(String fileName) throws IOException {
		return Files.readString(Path.of(fileName + ".txt"));
	}
	
	private static void overrideResource(String fileName, String newValue) throws IOException {
		FileWriter fw = new FileWriter(fileName + ".txt", false);
		fw.write(newValue);
		fw.close();
	}
	
	private static void writeToResource(String fileName, String newValue) throws IOException {
		FileWriter fw = new FileWriter(fileName + ".txt", true);
		fw.write(newValue);
		fw.close();
	}
	
	public void createAccount(String user, String accountNum) throws IOException {
		File newAccount = new File(accountsPath + accountNum + ".txt");
		boolean success =  newAccount.createNewFile();
		
		if (success) {
			FileWriter fw = new FileWriter(userPath + user + ".txt", true);
			fw.write("\n" + accountNum);
			fw.close();
		} else {
			System.out.println("Account already exists");
		}
		
	}

	public void addStamp(String account, BigDecimal input, long currentTimeMillis) {
		try {
			writeToResource(historyPath + account, currentTimeMillis + "," + input.toString() + "\n");
		} catch (Exception e) {
			throw new RuntimeException("There was an error with our servers");
		}
	}
	
	public LinkedList<Object[]> getHistory(String account) {
		LinkedList<Object[]> pairs = new LinkedList<>();
		String[] lines = null;
		try {
			lines = resourceToString(historyPath + account).split("\n");
			for (String line: lines) {
				long timeMilli = Long.parseLong(line.split(",")[0]);
				int  amt     = Integer.parseInt(line.split(",")[1]);
				
				Calendar date = Calendar.getInstance();
				date.setTimeInMillis(timeMilli);
				
				Object[] pair = {date, amt};
				pairs.add(pair);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return pairs;	
	}

}
