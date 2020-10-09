package com.smbcgroup.training.atm;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.smbcgroup.training.atm.ATMServiceException.Type;
import com.smbcgroup.training.atm.dao.AccountDAO;
import com.smbcgroup.training.atm.dao.AccountNotFoundException;
import com.smbcgroup.training.atm.dao.UserNotFoundException;


public class ATMService {
	
	private AccountDAO dao;
	
	public ATMService(AccountDAO dao) {
		this.dao = dao;
	}
	
	public User getUser(String userId) throws UserNotFoundException {
		return dao.getUser(userId);
	}

	public Account getAccount(String accountNumber) throws AccountNotFoundException {
		return dao.getAccount(accountNumber);
	}
	
	public List<String> getUserAccounts(String userId) throws UserNotFoundException {
		return dao.getUserAccounts(userId);
	}
	
	public BigDecimal getAccountBalance(String accountNumber) throws AccountNotFoundException {
		return dao.getAccountBalance(accountNumber);
	}
	
	public List<String> viewAccountHistory(String accountNumber) throws AccountNotFoundException {
		Account account = dao.getAccount(accountNumber);
		List<Transaction> transactions = account.getTransactions();
		
		List<String> toReturn = new ArrayList<String>();
		for (Transaction transaction : transactions) {
			toReturn.add(transaction.toString() + '\n');
		}
		return toReturn;
	}
	
	public String addNewAccount(String userId) throws UserNotFoundException {
		return dao.addNewAccount(userId);
	}

	public void deposit(String accountNumber, BigDecimal depositAmount) throws AccountNotFoundException{
		Account account = getAccount(accountNumber);
		account.setBalance(account.getBalance().add(depositAmount));
		dao.updateAccount(account);
		dao.updateLogs(accountNumber, depositAmount, "DEPOSIT");
	}
	
	public void withdraw(String accountNumber, BigDecimal withdrawalAmount) throws ATMServiceException, AccountNotFoundException {
		Account account = getAccount(accountNumber);
		BigDecimal balance = account.getBalance().subtract(withdrawalAmount);
		if (balance.compareTo(BigDecimal.ZERO) < 0)
			throw new ATMServiceException(Type.INSUFFICIENT_FUNDS);
	
		account.setBalance(balance);
		dao.updateAccount(account);
		dao.updateLogs(accountNumber, withdrawalAmount, "WITHDRAW");
	}
	
	public void transfer(String userID, String senderAccountNumber, BigDecimal transferAmount, String recipientAccountNumber) throws ATMServiceException, AccountNotFoundException {
		System.out.println(transferAmount);

		Account senderAccount = dao.getAccount(senderAccountNumber);
		Account recipientAccount = dao.getAccount(recipientAccountNumber);
		
		BigDecimal balance = senderAccount.getBalance().subtract(transferAmount);
		System.out.println(senderAccount.getBalance());
		System.out.println(recipientAccount.getBalance());
		System.out.println(balance);
		if (balance.compareTo(BigDecimal.ZERO) < 0)
			throw new ATMServiceException(Type.INSUFFICIENT_FUNDS);
			
		senderAccount.setBalance(balance);
		recipientAccount.setBalance(recipientAccount.getBalance().add(transferAmount));
		dao.updateAccount(senderAccount);
		dao.updateAccount(recipientAccount);
		dao.updateLogs(senderAccountNumber, transferAmount, "Transfer to");
		dao.updateLogs(recipientAccountNumber, transferAmount, "Transfer from");
	}

}
