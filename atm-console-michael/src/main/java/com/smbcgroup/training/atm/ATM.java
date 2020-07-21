package com.smbcgroup.training.atm;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.math.BigDecimal;

public class ATM {

	public static void main(String[] args) throws IOException {
		new ATM(System.in, System.out).beginSession();
	}

	public static enum Action {
		login, changeAccount, checkBalance, deposit, withdraw, transfer, getSummary, openNewAccount, getHistory;
	}

	private ATMServicer atmService;
	public static BufferedReader inputReader;
	public static PrintStream output;
	public static Action selectedAction = Action.login;

	private ATM(InputStream input, PrintStream output) {
		this.atmService = new ATMServicer(new AccountAccessor());
		inputReader = new BufferedReader(new InputStreamReader(input));
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

	private void triggerAction() throws IOException, SystemExit, ATMException {
		try {
			String input = null;
			if (promptUserInput())
				input = inputReader.readLine();
			try {
				selectedAction = performActionAndGetNextAction(input);
			} catch (IOException e) {
				output.println(e.getMessage());
			} catch (ATMServicer.ATMException e) {
				output.println(e.getMessage());
			} catch (SystemExit e) {
				throw new SystemExit();
			}
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
			output.println(
					"Enter account number: (" + String.join(", ", atmService.getUserAccounts(ATMServicer.loggedInUser)) + ")");
			return true;
		case deposit:
			output.println("Enter amount to deposit: ");
			return true;
		case withdraw:
			output.println("Enter withdrawal amount: ");
			return true;
		case transfer:
			output.println("From: "+ String.join(", ", atmService.getUserAccounts(ATMServicer.loggedInUser))+"?");
			return true;
		default:
			return false;
		}
	}

	private Action performActionAndGetNextAction(String input) throws SystemExit, IOException, ATMException, ATMServicer.ATMException {
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
			return atmService.login(input);
		case changeAccount:
			atmService.changeAccount(input);
			break;
		case deposit:
			return atmService.deposit(input);
		case withdraw:
			return atmService.withdraw(input);
		case transfer:
			atmService.transfer(input);
			break;
		case checkBalance:
			atmService.checkBalance();
			break;
		case getSummary:
			atmService.getSummary();
			break;
		case openNewAccount:
			return atmService.openNewAccount();
		case getHistory:
			atmService.getHistory();
			break;
		}
		return null;
	}
	

	public class SystemExit extends Throwable {
		private static final long serialVersionUID = 1L;
	}

	public class ATMException extends Exception {
		private static final long serialVersionUID = 1L;

		public ATMException(String message) {
			super(message);
		}
	}


}
