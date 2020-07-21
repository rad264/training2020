package com.smbcgroup.training.atm;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

public class AccountAccessor implements AccountDAO {
	
	public static String dataLocation = "data/";
	
	public void changeDataLocation(String location) {
		dataLocation = location;
	}

	public String[] getUserAccounts(String userId) {
		try {
			return resourceToString(dataLocation + "users/" + userId).split(",");
		} catch (Exception e) {
			throw new RuntimeException("Failed to read accounts for user: " + userId, e);
		}
	}

	public BigDecimal getAccountBalance(String accountNumber) {
		try {
			return new BigDecimal(resourceToString(dataLocation + "accounts/" + accountNumber));
		} catch (Exception e) {
			throw new RuntimeException("Failed to read balance for account: " + accountNumber, e);
		}
	}
	
	public void depositIntoAccount(String currentAccount, BigDecimal depositAmount) {
		BigDecimal currentAmount = getAccountBalance(currentAccount);
		CharSequence updatedAmount = ((currentAmount).add(depositAmount)).toString();
		String pathToCurrentAccount = dataLocation + "accounts/"+currentAccount+".txt";
		try{
			Files.writeString(Path.of(pathToCurrentAccount),updatedAmount.toString(),StandardOpenOption.WRITE);
		} catch(Exception e) {
			throw new RuntimeException("Depositing error!");
		}
	}
	
	public void withdrawFromAccount(String currentAccount, BigDecimal withdrawalAmount) {
		BigDecimal currentAmount = getAccountBalance(currentAccount);
		CharSequence updatedAmount = (currentAmount.subtract(withdrawalAmount)).toString();
		String pathToCurrentAccount = dataLocation + "accounts/"+currentAccount+".txt";
		try {
			Files.writeString(Path.of(pathToCurrentAccount), updatedAmount.toString(), StandardOpenOption.WRITE);
		} catch(Exception e) {
			throw new RuntimeException("Withdrawal error!");
		}
	}

	public void createNewAccount(String userId) throws IOException {
		String randomAccountNumber = String.format("%06d",(int)(Math.random()*1_000_000));
		File pathToAllAccounts = new File(dataLocation + "accounts/");
		String[] allAccounts = pathToAllAccounts.list();
		boolean accountNumberAlreadyExists = false;
		for (String accountNumber : allAccounts) {
			if(randomAccountNumber.equals(accountNumber.replace(".txt", ""))) {
				accountNumberAlreadyExists = true;
				break;
			}
		}
		if (accountNumberAlreadyExists)
			createNewAccount(userId);
		else {
			Files.writeString(Path.of(dataLocation + "users/"+userId+".txt"), (CharSequence)(","+randomAccountNumber), StandardOpenOption.APPEND);
			Files.writeString(Path.of(dataLocation + "accounts/"+randomAccountNumber+".txt"), "0.00", StandardOpenOption.CREATE_NEW);
		}
	}
	
	public String getSummary(String userId) {
		String[] accountNumbers = getUserAccounts(userId);
		String summaryOfAccounts = userId.toUpperCase() + "'s summary: \n";
		for (int i=0; i<accountNumbers.length; i++) {
			summaryOfAccounts += String.format("Account %s: Balance $%.2f. \n", accountNumbers[i],getAccountBalance(accountNumbers[i]));
		}
		return summaryOfAccounts;
	}
	
	public void logTransaction(String userId, String transactionDetails) throws IOException {
		Files.writeString(Path.of(dataLocation + "history/"+userId+".txt"), transactionDetails+"\n", StandardOpenOption.APPEND);
	}
	
	public String getTransactionHistory(String userId) throws IOException {
		String pathToHistory = dataLocation + "history/"+userId;
		return Files.readString(Path.of(pathToHistory+".txt"));
	}
	
	public String resourceToString(String fileName) throws IOException {
		return Files.readString(Path.of(fileName + ".txt"));
	}

}
