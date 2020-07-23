package com.smbcgroup.training.atm;

import java.math.BigDecimal;

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

	public boolean changeAccount(String accountNumber) throws AccountNotFoundException, UserNotFoundException {
		try {
			if (accountAlreadyExists(accountNumber)) {
				selectedAccount = accountNumber;
				return true;
			}
		} catch (RuntimeException e) {
			throw new AccountNotFoundException();
		} catch (UserNotFoundException e) {
			throw new UserNotFoundException();
		}
		return false;
	}

	public void createAccount(String accountNumber) throws FailToCreateAccountException, AccountAlreadyExistsException {

		try {
			if (accountAlreadyExists(accountNumber))
				throw new AccountAlreadyExistsException();
			dao.createAccount(loggedInUser, accountNumber);
		} catch (RuntimeException | UserNotFoundException e) {
			throw new FailToCreateAccountException();
		}
	}

	private Boolean accountAlreadyExists(String accountNumber) throws UserNotFoundException {
		try {
			for (String userAccount : getAccountNumbers(loggedInUser)) {
				if (userAccount.equals(accountNumber)) {
					return true;
				}
			}
		} catch (RuntimeException e) {
			throw new UserNotFoundException();
		}
		return false;
	}

	public BigDecimal getAccountBalance() throws AccountNotFoundException {
		return getAccountBalance(selectedAccount);
	}

	public BigDecimal getAccountBalance(String accountNumber) throws AccountNotFoundException {
		try {
//			return dao.getAccountBalance(accountNumber);
			return getAccount(accountNumber).getBalance();
		} catch (RuntimeException e) {
			throw new AccountNotFoundException();
		}
	}
//
//	public String[] getUserTransactions() throws UserNotFoundException {
//		try {
//			return dao.getUserTransactions(loggedInUser);
//		} catch (RuntimeException e) {
//			throw new UserNotFoundException();
//		}
//	}

	public void deposit(BigDecimal amount)
			throws AccountNotFoundException, InvalidAmountException, UserNotFoundException {
		deposit(selectedAccount, amount);
	}

	public void deposit(String accountNumber, BigDecimal amount)
			throws AccountNotFoundException, InvalidAmountException, UserNotFoundException {
//		BigDecimal currentBalance = getAccountBalance();
		checkPositive(amount);
		Account account = getAccount(accountNumber);
		account.setBalance(account.getBalance().add(amount));
		dao.updateAccount(account);
//		dao.updateAccountBalance(accountNumber, currentBalance.add(amount));
//		try {
//			dao.updateUserTransactions(loggedInUser, accountNumber, amount, "Deposit", "+");
//		} catch (RuntimeException e) {
//			throw new UserNotFoundException();
//		}
	}

	public void withdraw(BigDecimal amount)
			throws AccountNotFoundException, InvalidAmountException, UserNotFoundException {
		withdraw(selectedAccount, amount);
	}

	public void withdraw(String accountNumber, BigDecimal amount)
			throws AccountNotFoundException, InvalidAmountException, UserNotFoundException {
//		BigDecimal currentBalance = getAccountBalance();
		checkPositive(amount);
		Account account = getAccount(accountNumber);
		if (account.getBalance().subtract(amount).compareTo(BigDecimal.TEN) < 0)
			throw new InvalidAmountException();
		account.setBalance(account.getBalance().subtract(amount));
		dao.updateAccount(account);
//		dao.updateAccountBalance(accountNumber, currentBalance.subtract(amount));
//		try {
//			dao.updateUserTransactions(loggedInUser, accountNumber, amount, "Withdraw", "-");
//		} catch (RuntimeException e) {
//			throw new UserNotFoundException();
//		}
	}

	private void checkPositive(BigDecimal amount) throws InvalidAmountException {
		if (amount.compareTo(BigDecimal.ZERO) <= 0)
			throw new InvalidAmountException();
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

	public boolean checkAlreadyLoggedIn(String accountNumber) {
		return accountNumber.equals(selectedAccount);
	}

	public boolean setTransferAccount(String accountNumber) throws UserNotFoundException {
		transferAccount = null;
		try {
			for (String userAccount : getAccountNumbers(loggedInUser)) {
				if (userAccount.equals(accountNumber)) {
					transferAccount = accountNumber;
				}
			}
		} catch (RuntimeException e) {
			throw new UserNotFoundException();
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
