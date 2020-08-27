package com.smbcgroup.training.atm;

import java.math.BigDecimal;
import java.util.Date;

import com.smbcgroup.training.atm.dao.AccountDAO;
//import com.smbcgroup.training.atm.dao.txtFile.AccountDAOTxtFileImpl;
import com.smbcgroup.training.atm.dao.AccountNotFoundException;
import com.smbcgroup.training.atm.dao.UserNotFoundException;
import com.smbcgroup.training.atm.dao.AccountAlreadyExistsException;
import com.smbcgroup.training.atm.dao.FailToCreateAccountException;
import com.smbcgroup.training.atm.dao.InvalidAmountException;
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

	public void createAccount(String userId, String accountNumber)
			throws AccountAlreadyExistsException, UserNotFoundException {
		if (accountAlreadyExists(userId, accountNumber))
			throw new AccountAlreadyExistsException();
		dao.createAccount(userId, accountNumber);
	}

	private Boolean accountAlreadyExists(String userId, String accountNumber) throws UserNotFoundException {
		for (String userAccount : getAccountNumbers(userId)) {
			if (userAccount.equals(accountNumber))
				return true;
		}
		return false;
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
			throws AccountNotFoundException, InvalidAmountException {
		checkPositive(amount);
		Account account = getAccount(accountNumber);
		BigDecimal newBalance = account.getBalance().add(amount);
		account.setBalance(newBalance);
		dao.updateAccount(account);
		updateTransactions(accountNumber, "Deposit", amount, newBalance);
	}
	
	public void withdraw(String accountNumber, BigDecimal amount)
			throws AccountNotFoundException, InvalidAmountException {
		checkPositive(amount);
		Account account = getAccount(accountNumber);
		if (account.getBalance().subtract(amount).compareTo(BigDecimal.TEN) < 0)
			throw new InvalidAmountException();
		BigDecimal newBalance = account.getBalance().subtract(amount);
		account.setBalance(newBalance);
		dao.updateAccount(account);
		updateTransactions(accountNumber, "Withdraw", amount, newBalance);
	}

	private void checkPositive(BigDecimal amount) throws InvalidAmountException {
		if (amount.compareTo(BigDecimal.ZERO) <= 0)
			throw new InvalidAmountException();
	}

	public void transfer(Transfer transfer)
			throws AccountNotFoundException, InvalidAmountException {
		transfer(transfer.getFromAccountNumber(), transfer.getToAccountNumber(), transfer.getTransferAmount());
	}

	public void transfer(String sourceAccountNumber, String destinationAccountNumber, BigDecimal amount)
			throws AccountNotFoundException, InvalidAmountException {
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

	public BigDecimal toBigDecimal(String string) throws InvalidAmountException {
		try {
			return new BigDecimal(string);
		} catch (NumberFormatException e) {
			throw new InvalidAmountException();
		}
	}
}
