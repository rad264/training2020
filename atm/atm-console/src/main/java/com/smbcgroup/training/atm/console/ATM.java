package com.smbcgroup.training.atm.console;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.math.BigDecimal;
import java.util.EnumSet;

import com.smbcgroup.training.atm.ATMService;
import com.smbcgroup.training.atm.ATMServiceException;
import com.smbcgroup.training.atm.ATMServiceException.Type;
import com.smbcgroup.training.atm.dao.AccountNotFoundException;
import com.smbcgroup.training.atm.dao.UserNotFoundException;
import com.smbcgroup.training.atm.dao.jpa.AccountJPAImpl;
//import com.smbcgroup.training.atm.dao.txtFile.AccountDAOTxtFileImpl;
import com.smbcgroup.training.atm.dao.AccountAlreadyExistsException;
import com.smbcgroup.training.atm.dao.FailToCreateAccountException;
import com.smbcgroup.training.atm.dao.InvalidAmountException;

public class ATM {

	public static void main(String[] args) throws IOException {
		new ATM().beginSession();
	}

	private static enum Action {
		login, changeAccount, checkBalance, deposit, withdraw, transfer, transferFollow, openAccount, summary, history,
		help, clearHistory;
	}

	private BufferedReader inputReader;
	private PrintStream output;
	private Action selectedAction = Action.login;
	private Action prevAction;
	private ATMService service = new ATMService(new AccountJPAImpl());
//	private ATMService service = new ATMService(new AccountDAOTxtFileImpl());

	public ATM() {
		this.inputReader = new BufferedReader(new InputStreamReader(System.in));
		this.output = System.out;
	}

	public ATM(InputStream input, PrintStream output) {
		this.inputReader = new BufferedReader(new InputStreamReader(input));
		this.output = output;
	}

	public void beginSession() throws IOException {
		try {
			init();
		} catch (SystemExit e) {

		} catch (Exception e) {
			output.println("An unexpected error occurred.");
			e.printStackTrace();
		} finally {
			exit();
		}
	}

	private void init() throws SystemExit, Exception {
		output.println("Welcome!");
		while (true)
			triggerAction();
	}

	private void exit() throws IOException {
		output.println("Goodbye!");
		inputReader.close();
	}

	private void triggerAction() throws SystemExit, Exception {
		try {
			String input = null;
			if (promptUserInput())
				input = inputReader.readLine();
			prevAction = selectedAction;
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
			output.println("Enter account number: (" + String.join(", ", service.getAccountNumbers()) + ")");
			return true;
		case deposit:
			output.println("Enter deposit amount $:");
			return true;
		case withdraw:
			output.println("Enter withdraw amount $:");
			return true;
		case transfer:
			output.println(
					"Enter account number to transfer to: (" + String.join(", ", service.getAccountNumbers()) + ")");
			return true;
		case transferFollow:
			if (prevAction != Action.transfer) {
				selectedAction = null;
				throw new ATMException("Invalid command.");
			}
			output.println("Enter transfer amount $:");
			return true;
		case openAccount:
			output.println("Enter new account number:");
			return true;
		case summary:
			output.println("Summary:");
			for (String userAccount : service.getAccountNumbers())
				output.println("Balance for account " + userAccount + ": $" + service.getAccountBalance(userAccount));
			return false;
		case help:
			EnumSet.allOf(Action.class).forEach(action -> output.println(action));
			return false;
//		case history:
//			output.println("History:");
//			for (String transaction : service.getUserTransactions())
//				output.println(transaction);
//			return false;
//		case clearHistory:
//			service.clearUserTransactions();
//			output.println("History Cleared!");
//			return false;
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
				service.login(input);
				return Action.changeAccount;
			} catch (Exception e) {
				throw new ATMException("Invalid user ID.");
			}

		case changeAccount:
			if ("openAccount".equals(input))
				return Action.openAccount;
			if (!input.matches("^\\d{6}$"))
				throw new ATMException("Invalid account number.");
			try {
				service.changeAccount(input);
			} catch (UserNotFoundException e) {
				throw new ATMException("User not found.");
			} catch (AccountNotFoundException e) {
				throw new ATMException("Account not found.");
			}
			return null;

		case openAccount:
			if (!input.matches("^\\d{6}$"))
				throw new ATMException("Invalid account number.");
			try {
				service.createAccount(input);
			} catch (UserNotFoundException e) {
				throw new ATMException("Failed to create account.");
			} catch (AccountAlreadyExistsException e) {
				throw new ATMException("Account already exists.");
			}
			break;

		case checkBalance:
			try {
				output.println("Balance: $" + service.getAccountBalance());
			} catch (AccountNotFoundException e) {
				throw new ATMException("Account number not found.");
			}
			break;

		case deposit:
			try {
				BigDecimal depositAmount = service.toBigDecimal(input);
				service.deposit(depositAmount);
				output.println("Balance: $" + service.getAccountBalance());
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
				service.withdraw(withdrawAmount);
				output.println("Balance: $" + service.getAccountBalance());
			} catch (InvalidAmountException e) {
				throw new ATMException("Invalid amount.");
			} catch (AccountNotFoundException e) {
				throw new ATMException("Account not found.");
			} catch (UserNotFoundException e) {
				throw new ATMException("User not found.");
			}
			break;

		case transfer:
			if (!input.matches("^\\d{6}$"))
				throw new ATMException("Invalid account number.");
			if (service.checkSameAccount(input))
				throw new ATMException("Same account number.");
			try {
				if (!service.setTransferAccount(input))
					throw new ATMException("Account not found.");
			} catch (UserNotFoundException e) {
				throw new ATMException("User not found.");
			}
			return Action.transferFollow;

		case transferFollow:
			try {
				BigDecimal transferAmount = service.toBigDecimal(input);
				service.transfer(transferAmount);
			} catch (InvalidAmountException e) {
				throw new ATMException("Invalid amount.");
			} catch (AccountNotFoundException e) {
				throw new ATMException("Account not found.");
			} catch (UserNotFoundException e) {
				throw new ATMException("User not found.");
			}
			break;

		default:
			break;
		}
		return null;
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
