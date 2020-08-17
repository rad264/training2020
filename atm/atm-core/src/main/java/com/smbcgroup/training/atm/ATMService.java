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

public class ATMService {

	private AccountDAO dao;
	private String loggedInUser;
	private String selectedAccount;
	private String transferAccount = null;

//	public ATMService() {
//		this.dao = new AccountDAOTxtFileImpl();
//	}

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

	public String[] getAccountNumbers() throws UserNotFoundException {
		return getAccountNumbers(loggedInUser);
	}

	public String[] getAccountNumbers(String userId) throws UserNotFoundException {
		Account[] accounts = getAccounts(userId);
		String[] accountNumbers = new String[accounts.length];
		for (int i = 0; i < accounts.length; i++)
			accountNumbers[i] = accounts[i].getAccountNumber();
		return accountNumbers;
	}

	public void login(String userId) throws UserNotFoundException {
		getUser(userId);
		loggedInUser = userId;
	}

	public void changeAccount(String userId, String accountNumber) throws UserNotFoundException, AccountNotFoundException {
		if (!accountAlreadyExists(userId, accountNumber))
			throw new AccountNotFoundException();
		selectedAccount = accountNumber;
	}

	public void createAccount(BankInfo bankinfo) throws AccountAlreadyExistsException, UserNotFoundException {
		createAccount(bankinfo.getUserId(), bankinfo.getAccountNumber());
	}
	
	public void createAccount(String userId, String accountNumber) throws AccountAlreadyExistsException, UserNotFoundException {
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

	public BigDecimal getAccountBalance() throws AccountNotFoundException {
		return getAccountBalance(selectedAccount);
	}

	public BigDecimal getAccountBalance(String accountNumber) throws AccountNotFoundException {
		return getAccount(accountNumber).getBalance();
	}

	public Transaction[] getAccountTransactions() throws AccountNotFoundException {
		return getAccountTransactions(selectedAccount);
	}

	public Transaction[] getAccountTransactions(String accountNumber) throws AccountNotFoundException {
		return dao.getAccountTransactions(accountNumber);
	}

	public void deposit(BigDecimal amount)
			throws AccountNotFoundException, InvalidAmountException, UserNotFoundException {
		deposit(selectedAccount, amount);
	}

	public void deposit(String accountNumber, BigDecimal amount)
			throws AccountNotFoundException, InvalidAmountException, UserNotFoundException {
		checkPositive(amount);
		Account account = getAccount(accountNumber);
		BigDecimal newBalance = account.getBalance().add(amount);
		account.setBalance(newBalance);
		dao.updateAccount(account);
		updateTransactions(accountNumber, "Deposit", amount, newBalance);
	}

	public void withdraw(BigDecimal amount)
			throws AccountNotFoundException, InvalidAmountException, UserNotFoundException {
		withdraw(selectedAccount, amount);
	}

	public void withdraw(String accountNumber, BigDecimal amount)
			throws AccountNotFoundException, InvalidAmountException, UserNotFoundException {
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
			throws AccountNotFoundException, InvalidAmountException, UserNotFoundException {
		transfer(transfer.getFromAccountNumber(), transfer.getToAccountNumber(), transfer.getTransferAmount());
	}

	public void transfer(BigDecimal amount)
			throws AccountNotFoundException, InvalidAmountException, UserNotFoundException {
		transfer(selectedAccount, transferAccount, amount);
	}

	public void transfer(String sourceAccountNumber, String destinationAccountNumber, BigDecimal amount)
			throws AccountNotFoundException, InvalidAmountException, UserNotFoundException {
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

	public boolean checkSameAccount(String accountNumber) {
		return accountNumber.equals(selectedAccount);
	}

	public boolean setTransferAccount(String accountNumber) throws UserNotFoundException {
		transferAccount = null;
		for (String userAccount : getAccountNumbers(loggedInUser)) {
			if (userAccount.equals(accountNumber))
				transferAccount = accountNumber;
		}
		return transferAccount != null;
	}

//	public void clearUserTransactions() throws UserNotFoundException {
//		try {
//			dao.clearUserTransactions(loggedInUser);
//		} catch (RuntimeException e) {
//			throw new UserNotFoundException();
//		}
//	}

	public BigDecimal toBigDecimal(String string) throws InvalidAmountException {
		try {
			return new BigDecimal(string);
		} catch (NumberFormatException e) {
			throw new InvalidAmountException();
		}
	}

}
