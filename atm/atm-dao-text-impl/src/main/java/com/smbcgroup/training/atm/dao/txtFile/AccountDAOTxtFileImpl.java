package com.smbcgroup.training.atm.dao.txtFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.smbcgroup.training.atm.Account;
import com.smbcgroup.training.atm.User;
import com.smbcgroup.training.atm.dao.AccountDAO;
import com.smbcgroup.training.atm.dao.AccountNotFoundException;
import com.smbcgroup.training.atm.dao.UserNotFoundException;


public class AccountDAOTxtFileImpl implements AccountDAO {
	

	public List<String> getUserAccounts(String userId) {
		try {
			String[] temp = resourceToString("data/users/" + userId).split(",");
			List<String> list = Arrays.asList(temp); 
			return list;
		} catch (Exception e) {
			throw new RuntimeException("Failed to read accounts for user: " + userId, e);
		}
	}

	public BigDecimal getAccountBalance(String accountNumber) {
		try {
			return new BigDecimal(resourceToString("data/accounts/" + accountNumber));
		} catch (Exception e) {
			throw new RuntimeException("Failed to read balance for account: " + accountNumber, e);
		}
	}
	
	public List<String> viewAccountHistory(String accountNumber) {
		try {
			String[] temp = resourceToString("data/history/" + accountNumber).split("\n");
			List<String> list = Arrays.asList(temp); 
			return list;
		} catch (Exception e) {
			throw new RuntimeException("Failed to read history for account: " + accountNumber, e);
		}
	}
	
	public void updateAccountBalance(String accountNumber, BigDecimal balance) {
		try {
			Path account = Path.of("data/accounts/" + accountNumber + ".txt");
			Files.writeString(account, String.format("%.2f", balance));
		} catch (IOException e) {
			// what is the correct runtime exception
			throw new RuntimeException("Failed to read account: " + accountNumber, e);
		}
	}
	
	public boolean checkIfAccountExists(String newAccountNumber) {
		try {
			String[] accounts = resourceToString("data/accounts/allAccounts").split(",");
			// solution to avoid duplicate accounts
			List<String> allAccounts = new ArrayList<String>(Arrays.asList(accounts));
			return allAccounts.contains(newAccountNumber);
		} catch (Exception e) {
			// what exception
			throw new RuntimeException("Failed to read accounts for user: ", e);
		}
	}
	
	public String addNewAccount(String userId, String newAccountNumber) {
			try {
				Files.createFile(Path.of("data/accounts/" + newAccountNumber + ".txt"));
				Files.createFile(Path.of("data/history/" + newAccountNumber + ".txt"));
			} catch (IOException e1) {
				// exception should signal ATM to generate a different number
				e1.printStackTrace();
			}
			updateAccountBalance(newAccountNumber, BigDecimal.ZERO);
			String currentUserAccounts;
			try {
				currentUserAccounts = resourceToString("data/users/" + userId);
			} catch (IOException e) {
				throw new RuntimeException("Failed to read accounts for user: " + userId, e);
			}
			currentUserAccounts += "," + newAccountNumber;
			try {
				Files.writeString(Path.of("data/users/" + userId + ".txt"), currentUserAccounts);
			} catch (IOException e) {
				throw new RuntimeException("Failed to add account for user: " + userId, e);
			}
			String allAccounts;
			try {
				allAccounts = resourceToString("data/accounts/allAccounts");
			} catch (IOException e) {
				throw new RuntimeException("Failed to read from database", e);
			}
			allAccounts += "," + newAccountNumber;
			try {
				Files.writeString(Path.of("data/accounts/allAccounts.txt"), allAccounts);
			} catch (IOException e) {
				throw new RuntimeException("Failed to add account to database", e);
			}
			return newAccountNumber;
		
	}

	private static String resourceToString(String fileName) throws IOException {
		return Files.readString(Path.of(fileName + ".txt"));
	}


	public void updateLogs(String accountNumber, String amount, String transactionType) {
		Path account = Path.of("data/history/" + accountNumber + ".txt");
		String temp = String.format("%.2f", new BigDecimal(amount));
		try {
			Files.writeString(account, "\n" + Files.readString(account) + transactionType + ": $" + temp + ", Balance: $" + getAccountBalance(accountNumber));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

	@Override
	public User getUser(String userId) throws UserNotFoundException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Account getAccount(String accountNumber) throws AccountNotFoundException {
		// TODO Auto-generated method stub
		return null;
	}



	@Override
	public void updateAccount(Account account) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String addNewAccount(String userId) throws UserNotFoundException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateLogs(String accountNumber, BigDecimal depositAmount, String transactionType)
			throws AccountNotFoundException {
		// TODO Auto-generated method stub
		
	}

}
