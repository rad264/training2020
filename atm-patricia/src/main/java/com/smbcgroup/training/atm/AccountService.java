package com.smbcgroup.training.atm;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Random;

public class AccountService {
	public static String login(String input) {
		try {
			getUserAccounts(input);
			return input;
		} catch (Exception e) {
			return null;
		}
		
	}
	
	public static String changeAccount(String input, String loggedInUser) {
		if (!input.matches("^\\d{6}$"))
			return "invalid";
		for (String userAccount : getUserAccounts(loggedInUser)) {
			if (userAccount.equals(input)) {
				return input;
			}
		}
		return "not found";
	}
	
	public static BigDecimal checkBalance(String selectedAccount) {
		try {
			return new BigDecimal(AccountAccessor.resourceToString("data/accounts/" + selectedAccount).split("\n")[0]);
		} catch (Exception e) {
			throw new RuntimeException("Failed to read balance for account: " + selectedAccount, e);
		}
	}
	
	public static String createAccount(String userId) {
		try {
			String newAccount = generateAccountNumber(userId);
			AccountAccessor.stringToResource("data/users/" + userId, "," + newAccount);
			AccountAccessor.accountFileCreation(newAccount);
			return newAccount;
		} catch (Exception e) {
			throw new RuntimeException("Failed to create account for user: " + userId, e);
		}
	}
	
	// TODO: Some functionalities from AccountAccessor needed to move to this layer (esp deposit, withdraw, transfer)
	
	public static boolean deposit(String input, String selectedAccount) {
		if (isNumeric(input)) {
			input = checkDecimalInput(input);
			depositTool(input, selectedAccount);
			return true;
		} else {
			return false;
		}
	}
	
	private static boolean depositTool(String input, String selectedAccount) {
		try {
			String newBalance = (checkBalance(selectedAccount).add(new BigDecimal(input))).toString();
			AccountAccessor.logging(selectedAccount, null, newBalance, input, "deposit");
			return true;
		} catch (Exception e) {
			throw new RuntimeException("Failed to deposit for account: " + selectedAccount, e);
		}
	}
	
	public static int withdraw(String input, String selectedAccount) {
		if (isNumeric(input)) {
			input = checkDecimalInput(input);
			if (!isPossibleToWithdraw(input, selectedAccount)) return -2;
			withdrawTool(input, selectedAccount);
			return 0;
		} else {
			return -1;
		}
	}
	
	private static void withdrawTool(String input, String selectedAccount) {
		try {
			String newBalance = (checkBalance(selectedAccount).subtract(new BigDecimal(input))).toString();
			AccountAccessor.logging(selectedAccount, null, newBalance, input, "withdraw");
		} catch (Exception e) {
			throw new RuntimeException("Failed to withdraw for account: " + selectedAccount, e);
		}
	}

	public static int transfer(String homeAccount, String destinationAccount, String amount) {
		if (isNumeric(amount)) {
			amount = checkDecimalInput(amount);
			if (!isPossibleToWithdraw(amount, homeAccount)) return -2;
			try {
				AccountAccessor.logging(homeAccount, destinationAccount, null, amount, "transferPartOne");
				withdrawTool(amount, homeAccount);
				depositTool(amount, destinationAccount);
				AccountAccessor.logging(homeAccount, destinationAccount, null, amount, "transferPartTwo");
			} catch (Exception e) {
				throw new RuntimeException("Failed to transfer from " + homeAccount + " to " + destinationAccount);
			}			
			return 0;
		} else {
			return -1;
		}
	}
	
	public static String[] getUserAccounts(String userId) {
		try {
			return AccountAccessor.resourceToString("data/users/" + userId).split(",");
		} catch (Exception e) {
			throw new RuntimeException("Failed to read accouns for user: " + userId, e);
		}
	}
	
	public static String getAccountActivity(String selectedAccount) {
		try {
			return AccountAccessor.resourceToString("data/accounts/" + selectedAccount + "history");
		} catch (Exception e) {
			throw new RuntimeException("Failed to get account activity for account: " + selectedAccount, e);
		}
	}
	
	private static String generateAccountNumber(String userId) {
		String accountNumber = Integer.toString(new Random().nextInt(900000) + 100000);
		ArrayList<String> existingAccounts = new ArrayList<>(Arrays.asList(getUserAccounts(userId)));
		if (existingAccounts.contains(accountNumber)) accountNumber = Integer.toString(new Random().nextInt(900000) + 100000);
		return accountNumber;
	}
	
	private static boolean isPossibleToWithdraw(String input, String selectedAccount) {
		if (!(checkBalance(selectedAccount).subtract(new BigDecimal(input)).compareTo(BigDecimal.ZERO) == 1))
			return false;
		return true;
	}
	
	private static boolean isNumeric(String number) {
		try {
	        Integer.parseInt(number);
	    } catch (NumberFormatException e) {
	        return false;
	    }
	    return true;
	}
	
	private static String checkDecimalInput(String amount) {
		if (amount.indexOf(".") == -1) amount = amount + ".00";
		return amount;
	}
}

