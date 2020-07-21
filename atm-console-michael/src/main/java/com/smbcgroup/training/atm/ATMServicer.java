package com.smbcgroup.training.atm;

import java.io.IOException;
import java.math.BigDecimal;


public class ATMServicer {
	
	public ATMServicer(AccountDAO dataAccessObject) {
		this.dao = dataAccessObject;
	}
	
	private AccountDAO dao;
	public static String loggedInUser;
	private String selectedAccount;
	private BigDecimal zero = new BigDecimal(0);
	private final BigDecimal ACCOUNT_MINIMUM = new BigDecimal(5);
	
	public void changeDataLocation(String location) {
		this.dao.changeDataLocation(location);
	}

	public ATM.Action login(String input) throws ATMException {
		try {
			dao.getUserAccounts(input);
			loggedInUser = input;
			return ATM.Action.changeAccount;
		} catch (Exception e) {
			throw new ATMException("Invalid user ID.");
		}
	}
	
	public String[] getUserAccounts(String userId) {
		return dao.getUserAccounts(userId);
	}
	
	public ATM.Action changeAccount(String input) throws ATMException {
		if (!input.matches("^\\d{6}$"))
			throw new ATMException("Invalid account number.");
		for (String userAccount : dao.getUserAccounts(loggedInUser)) {
			if (userAccount.equals(input)) {
				selectedAccount = input;
				return null;
			}
		}
		throw new ATMException("Account number not found.");
	}
	
	public ATM.Action deposit(String input) throws IOException, ATMException {
		try {
			BigDecimal depositAmount = new BigDecimal(input); 
			if (depositAmount.compareTo(zero)>0) {
				dao.depositIntoAccount(selectedAccount, depositAmount);
				dao.logTransaction(loggedInUser, String.format("Deposited $%.2f into Account %s", depositAmount,selectedAccount));
				return ATM.Action.checkBalance;
			}
			else
				ATM.selectedAction = null;
			throw new ATMException("Invalid deposit amount.");
		} catch(NumberFormatException e){
			throw new ATMException("Please enter a number for your deposit.");
		}
	}
	
	public ATM.Action withdraw(String input) throws IOException, ATMException {
		try {
			BigDecimal withdrawalAmount = new BigDecimal(input);
			BigDecimal currentBalance = dao.getAccountBalance(selectedAccount);
			if(withdrawalAmount.compareTo(zero)>0 && currentBalance.subtract(withdrawalAmount).compareTo(ACCOUNT_MINIMUM)>0 && withdrawalAmount.remainder(new BigDecimal(20)).compareTo(zero)==0) {
				dao.withdrawFromAccount(selectedAccount,withdrawalAmount);
				ATM.output.println("Here's your $"+withdrawalAmount);
				dao.logTransaction(loggedInUser, String.format("Withdrew $%.2f from Account %s", withdrawalAmount,selectedAccount));
				return ATM.Action.checkBalance;
			}
			else
				ATM.selectedAction = null;
			throw new ATMException("Invalid withdrawal amount.");
		} catch(NumberFormatException e) {
			throw new ATMException("Please enter a number for your withdrawal.");
		}
	}
	
	public void transfer(String input) throws ATMException, IOException {
		String fromAccount = input;
		boolean validAccount = false;
		for (String userAccount : dao.getUserAccounts(loggedInUser)) {
			if (fromAccount.equals(userAccount))
				validAccount = true;
		}
		if(!validAccount) {
			ATM.selectedAction = null;
			throw new ATMException("Account number not found.");
		}
		ATM.output.println("To: ");
		String toAccount = ATM.inputReader.readLine();
		validAccount = false;
		for (String userAccount : dao.getUserAccounts(loggedInUser)) {
			if (userAccount.equals(toAccount) && !toAccount.equals(fromAccount))
				validAccount = true;
		}
		if(!validAccount) {
			ATM.selectedAction = null;
			throw new ATMException("Invalid account.");
		}
		ATM.output.println("Transfer amount: ");
		String transferInput = ATM.inputReader.readLine();
		try {
			BigDecimal transferAmount = new BigDecimal(transferInput);
			if(dao.getAccountBalance(fromAccount).subtract(transferAmount).subtract(ACCOUNT_MINIMUM).compareTo(zero)>=0 ) {
				dao.withdrawFromAccount(fromAccount, transferAmount);
				dao.depositIntoAccount(toAccount, transferAmount);
				dao.logTransaction(loggedInUser, String.format("Transferred $%.2f from %s into %s", transferAmount,fromAccount,toAccount));
			}
			else {
				ATM.selectedAction = null;
				throw new ATMException("Invalid transfer amount.");
			}
		} catch(NumberFormatException e){
			ATM.selectedAction = null;
			throw new ATMException("Please enter a valid number.");
		}
	}
	
	public void getHistory() throws IOException {
		String historyAsString = dao.getTransactionHistory(loggedInUser);
		ATM.output.println(historyAsString+"\n");
	}

	public ATM.Action openNewAccount() throws IOException {
		dao.createNewAccount(loggedInUser);
		String[] userAccounts = dao.getUserAccounts(loggedInUser);
		dao.logTransaction(loggedInUser, String.format("Opened new account %s",userAccounts[userAccounts.length-1]));
		return ATM.Action.getSummary;
	}

	public void getSummary() throws IOException {
		String summaryOfAccounts = dao.getSummary(loggedInUser);
		ATM.output.println(summaryOfAccounts);
		dao.logTransaction(loggedInUser, String.format("Account summary retrieved"));
	}

	public void checkBalance() throws IOException {
		ATM.output.println("Balance: $" + dao.getAccountBalance(selectedAccount));
		dao.logTransaction(loggedInUser, String.format("Checked %s balance",selectedAccount));
	}
	
	public class ATMException extends Exception {
		private static final long serialVersionUID = 1L;

		public ATMException(String message) {
			super(message);
		}
	}

}
