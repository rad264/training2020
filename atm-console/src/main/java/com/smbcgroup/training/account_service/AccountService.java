package com.smbcgroup.training.account_service;

import java.math.BigDecimal;
import java.util.Calendar;

import com.smbcgroup.training.account_accessor.AccountAccessor;
import com.smbcgroup.training.account_dao.AccountDAO;
import com.smbcgroup.training.account_dao.AccountDAOStaticImpl;


public class AccountService {

	private String loggedInUser;
	private String selectedAccount;
	private String[] userAccounts; 
	
	private AccountDAO dao;
	
	public AccountService() {
		dao = new AccountDAOStaticImpl();
	}
	
	public AccountService(AccountDAO dao) {
		this.dao = dao;
	}
	
	public void login(String userId) throws AccountNotFoundException {
		try {
			setUserAccounts(dao.getUserAccounts(userId));
			loggedInUser = userId;
		} catch (Exception e) {
			throw new AccountNotFoundException("Invalid user ID.");
		}

	}
	
	public void changeAccount(String accountNumber) throws AccountServiceException {
		try {
			for (String userAccount : dao.getUserAccounts(loggedInUser)) {
				if(userAccount.equals(accountNumber)) {

					selectedAccount = accountNumber;
					return;
				}
			}
		} catch (Exception e) {
			throw new AccountServiceException("Invalid user ID.");
		}
		
		

	}
	
	public BigDecimal checkBalance() throws AccountBalanceException {
		try {
			return dao.getAccountBalance(selectedAccount);
		} catch (Exception e) {
			throw new AccountBalanceException("Can't check account balance.");
		}
	}

	
	public void deposit(BigDecimal depositAmount) throws AccountBalanceException {
		try {
			dao.updateAccountBalance(selectedAccount, dao.getAccountBalance(selectedAccount).add(depositAmount));
			dao.appendAudit(selectedAccount, "Deposited  $" +  depositAmount.toPlainString() + " at: " + Calendar.getInstance().getTime() + "\n");
		} catch (Exception e) {
			throw new AccountBalanceException("Inavlid amount.");
		}
	}
	
	public void withdraw(BigDecimal withdrawAmount) throws AccountBalanceException {
		try {
			dao.updateAccountBalance(selectedAccount, dao.getAccountBalance(selectedAccount).subtract(withdrawAmount));
			dao.appendAudit(selectedAccount, "Withdrew  $" +  withdrawAmount.toPlainString() + " at: " + Calendar.getInstance().getTime() + "\n");

		} catch (Exception e) {
			throw new AccountBalanceException("Invalid amount.");
		}
	}
	
	public void transfer(String accountToTransferTo, BigDecimal amount) throws AccountBalanceException {
		try {
			
			dao.updateAccountBalance(accountToTransferTo, dao.getAccountBalance(accountToTransferTo).add(amount));
			AccountAccessor.appendAudit(accountToTransferTo,  "Received $" +  amount.toPlainString() + " transfer from account: " + selectedAccount + " at: " + Calendar.getInstance().getTime() + "\n");				

			dao.updateAccountBalance(selectedAccount, dao.getAccountBalance(selectedAccount).subtract(amount));
			AccountAccessor.appendAudit(selectedAccount,  "Transferred  $" +  amount.toPlainString() + " to account: " + accountToTransferTo + " at: " + Calendar.getInstance().getTime() + "\n");				

		} catch(Exception e) {
			throw new AccountBalanceException("Invalid transfer.");

		}
	}
	
	public String createAccount() throws AccountServiceException {
		try {
			String newAccount = dao.createAccount(loggedInUser);
			AccountAccessor.appendAudit(newAccount,  "Account created at: " + Calendar.getInstance().getTime() + "\n");				

			login(loggedInUser);
			return newAccount;
		} catch (Exception e) {
			throw new AccountServiceException("Could not create account.");
		}
	}
	
	public String summary() {
		StringBuilder sb = new StringBuilder();
		for(String account : getUserAccounts()) {
			sb.append(account + ": $" + dao.getAccountBalance(account) + "\n");
		}
		return sb.toString();
	}
	
	public String history() {
		return dao.getAccountHistory(selectedAccount);
	}
	
	public String getLoggedInUser() {
		return loggedInUser;
	}
	public void setLoggedInUser(String loggedInUser) {
		this.loggedInUser = loggedInUser;
	}
	public String getSelectedAccount() {
		return selectedAccount;
	}
	public void setSelectedAccount(String selectedAccount) {
		this.selectedAccount = selectedAccount;
	}
	
	public String[] getUserAccounts() {
		return userAccounts;
	}

	public void setUserAccounts(String[] userAccounts) {
		this.userAccounts = userAccounts;
	}
	private class AccountServiceException extends Exception {
		public AccountServiceException(String message) {
			super(message);
		}
	}
	
	private class AccountNotFoundException extends Exception {
		public AccountNotFoundException(String message) {
			super(message);
		}
	}
	
	private class AccountBalanceException extends Exception {
		private static final long serialVersionUID = 1L;

		public AccountBalanceException(String message) {
			super(message);
		}
	}
}
