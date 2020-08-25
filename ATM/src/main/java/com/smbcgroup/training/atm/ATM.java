package com.smbcgroup.training.atm;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;

public class ATM {

	public static void main(String[] args) throws IOException {
		new ATM(System.in, System.out).beginSession();
	}

	private static enum Action {
		login, changeAccount, checkBalance, deposit, withdraw, openAccount, 
		transfer, transactionHistory, accountSummary;
		// TODO: add more actions
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
			output.println("Are you a existing user? Please enter yes or no.");
			String input = inputReader.readLine();
			while (!validateFirstInput(input)) {
				output.println("Please enter yes or no only.");
				input = inputReader.readLine();
			}
			if (input.equals("no")) {
				registerNewUser();
			}
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
	
	private boolean validateFirstInput(String input) {
		if (input.toLowerCase().equals("yes") || input.toLowerCase().equals("no")) {
			return true;
		}
		return false;
	}
	
	private void registerNewUser() throws IOException {
		output.println("Please enter your user Id");
		String userId = inputReader.readLine();
		while (userId.length() == 0 || Files.exists(Path.of("data/users/" + userId + ".txt"))) {
			output.println("User already exist. Please enter a new one.");
			userId = inputReader.readLine();
		}
		String accountNumber = AccountAccessor.createNewUser(userId);
		selectedAccount = accountNumber;
		selectedAction = null;
		loggedInUser = userId;
		output.println("Welcome! Your account number is: " + accountNumber);
	}

	private void triggerAction() throws IOException, SystemExit {
		try {
			String input = null;
			if (promptUserInput())
				input = inputReader.readLine();
			while (selectedAction == Action.deposit && !isValidAmount(input)) {
				input = inputReader.readLine();
			}
			while (selectedAction == Action.withdraw && !isValidWithdrawAmount(selectedAccount, input)) {
				input = inputReader.readLine();
			}
			if (selectedAction == Action.transfer) {
				String amountInput = null;
				String accountInput = null;
				while (!isValidRecipient(input)) {
					input = inputReader.readLine();
				}
				output.println("Please enter the recipient's account.");
				accountInput = inputReader.readLine();
				while (!isValidAccountNumber(input, accountInput)) {
					accountInput = inputReader.readLine();
				}
				output.println("Please enter the amount you wish to transfer.");
				amountInput = inputReader.readLine();
				while (!isValidWithdrawAmount(selectedAccount, amountInput)) {
					amountInput = inputReader.readLine();
				}
				input = input + "," + accountInput + "," + amountInput;
			}
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
			output.println(
					"Enter account number: (" + String.join(", ", AccountAccessor.getUserAccounts(loggedInUser)) + ")");
			return true;
		// TODO: prompts for other actions(?)
		case deposit:
			output.println("Please enter your deposit amount:");
			return true;
		case withdraw:
			output.println("Please enter your withdraw amount");
			return true;
		case transfer:
			output.println("Please enter the recipient's user name");
			return true;
		case transactionHistory:
			return false;
		case openAccount:
			return false;
		case accountSummary:
			return false;
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
			output.println("Balance: $" + AccountAccessor.getAccountBalance(selectedAccount));
			break;
		case deposit:
			AccountAccessor.writeAccountBalance(selectedAccount, new BigDecimal(input));
			AccountAccessor.recordTransactionHistory("Deposit", input, loggedInUser, selectedAccount);
			break;
		case withdraw:
			BigDecimal amount= new BigDecimal(input);
			AccountAccessor.writeAccountBalance(selectedAccount, amount.negate());
			AccountAccessor.recordTransactionHistory("Withdraw", amount.toString(), loggedInUser, selectedAccount);
			break;
		case transfer:
			String[] info = input.split(",");
			AccountAccessor.transferMoney(selectedAccount, info[1], loggedInUser, info[0], new BigDecimal(info[2]));
			break;
		case transactionHistory:
			AccountAccessor.printTransactionHistory(loggedInUser, selectedAccount);
			break;
		case openAccount:
			String accountNumber = AccountAccessor.addUserAccount(loggedInUser);
			output.println("Successuful! Your account number is: " + accountNumber);
			break;
		case accountSummary:
			AccountAccessor.printAccountSummary(loggedInUser);
			break;
		// TODO: handle other actions
		}
		return null;
	}
	
	private boolean isValidAmount(String amount) {
		if (amount.length() == 0) {
			output.println("Please enter a valid number.");
			return false;
		}
		if (amount.charAt(0) == '-') {
			output.println("Please enter a positive number only.");
			return false;
		}
		try {
			convertToBigDecimal(amount);
		} catch(ATMException e) {
			output.println("Invalid number.");
			return false;
		}
		return true;
	}
	
	private boolean isValidWithdrawAmount(String accountNumber, String amount) {
		if (!(isValidAmount(amount)))
			return false;
		BigDecimal currBalance = AccountAccessor.getAccountBalance(accountNumber);
		if (currBalance.compareTo(new BigDecimal(amount)) == -1) {
			output.println("Insufficient balance. Please enter a new number.");
			return false;
		}
		return true;
	}
	
	private boolean isValidRecipient(String userId) {
		if (!Files.exists(Path.of("data/users/" + userId + ".txt"))) {
			output.println("The user you entered dose not exist. Please enter a different one.");
			return false;
		}
		return true;
	}
	
	private boolean isValidAccountNumber(String userId, String accountNumber) {
		if (selectedAccount.equals(accountNumber)) {
			output.println("You cannot transfer money to the same account!");
			return false;
		}
		if (!AccountAccessor.isValidAccount(userId, accountNumber)) {
			return false;
		}
		return true;
	}
	
	private BigDecimal convertToBigDecimal(String input) throws ATMException {
		try {
			return new BigDecimal(input);
		} catch (NumberFormatException e) {
			throw new ATMException("Invalid amount.");
		}
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
