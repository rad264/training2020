package com.smbcgroup.training.atm;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintStream;

public class ATM {

	public static void main(String[] args) throws IOException {
		new ATM(System.in, System.out).beginSession();
	}

	private BufferedReader inputReader;
	private PrintStream output;
	private String loggedInUser;
	private String selectedAccount;
	private Action selectedAction = Action.login;

	private ATM(InputStream input, PrintStream output) {
		this.inputReader = new BufferedReader(new InputStreamReader(input));
		this.output = output;
	}

	private void beginSession() throws IOException {
		try {
			output.println("Welcome!");
			while (true)
				triggerAction();
		} catch (SystemExit e) {

		} catch (Exception e) {
			output.println("An unexpected error occurred.");
			e.printStackTrace();
		} finally {
			output.println("Goodbye!");
			inputReader.close();
		}
	}

	private void triggerAction() throws IOException, SystemExit {
		try {
			String input = null;
			if (promptUserInput())
				input = inputReader.readLine();
			selectedAction = performActionAndGetNextAction(input);
		} catch (ATMException e) {
			output.println(e.getMessage());
		}
	}

	private boolean promptUserInput() {
		if (selectedAction == null) {
			output.println("Available actions:");
			for (Action a: Action.values()) output.println("> "+a);
			output.println("> exit\nWhat would you like to do?");
			return true;
		}
		switch (selectedAction) {
		case login:
			output.println("Enter user ID:");
			return true;
		case changeAccount:
			output.println(
					"Enter account number: (" + String.join(", ", AccountAccessor.getUserAccounts(loggedInUser)) + ")");
			return true;
		case deposit:
			output.println("How much money do you want to deposit?");
			return true;
		case withdraw:
			output.println("How much money do you want to withdraw?");
			return true;
		case transfer:
			output.println(
					"Which account do you want to transfer to? (" 
					+ (String.join(", ", AccountAccessor.getUserAccounts(loggedInUser))).replace(selectedAccount, "") + ")");
			return true;
		default:
			return false;
		}
	}

	private Action performActionAndGetNextAction(String input) throws ATMException, SystemExit, IOException {
		if ("exit".equals(input))
			throw new SystemExit();
		if (selectedAction == null) {
			try {
				return Action.valueOf(input);
			} catch (IllegalArgumentException e) {
				throw new ATMException("Invalid command.");
			}
		}
		switch (selectedAction) {
		case login:
			try {
				AccountAccessor.getUserAccounts(input);
				loggedInUser = input;
				return Action.changeAccount;
			} catch (Exception e) {
				throw new ATMException("Invalid user ID.");
			}
		case changeAccount:
			if (!input.matches("^\\d{6}$"))
				throw new ATMException("Invalid account number.");
			for (String userAccount : AccountAccessor.getUserAccounts(loggedInUser)) {
				if (userAccount.equals(input)) {
					selectedAccount = input;
					return null;
				}
			}
			throw new ATMException("Account number not found.");
		case checkBalance:
			output.println("Balance: $" + AccountAccessor.getAccountBalance(selectedAccount) + "\n");
			break;
		case createAccount:
			output.println(
					"Created new account with number " + AccountAccessor.createAccount(loggedInUser) + " and balance $0.00\n");
			break;
		case deposit:
			if (isNumeric(input)) {
				input = checkDecimalInput(input);
				AccountAccessor.deposit(selectedAccount, input);
				output.println(
						"Deposited $" + input + " to account " + selectedAccount 
						+ ".\nCurrent balance = $" + AccountAccessor.getAccountBalance(selectedAccount) + "\n");
			} else {
				output.println("Invalid input.");
			}
			break;
		case withdraw:
			if (isNumeric(input)) {
				input = checkDecimalInput(input);
				if (!isPossibleToWithdraw(input)) break;
				AccountAccessor.withdraw(selectedAccount, input);
				output.println(
						"Withdrew $" + input + " from account " + selectedAccount 
						+ ".\nCurrent balance = $" + AccountAccessor.getAccountBalance(selectedAccount) + "\n");
			} else {
				output.println("Invalid input.");
			}
			break;
		case transfer:
			if (selectedAccount.equals(input) ) {
				output.println("Selected account cannot be your current account");
			}
			for (String userAccount : AccountAccessor.getUserAccounts(loggedInUser)) {
				if (userAccount.equals(input)) {
					output.println("How much money do you want to transfer?");
					String amount = inputReader.readLine();
					if (isNumeric(amount)) {
						amount = checkDecimalInput(amount);
						if (!isPossibleToWithdraw(amount)) break;
						AccountAccessor.transfer(selectedAccount, input, amount);
						output.println("Successfully transferred $" + amount + " from " + selectedAccount +" to " + input 
								+ ".\nCurrent balance for " + selectedAccount + " is $" + AccountAccessor.getAccountBalance(selectedAccount)
								+ ".\nCurrent balance for " + input + " is $" + AccountAccessor.getAccountBalance(input) + ".\n");
					} else {
						output.println("Invalid input.");
					}
				}
			}
			return null;
		case viewAccountsSummary:
			for (String userAccount : AccountAccessor.getUserAccounts(loggedInUser)) {
				output.println("Account #" + userAccount + " | Balance: $" + AccountAccessor.getAccountBalance(userAccount));
			}
			output.println("\n");
			break;
		case viewAccountActivity:
			output.println(AccountAccessor.getAccountActivity(selectedAccount)+"\n");
			break;
		}
		return null;
	}
	
	private String checkDecimalInput(String amount) {
		if (amount.indexOf(".") == -1) amount = amount + ".00";
		return amount;
	}
	
	private boolean isNumeric(String number) {
		try {
	        Integer.parseInt(number);
	    } catch (NumberFormatException e) {
	        return false;
	    }
	    return true;
	}
	
	private boolean isPossibleToWithdraw(String input) {
		if (!AccountAccessor.withdrawSuccess(selectedAccount, input)) {
			output.println(
					"Sorry, we can't withdraw your entered amount due to insufficient funds.");
			return false;
		} 
		return true;
	}

	private class SystemExit extends Throwable {
		private static final long serialVersionUID = 1L;
	}

	public class ATMException extends Exception {
		private static final long serialVersionUID = 1L;

		public ATMException(String message) {
			super(message);
		}
	}

}
