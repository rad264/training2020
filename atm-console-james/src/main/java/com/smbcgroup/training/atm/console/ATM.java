package com.smbcgroup.training.atm.console;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.math.BigDecimal;
import java.util.EnumSet;

import com.smbcgroup.training.atm.accountDAO.AccountDAOTxtFileImpl;
import com.smbcgroup.training.atm.accountService.AccountService;
import com.smbcgroup.training.atm.exceptions.AccountNotFoundException;
import com.smbcgroup.training.atm.exceptions.InvalidAmountException;
import com.smbcgroup.training.atm.exceptions.UserNotFoundException;

public class ATM {

	public static void main(String[] args) throws IOException {
		new ATM(System.in, System.out).beginSession();
	}

	private static enum Action {
		login, changeAccount, checkBalance,
		deposit, withdraw, transfer, openNew, summary, history, help, clearHistory;
	}

	private BufferedReader inputReader;
	private PrintStream output;
	private String loggedInUser;
	private String selectedAccount;
	private Action selectedAction = Action.login;
	private AccountService service;

	private ATM(InputStream input, PrintStream output) {
		this.inputReader = new BufferedReader(new InputStreamReader(input));
		this.output = output;
		this.service = new AccountService(new AccountDAOTxtFileImpl());
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

	private void triggerAction() throws SystemExit, Exception {
		try {
			String input = null;
			if (promptUserInput())
				input = inputReader.readLine();
			selectedAction = performActionAndGetNextAction(input);
		} catch (ATMException e) {
			output.println(e.getMessage());
		}
	}

	private boolean promptUserInput() throws Exception {
		if (selectedAction == null) {
			output.println("What would you like to do?");
			return true;
		}
		switch (selectedAction) {
		case login:
			output.println("Enter user ID:");
			return true;
		case changeAccount:
			output.println("Enter account number: (" + String.join(", ", service.getUserAccounts(loggedInUser)) + ")");
			return true;
		case deposit:
			output.println("Enter deposit amount $:");
			return true;
		case withdraw:
			output.println("Enter withdraw amount $:");
			return true;
		case transfer:
			output.println("Enter account number to transfer to: ("
					+ String.join(", ", service.getUserAccounts(loggedInUser)) + ")");
			return true;
		case openNew:
			output.println("Enter new account number:");
			return true;
		case summary:
			output.println("Summary:");
			for (String userAccount : service.getUserAccounts(loggedInUser))
				output.println("Balance for account " + userAccount + ": $" + service.getAccountBalance(userAccount));
			return false;
		case help:
			EnumSet.allOf(Action.class).forEach(action -> output.println(action));
			return false;
		case history:
			output.println("History:");
			for (String transaction : service.getUserTransactions(loggedInUser))
				output.println(transaction);
			return false;
		case clearHistory:
			service.clearUserTransactions(loggedInUser);
			output.println("History Cleared!");
			return false;
		default:
			return false;
		}
	}

	private Action performActionAndGetNextAction(String input) throws ATMException, SystemExit {
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
				service.getUserAccounts(input);
				loggedInUser = input;
				return Action.changeAccount;
			} catch (Exception e) {
				throw new ATMException("Invalid user ID.");
			}

		case changeAccount:
			if ("openNew".equals(input))
				return Action.openNew;
			if (!input.matches("^\\d{6}$"))
				throw new ATMException("Invalid account number.");
			try {
				for (String userAccount : service.getUserAccounts(loggedInUser)) {
					if (userAccount.equals(input)) {
						selectedAccount = input;
						return null;
					}
				}
			} catch (UserNotFoundException e) {
				throw new ATMException("User not found.");
			}
			throw new ATMException("Account number not found.");
		case checkBalance:
			try {
				output.println("Balance: $" + service.getAccountBalance(selectedAccount));
			} catch (AccountNotFoundException e) {
				throw new ATMException("Account number not found.");
			}
			break;

		case deposit:
			try {
				BigDecimal depositAmount = service.toBigDecimal(input);
				service.deposit(loggedInUser, selectedAccount, depositAmount);
				output.println("Balance: $" + service.getAccountBalance(selectedAccount));
			} catch (InvalidAmountException e) {
				throw new ATMException("Invalid amount.");
			} catch (AccountNotFoundException e) {
				throw new ATMException("Account not found.");
			} catch (UserNotFoundException e) {
				throw new ATMException("User not found.");
			}
			break;

		case withdraw:
			try {
				BigDecimal withdrawAmount = service.toBigDecimal(input);
				service.withdraw(loggedInUser, selectedAccount, withdrawAmount);
				output.println("Balance: $" + service.getAccountBalance(selectedAccount));
			} catch (InvalidAmountException e) {
				throw new ATMException("Invalid amount.");
			} catch (AccountNotFoundException e) {
				throw new ATMException("Account number not found.");
			} catch (UserNotFoundException e) {
				throw new ATMException("User not found.");
			}
			break;

		case transfer:
			if (!input.matches("^\\d{6}$"))
				throw new ATMException("Invalid account number.");
			if (input.equals(selectedAccount))
				throw new ATMException("Same account number.");

			String transferAccount = null;
			try {
				for (String userAccount : service.getUserAccounts(loggedInUser)) {
					if (userAccount.equals(input)) {
						transferAccount = input;
					}
				}
			} catch (UserNotFoundException e) {
				throw new ATMException("User not found.");
			}
			if (!transferAccount.equals(input))
				throw new ATMException("Account number not found.");

			output.println("Enter transfer amount $:");

			try {
				String line = inputReader.readLine();
				BigDecimal transferAmount = service.toBigDecimal(line);
				service.transfer(loggedInUser, selectedAccount, transferAccount, transferAmount);
				output.println(
						"Balance for account " + selectedAccount + ": $" + service.getAccountBalance(selectedAccount));
				output.println(
						"Balance for account " + transferAccount + ": $" + service.getAccountBalance(transferAccount));
			} catch (IOException e) {
				throw new RuntimeException(e);
			} catch (InvalidAmountException e) {
				throw new ATMException("Invalid amount.");
			} catch (AccountNotFoundException e) {
				throw new ATMException("Account number not found.");
			} catch (UserNotFoundException e) {
				throw new ATMException("User not found.");
			}
			break;
		default:
			break;
		}
		return null;
	}

	private class SystemExit extends Throwable {
		private static final long serialVersionUID = 1L;
	}

	private class ATMException extends Exception {
		private static final long serialVersionUID = 1L;

		public ATMException(String message) {
			super(message);
		}
	}

}
