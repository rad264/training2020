package com.smbcgroup.training.atm;

import java.math.BigDecimal;
import java.util.Date;

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


	public void deposit(String accountNumber, BigDecimal amount)
			throws AccountNotFoundException, NegativeAmountException {
		checkPositive(amount);
		Account account = getAccount(accountNumber);
		BigDecimal newBalance = account.getBalance().add(amount);
		account.setBalance(newBalance);
		dao.updateAccount(account);
		updateTransactions(accountNumber, "Deposit", amount, newBalance);
	}
	
	public void withdraw(String accountNumber, BigDecimal amount)
			throws AccountNotFoundException, NegativeAmountException, InsufficientFundsException {
		checkPositive(amount);
		Account account = getAccount(accountNumber);
		if (account.getBalance().subtract(amount).compareTo(BigDecimal.TEN) < 0)
			throw new InsufficientFundsException();
		BigDecimal newBalance = account.getBalance().subtract(amount);
		account.setBalance(newBalance);
		dao.updateAccount(account);
		updateTransactions(accountNumber, "Withdraw", amount, newBalance);
	}

	private void checkPositive(BigDecimal amount) throws NegativeAmountException {
		if (amount.compareTo(BigDecimal.ZERO) <= 0)
			throw new NegativeAmountException();
	}

	public void transfer(Transfer transfer)
			throws AccountNotFoundException, NegativeAmountException, InsufficientFundsException {
		transfer(transfer.getFromAccountNumber(), transfer.getToAccountNumber(), transfer.getTransferAmount());
	}

	public void transfer(String sourceAccountNumber, String destinationAccountNumber, BigDecimal amount)
			throws AccountNotFoundException, NegativeAmountException, InsufficientFundsException {
		withdraw(sourceAccountNumber, amount);
		deposit(destinationAccountNumber, amount);
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
