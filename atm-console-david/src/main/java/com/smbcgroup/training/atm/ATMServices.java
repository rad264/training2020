package com.smbcgroup.training.atm;

import java.io.IOException;
import java.math.BigDecimal;

public class ATMServices implements ATMCore{

	public static void main(String[] args) throws IOException {
		new ATMServices().beginSession();
	}

	private AccountDAO databaseAccessor = new AccountDAOTxtImpl("data/");
	private UI ui = new ConsoleUI(this);

	private String loggedInUser;
	private String selectedAccount;
	private Action selectedAction = Action.login;

	private ATMServices() {
	}

	private void beginSession() {
		try {
			ui.init();
			while (true)
				triggerAction();
		} catch (SystemExit e) {

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			ui.exit();
		}
	}

	private void triggerAction() throws IOException, SystemExit {
		try {
			String input = null;
			if (requiresInput())
				input = ui.getInput(selectedAction);
			performAction(input);
			selectedAction = getNextAction(input);
		} catch (ATMException e) {
			ui.printErr(e.getMessage());
		}
	}

	private boolean requiresInput() {
		if (selectedAction == null) {
			return true;
		}
		switch (selectedAction) {
		case login:
			return true;
		case changeAccount:
			return true;
		case deposit:
			return true;
		case withdraw:
			return true;
		case addAccount:
			return true;
		case transfer:
			return true;
		default:
			return false;
		}
	}

	
	private Action getNextAction(String input) throws ATMException {
		if (selectedAction == null) {
			try {
				if (input.equals("transfer2") || input.equals("transferAmt"))
					throw new ATMException("Invalid command.");
				return Action.valueOf(input);
			} catch (IllegalArgumentException e) {
				throw new ATMException("Invalid command.");
			}
		}
		switch (selectedAction) {
		case login: 	return Action.changeAccount;
		case transfer:  return Action.transfer2;
		case transfer2: return Action.transferAmt;
		default: return null;
		}
	}
	
	private void performAction(String input) throws ATMException, SystemExit, IOException {
		if ("exit".equals(input))
			throw new SystemExit();

		if (selectedAction == null) return;
		switch (selectedAction) {
		case login:
			try {
				databaseAccessor.getUserAccounts(input);
				loggedInUser = input;
				return;
			} catch (Exception e) {
				throw new ATMException("Invalid user ID.");
			}
		case changeAccount:
			if (!input.matches("^\\d{6}$"))
				throw new ATMException("Invalid account number.");
			for (String userAccount : databaseAccessor.getUserAccounts(loggedInUser)) {
				if (userAccount.equals(input)) {
					selectedAccount = input;
					return;
				}
			}
			throw new ATMException("Account number not found.");
		case checkBalance:
			ui.showBalance();
			break;
		case deposit: 
			BigDecimal deposit = new BigDecimal(input);
			addToAcc(selectedAccount, deposit);
			break;
		case withdraw:
			BigDecimal withdrawal = new BigDecimal(input).negate();
			addToAcc(selectedAccount, withdrawal);
			break;
		case addAccount:
			try {
				databaseAccessor.createAccount(loggedInUser, input); 
				databaseAccessor.setAccountBalance(input, BigDecimal.ZERO);
			} catch (Exception e) {
				e.printStackTrace();
				throw new ATMException("Unable to create account: " + e.getMessage());
			}
			break;
		case showAccounts:
			ui.showAccounts();
			break;
		case transfer:
			String accFrom = input;
			String accTo = ui.getInput(Action.transfer2);
			BigDecimal transfer;

			try {
				transfer = new BigDecimal(ui.getInput(Action.transferAmt));
			} catch (NumberFormatException e) {
				ui.printErr("Not a valid number");
				return;
			}
			
			addToAcc(accFrom, transfer.negate());
			addToAcc(accTo, transfer);
			break;
		case showHistory:
			ui.showHistory(databaseAccessor.getHistory(selectedAccount));
			break;
		default:
			break;
		}
			
	}
	
	public String[] getUserAccounts() {
		return databaseAccessor.getUserAccounts(loggedInUser);
	}
	
	public BigDecimal getBalance() throws IOException {
		return databaseAccessor.getAccountBalance(selectedAccount);
	}

	public BigDecimal getBalance(String accountID) throws IOException {
		return databaseAccessor.getAccountBalance(accountID);
	}
	
	private void addToAcc(String account, BigDecimal input) throws ATMException{
		try {
			BigDecimal currentBal = databaseAccessor.getAccountBalance(account);
			BigDecimal newBalance = input.add(currentBal);

			if (newBalance.compareTo(BigDecimal.ZERO) == -1) {
				throw new ATMException("Cannot withdraw more than current balance [$" + currentBal + "]");
			}
			databaseAccessor.setAccountBalance(account, newBalance);
			databaseAccessor.addStamp(account, input, System.currentTimeMillis());

			ui.showSuccessfulBalanceUpdate(input, account, currentBal, newBalance);
		} catch (Exception e){
			throw new ATMException("Unable to update funds: " + e.getMessage());
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
