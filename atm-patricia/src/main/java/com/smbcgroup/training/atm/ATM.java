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
					"Enter account number: (" + String.join(", ", AccountService.getUserAccounts(loggedInUser)) + ")");
			return true;
		case deposit:
			output.println("How much money do you want to deposit?");
			return true;
		case withdraw:
			output.println("How much money do you want to withdraw?");
			return true;
		case transferBetweenAccounts:
			output.println(
					"Which account do you want to transfer to? (" 
					+ (String.join(", ", AccountService.getUserAccounts(loggedInUser))).replace(selectedAccount, "") + ")");
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
			loggedInUser = AccountService.login(input);
			if (loggedInUser == null) throw new ATMException("Invalid user ID.");
			return Action.changeAccount;
		case changeAccount:
			selectedAccount = AccountService.changeAccount(input, loggedInUser);
			if (selectedAccount == "invalid") throw new ATMException("Invalid input");
			if (selectedAccount == "not found") throw new ATMException("Account not found");
		case checkBalance:
			output.println("Balance: $" + AccountService.checkBalance(selectedAccount) + "\n");
			break;
		case createAccount:
			output.println(
					"Created new account with number " + AccountService.createAccount(loggedInUser) + " and balance $0.00\n");
			break;
		case deposit:
			if (AccountService.deposit(input, selectedAccount)) {
				output.println(
						"Deposited $" + input + " to account " + selectedAccount 
						+ ".\nCurrent balance = $" + AccountService.checkBalance(selectedAccount) + "\n");
			} else {
				output.println("Invalid input.");
			}
			break;
		case withdraw:
			int status = AccountService.withdraw(input, selectedAccount);
			if (status == -2) {
				output.println(
						"Sorry, we can't withdraw your entered amount due to insufficient funds.");
			} else if (status == -1) {
				output.println("Invalid input.");
			} else {
				output.println(
						"Withdrew $" + input + " from account " + selectedAccount 
						+ ".\nCurrent balance = $" + AccountService.checkBalance(selectedAccount) + "\n");
			}
			break;
		case transferBetweenAccounts:
			if (selectedAccount.equals(input) ) {
				output.println("Selected account cannot be your current account");
			}
			for (String userAccount : AccountService.getUserAccounts(loggedInUser)) {
				if (userAccount.equals(input)) {
					output.println("How much money do you want to transfer?");
					String amount = inputReader.readLine();
					status = AccountService.transfer(selectedAccount, input, amount);
					if (status == -1) {
						output.println("Invalid input.");
					} else if (status == -2) {
						output.println(
								"Sorry, we can't withdraw your entered amount due to insufficient funds.");
					} else {
						output.println("Successfully transferred $" + amount + " from " + selectedAccount +" to " + input 
								+ ".\nCurrent balance for " + selectedAccount + " is $" + AccountService.checkBalance(selectedAccount)
								+ ".\nCurrent balance for " + input + " is $" + AccountService.checkBalance(input) + ".\n");
					}
				}
			}
			return null;
		case viewAccountsSummary:
			for (String userAccount : AccountService.getUserAccounts(loggedInUser)) {
				output.println("Account #" + userAccount + " | Balance: $" + AccountService.checkBalance(userAccount));
			}
			output.println("\n");
			break;
		case viewAccountActivity:
			output.println(AccountService.getAccountActivity(selectedAccount)+"\n");
			break;
		}
		return null;
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
