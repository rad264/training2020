package com.smbcgroup.training.atm;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

import com.smbcgroup.training.atm.dao.AccountDAO;
import com.smbcgroup.training.atm.dao.AccountNotFoundException;
import com.smbcgroup.training.atm.dao.InsufficientBalanceException;
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
	
	public Account createAccount(String userId) throws UserNotFoundException, AccountNotFoundException {
		User user = dao.getUser(userId);
		Account account = new Account();
		String accountNumber = generateAccountNumber(user.getAccounts());
		account.setAccountNumber(accountNumber);
		account.setBalance(new BigDecimal(0));
		dao.createAccount(userId, account);
		dao.writeAccountLog(accountNumber, "creation", new BigDecimal(0));
		return account;
	}

	public void deposit(String accountNumber, BigDecimal amount) throws AccountNotFoundException {
		dao.deposit(accountNumber, amount);
		dao.writeAccountLog(accountNumber, "deposit", amount);
	}

	public void withdraw(String accountNumber, BigDecimal amount) throws AccountNotFoundException, InsufficientBalanceException {
		dao.withdraw(accountNumber,amount);
		dao.writeAccountLog(accountNumber, "withdraw", amount);
	}
	
	public void transfer(String homeAccount, String destinationAccount, BigDecimal amount) throws AccountNotFoundException, InsufficientBalanceException {
		dao.withdraw(homeAccount, amount);
		dao.writeAccountLog(homeAccount, "transfer to " + destinationAccount, amount);
		dao.deposit(destinationAccount, amount);
		dao.writeAccountLog(destinationAccount, "transfer from " + homeAccount, amount);
	}
	
	public List<Logger> getAccountLogs(String accountNumber) throws AccountNotFoundException {
		return dao.getAccountLogs(accountNumber);
	}
	
	public List<Account> getUserAccounts(String userId) throws UserNotFoundException, AccountNotFoundException {
		String[] accountIds = dao.getUser(userId).getAccounts();
		if (accountIds.length == 0) return null;
		List<Account> userAccounts = new ArrayList<Account>();
		for (String accountId : accountIds) {
			userAccounts.add(dao.getAccount(accountId));
		}
		return userAccounts;
		
	}
	
	private static String generateAccountNumber(String[] existingAccounts) {
		String accountNumber = Integer.toString(new Random().nextInt(900000) + 100000);
		List<String> existingAccountsList = Arrays.asList(existingAccounts);
		if (existingAccountsList.isEmpty()) return accountNumber;
		if (existingAccountsList.contains(accountNumber)) accountNumber = Integer.toString(new Random().nextInt(900000) + 100000);
		return accountNumber;
	}

}