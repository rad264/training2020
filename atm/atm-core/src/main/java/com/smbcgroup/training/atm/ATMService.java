package com.smbcgroup.training.atm;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.smbcgroup.training.atm.dao.AccountDAO;
//import com.smbcgroup.training.atm.dao.txtFile.AccountDAOTxtFileImpl;
import com.smbcgroup.training.atm.dao.AccountNotFoundException;
import com.smbcgroup.training.atm.dao.FailedToCreateAccountException;
import com.smbcgroup.training.atm.dao.UserNotFoundException;
import com.smbcgroup.training.atm.dao.AccountAlreadyExistsException;
import com.smbcgroup.training.atm.dao.InsufficientFundsException;
import com.smbcgroup.training.atm.dao.NegativeAmountException;
import com.smbcgroup.training.atm.dao.UserAlreadyExistsException;

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

	public Account[] getAccounts(String userId) throws UserNotFoundException {
		return dao.getAccounts(userId);
	}

	public String[] getAccountNumbers(String userId) throws UserNotFoundException {
		Account[] accounts = getAccounts(userId);
		String[] accountNumbers = new String[accounts.length];
		for (int i = 0; i < accounts.length; i++)
			accountNumbers[i] = accounts[i].getAccountNumber();
		return accountNumbers;
	}

	public Account createAccount(String userId, String accountType)
			throws UserNotFoundException, FailedToCreateAccountException {
		return dao.createAccount(userId, accountType);
	}

	public void createUser(String userId) throws UserAlreadyExistsException {
		try {
			getUser(userId);
			throw new UserAlreadyExistsException();
		} catch (UserNotFoundException e) {
			dao.createUser(userId);
		}
	}

	public BigDecimal getAccountBalance(String accountNumber) throws AccountNotFoundException {
		return getAccount(accountNumber).getBalance();
	}

	public Transaction[] getAccountTransactions(String accountNumber) throws AccountNotFoundException {
		return dao.getAccountTransactions(accountNumber);
	}


	public Account deposit(String accountNumber, BigDecimal amount)
			throws AccountNotFoundException, NegativeAmountException {
		checkPositive(amount);
		Account account = getAccount(accountNumber);
		BigDecimal newBalance = account.getBalance().add(amount);
		account.setBalance(newBalance);
		dao.updateAccount(account);
		updateTransactions(accountNumber, "Deposit", amount, newBalance);
		return getAccount(accountNumber);
	}
	
	public Account withdraw(String accountNumber, BigDecimal amount)
			throws AccountNotFoundException, NegativeAmountException, InsufficientFundsException {
		checkPositive(amount);
		Account account = getAccount(accountNumber);
		if (account.getBalance().subtract(amount).compareTo(BigDecimal.TEN) < 0)
			throw new InsufficientFundsException();
		BigDecimal newBalance = account.getBalance().subtract(amount);
		account.setBalance(newBalance);
		dao.updateAccount(account);
		updateTransactions(accountNumber, "Withdraw", amount, newBalance);
		return getAccount(accountNumber);
	}

	private void checkPositive(BigDecimal amount) throws NegativeAmountException {
		if (amount.compareTo(BigDecimal.ZERO) <= 0)
			throw new NegativeAmountException();
	}

	public List<Account> transfer(Transfer transfer)
			throws AccountNotFoundException, NegativeAmountException, InsufficientFundsException {
		return transfer(transfer.getFromAccountNumber(), transfer.getToAccountNumber(), transfer.getTransferAmount());
	}

	public List<Account> transfer(String fromAccountNumber, String toAccountNumber, BigDecimal amount)
			throws AccountNotFoundException, NegativeAmountException, InsufficientFundsException {
		checkPositive(amount);
		
		Account fromAccount = getAccount(fromAccountNumber);
		if (fromAccount.getBalance().subtract(amount).compareTo(BigDecimal.TEN) < 0)
			throw new InsufficientFundsException();
		BigDecimal newFromBalance = fromAccount.getBalance().subtract(amount);
		fromAccount.setBalance(newFromBalance);
		dao.updateAccount(fromAccount);
		updateTransactions(fromAccountNumber, "Transfer", amount, newFromBalance);
		
		Account toAccount = getAccount(toAccountNumber);
		BigDecimal newToBalance = toAccount.getBalance().add(amount);
		toAccount.setBalance(newToBalance);
		dao.updateAccount(toAccount);
		updateTransactions(toAccountNumber, "Transfer", amount, newToBalance);
		
		List<Account> accountPair = new ArrayList<Account>();
		
		accountPair.add(getAccount(fromAccountNumber));
		accountPair.add(getAccount(toAccountNumber));
		
		return accountPair;
	}

	public void updateTransactions(String accountNumber, String type, BigDecimal amount, BigDecimal balance)
			throws AccountNotFoundException {
		Transaction transaction = new Transaction();
		transaction.setDate(new Date());
		transaction.setType(type);
		transaction.setAmount(amount);
		transaction.setBalance(balance);
		dao.updateAccountTransactions(accountNumber, transaction);
	}

	public BigDecimal toBigDecimal(String string) throws NegativeAmountException {
		try {
			return new BigDecimal(string);
		} catch (NumberFormatException e) {
			throw new NegativeAmountException();
		}
	}
}
