package com.smbcgroup.training.atm;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.math.BigDecimal;
import java.util.Calendar;

import com.smbcgroup.training.account_service.AccountService;


public class ATM {

	public static void main(String[] args) throws IOException {
		new ATM(System.in, System.out).beginSession();
	}

	private static enum Action {
		login, changeAccount, checkBalance, deposit, withdraw, transfer, createAccount, summary, history;
	}

	private BufferedReader inputReader;
	private PrintStream output;
	private String loggedInUser;
	private String selectedAccount;
	private Action selectedAction = Action.login;
	private AccountService service = new AccountService();

	ATM(InputStream input, PrintStream output) {
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
			output.println("(" + service.getSelectedAccount() + ") " + "What would you like to do?");
			return true;
		}
		switch (selectedAction) {
		case login:
			output.println("Enter user ID:");
			return true;
		case changeAccount:
			output.println(
					"Enter account number: (" + String.join(", ", service.getUserAccounts()) + ")");
			return true;
			
		case deposit:
			output.println("Enter amount to deposit: ");
			return true;

		case withdraw:
			output.println("Enter amount to withdraw: ");
			return true;
		case transfer:
			output.println("Transfer to which account: ");
			return true;

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
			try {
				service.changeAccount(input);
				return null;
			} catch (Exception e) {
				throw new ATMException("Invalid account number.");
			}
			
		case checkBalance:
			try {
				output.println("Balance: $" + service.checkBalance());

			} catch (Exception e) {
				
			}
			break;
				
		case deposit:
			try {
				service.deposit(new BigDecimal(input));
				return null;
			} catch (Exception e) {

			}
			
		case withdraw:
			try {
				service.withdraw(new BigDecimal(input));
				return null;
			} catch (Exception e) {

			}

		case transfer:
			try {
				System.out.println("Amount to transfer:");
				String toTransfer = inputReader.readLine();
				service.transfer(input, new BigDecimal(toTransfer));
				return null;
			}  catch (Exception e) {

			}

		case createAccount:
			try {
				System.out.println("New account: " + service.createAccount() + " created.");
				return null;
			}  catch (Exception e) {

			}
		
		
		case summary:
			try {
				System.out.println(service.summary());
				return null;
			} catch (Exception e) {
				throw new ATMException("Failed to get account summary.");
			}
			
		case history:
			try {
				System.out.println(service.history());
				return null;
			}catch (Exception e) {
				throw new ATMException("Failed to get account history.");
			}
			
			
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
