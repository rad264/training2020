package com.smbcgroup.training.atm.console;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.math.BigDecimal;

import com.smbcgroup.training.atm.ATMService;
import com.smbcgroup.training.atm.ATMServiceException;
import com.smbcgroup.training.atm.ATMServiceException.Type;
import com.smbcgroup.training.atm.dao.AccountNotFoundException;
import com.smbcgroup.training.atm.dao.UserNotFoundException;
import com.smbcgroup.training.atm.dao.txtFile.AccountDAOTxtFileImpl;

public class ATM {

	public static void main(String[] args) throws IOException {
		new ATM(new ATMService(new AccountDAOTxtFileImpl()), System.in, System.out).beginSession();
	}

	private static enum Action {
		login, changeAccount, checkBalance, deposit, withdraw;
		// TODO: add more actions
	}

	private ATMService service;
	private BufferedReader inputReader;
	private PrintStream output;
	private String loggedInUser;
	private String[] loggedInUserAccounts;
	private String selectedAccount;
	private Action selectedAction = Action.login;

	private ATM(ATMService service, InputStream input, PrintStream output) {
		this.service = service;
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
			output.println("What would you like to do?");
			return true;
		}
		switch (selectedAction) {
		case login:
			output.println("Enter user ID:");
			return true;
		case changeAccount:
			output.println("Enter account number: (" + String.join(", ", loggedInUserAccounts) + ")");
			return true;
		case deposit:
		case withdraw:
			output.println("Enter amount:");
			return true;
		// TODO: prompts for other actions(?)
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
				loggedInUserAccounts = service.getUser(input).getAccounts();
				loggedInUser = input;
				return Action.changeAccount;
			} catch (UserNotFoundException e) {
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
			try {
				output.println("Balance: $" + service.getAccount(selectedAccount).getBalance());
			} catch (AccountNotFoundException e) {
				throw new RuntimeException(e);
			}
			break;
		case deposit:
			try {
				service.deposit(selectedAccount, convertToBigDecimal(input));
			} catch (ATMServiceException e) {
				throw new ATMException(e);
			} catch (AccountNotFoundException e) {
				throw new RuntimeException(e);
			}
			break;
		case withdraw:
			try {
				service.withdraw(selectedAccount, convertToBigDecimal(input));
			} catch (ATMServiceException e) {
				throw new ATMException(e);
			} catch (AccountNotFoundException e) {
				throw new RuntimeException(e);
			}
			break;
		// TODO: handle other actions
		}
		return null;
	}

	private BigDecimal convertToBigDecimal(String input) throws ATMException {
		try {
			return new BigDecimal(input);
		} catch (NumberFormatException e) {
			throw new ATMException("Invalid amount.");
		}
	}

	private static class SystemExit extends Throwable {
		private static final long serialVersionUID = 1L;
	}

	private static class ATMException extends Exception {
		private static final long serialVersionUID = 1L;

		public ATMException(String message) {
			super(message);
		}

		public ATMException(ATMServiceException e) {
			super(determineErrorMessage(e.getType()));
		}

		private static String determineErrorMessage(Type type) {
			switch (type) {
			case NON_POSITIVE_AMOUNT:
				return "Amount must be greater than 0.";
			case INSUFFICIENT_FUNDS:
				return "Insufficient funds.";
			}
			return "Unexpected error.";
		}

	}

}
