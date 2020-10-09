package com.smbcgroup.training.atm;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.math.BigDecimal;
import java.util.List;

import com.smbcgroup.training.atm.dao.AccountNotFoundException;
import com.smbcgroup.training.atm.dao.UserNotFoundException;
import com.smbcgroup.training.atm.dao.jpa.AccountJPAImpl;

public class ATM {

	// is separate session class fine
	private BufferedReader inputReader;
	private PrintStream output;
	private ATMService service;
	private String loggedInUser;
	private String selectedAccount;
	private List<String> loggedInUserAccounts;
	private Action selectedAction = Action.login;
	private String recipientAccount;

	// ATM object takes in ATM service, input and output
	// ATM service uses methods that's promised by AccountDAO
	// ATM service takes in a DAO implementation (dependency inversion)
	// AccountDAOTxtFileImpl is an implementation of the AccountDAO contract using
	// text files
	public static void main(String[] args) throws IOException {
		new ATM(new ATMService(new AccountJPAImpl()), System.in, System.out).beginSession();
	}

	protected enum Action {
		login, changeAccount, checkBalance, deposit, withdraw, transfer, transferPartTwo, openNewAccount, viewUserSummary, viewAccountHistory;
	}

	private ATM(ATMService service, InputStream input, PrintStream output) {
		this.service = service;
		this.inputReader = new BufferedReader(new InputStreamReader(input));
		this.output = output;
		this.selectedAction = Action.login;
	}

	private void beginSession() throws IOException {
		try {
			output.println("Welcome!");
			while (true)
				triggerAction();
		} catch (SystemExit e) {

		} catch (Exception e) {
			output.println("An unexpected error occurred.");
		} finally {
			output.println("Goodbye!");
			inputReader.close();
		}
	}

	private void triggerAction() throws IOException, SystemExit, ATMServiceException, AccountNotFoundException, UserNotFoundException {
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
			output.println("What would you like to do?");
			return true;
		}
		switch (selectedAction) {
		case login:
			output.println("Enter user ID:");
			return true;
		case changeAccount:
			output.println("Enter account number: (" + String.join(", ", loggedInUserAccounts + ")"));
			return true;
		case deposit:
			output.println("Enter amount:");
			return true;
		case withdraw:
			output.println("Enter amount:");
			return true;
		case transfer:
			output.println("Enter account number to transfer to: (" + loggedInUserAccounts + ")");
			return true;
		case transferPartTwo:
			output.println("Enter amount to transfer:");
			return true;
		default:
			return false;
		}
	}

	private Action performActionAndGetNextAction(String input)
			throws ATMException, SystemExit, IOException, ATMServiceException, AccountNotFoundException, UserNotFoundException {
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
				loggedInUser = input;
				loggedInUserAccounts = service.getUserAccounts(loggedInUser);
				return Action.changeAccount;
			} catch (Exception e) {
				System.out.println(e.toString());
				throw new ATMException("Invalid user ID.");
			}
		case changeAccount:
			if (!input.matches("^\\d{6}$"))
				throw new ATMException("Invalid account number.");
			for (String userAccount : loggedInUserAccounts) {
				if (userAccount.equals(input)) {
					selectedAccount = input;
					return null;
				}
			}
			throw new ATMException("Account number not found.");
		case checkBalance:
			output.println("Balance: $" + service.getAccountBalance(selectedAccount));
			break;
		case deposit:
			if (!input.matches("^\\d+$"))
				throw new ATMException("Invalid deposit amount.");
			service.deposit(selectedAccount, new BigDecimal(input));
			output.println("New balance: $" + service.getAccountBalance(selectedAccount));
			break;
		case withdraw:
			if (!input.matches("^\\d+$"))
				throw new ATMException("Invalid withdrawal amount.");
			service.withdraw(selectedAccount, new BigDecimal(input));
			output.println("New balance: $" + service.getAccountBalance(selectedAccount).toString());
			break;
		case transfer:
			recipientAccount = input;
			if (!recipientAccount.matches("^\\d{6}$"))
				throw new ATMException("Invalid account number.");
			if (recipientAccount.equals(selectedAccount))
				throw new ATMException("Cannot transfer to same account.");
			if (!loggedInUserAccounts.contains(recipientAccount))
				throw new ATMException("Account number not found.");
			selectedAction = Action.transferPartTwo;
			triggerAction();
		case transferPartTwo:
			String transferAmount = "";
			try {
				transferAmount = inputReader.readLine();
			} catch (IOException e) {
				e.printStackTrace();
			}
			if (!transferAmount.matches("^\\d+$"))
				throw new ATMException("Invalid deposit amount.");
			service.transfer(loggedInUser, selectedAccount, new BigDecimal(input), recipientAccount);
			output.println(selectedAccount + " new balance: $"
					+ service.getAccountBalance(selectedAccount).toString());
			output.println(
					recipientAccount + " new balance: $" + service.getAccountBalance(recipientAccount).toString());
			break;
		case openNewAccount:
			String createdAccountNumber = service.addNewAccount(loggedInUser);
			loggedInUserAccounts = service.getUserAccounts(loggedInUser);
			output.println("New account created: " + createdAccountNumber);
			break;
		case viewUserSummary:
			output.println("Summary for user " + loggedInUser);
			for (String account : loggedInUserAccounts) {
				output.println(account + ": $" + service.getAccountBalance(account));
			}
			break;
		case viewAccountHistory:
			output.println("Transaction history for account " + selectedAccount);
			output.println(service.viewAccountHistory(selectedAccount));
		}
		return null;
	}

	private static class SystemExit extends Throwable {
		private static final long serialVersionUID = 1L;
	}

	public static class ATMException extends Exception {
		private static final long serialVersionUID = 1L;

		public ATMException(String message) {
			super(message);
		}
	}

}
