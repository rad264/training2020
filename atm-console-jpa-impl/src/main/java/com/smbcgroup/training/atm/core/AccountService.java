package com.smbcgroup.training.atm.core;

import java.math.BigDecimal;

import com.smbcgroup.training.atm.core.dao.AccountDAO;
import com.smbcgroup.training.atm.daoTextImpl.AccountDAOTxtFileImpl;
import com.smbcgroup.training.atm.exceptions.AccountNotFoundException;
import com.smbcgroup.training.atm.exceptions.InvalidAmountException;
import com.smbcgroup.training.atm.exceptions.UserNotFoundException;

public class AccountService {

	private AccountDAO dao;
	private String loggedInUser;
	private String selectedAccount;
	private String transferAccount = null;

	public AccountService() {
		this.dao = new AccountDAOTxtFileImpl();
	}

	public AccountService(AccountDAO dao) {
		this.dao = dao;
	}

	public void login(String userId) throws UserNotFoundException {
		try {
			dao.getUserAccounts(userId);
			loggedInUser = userId;
		} catch (RuntimeException e) {
			throw new UserNotFoundException();
		}
	}

	public boolean changeAccount(String input) throws UserNotFoundException {
		try {
			for (String userAccount : dao.getUserAccounts(loggedInUser)) {
				if (userAccount.equals(input)) {
					selectedAccount = input;
					return true;
				}
			}
		} catch (RuntimeException e) {
			throw new UserNotFoundException();
		}
		return false;
	}

	public String[] getUserAccounts() throws UserNotFoundException {
		return getUserAccounts(loggedInUser);
	}

	public String[] getUserAccounts(String userId) throws UserNotFoundException {
		try {
			return dao.getUserAccounts(userId);
		} catch (RuntimeException e) {
			throw new UserNotFoundException();
		}
	}

	public BigDecimal getAccountBalance() throws AccountNotFoundException {
		return getAccountBalance(selectedAccount);
	}

	public BigDecimal getAccountBalance(String accountNumber) throws AccountNotFoundException {
		try {
			return dao.getAccountBalance(accountNumber);
		} catch (RuntimeException e) {
			throw new AccountNotFoundException();
		}
	}

	public String[] getUserTransactions() throws UserNotFoundException {
		try {
			return dao.getUserTransactions(loggedInUser);
		} catch (RuntimeException e) {
			throw new UserNotFoundException();
		}
	}

	public void deposit(BigDecimal amount)
			throws AccountNotFoundException, InvalidAmountException, UserNotFoundException {
		deposit(selectedAccount, amount);
	}

	public void deposit(String accountNumber, BigDecimal amount)
			throws AccountNotFoundException, InvalidAmountException, UserNotFoundException {
		BigDecimal currentBalance = getAccountBalance();
		if (amount.compareTo(BigDecimal.ZERO) <= 0)
			throw new InvalidAmountException();
		dao.updateAccountBalance(accountNumber, currentBalance.add(amount));
		try {
			dao.updateUserTransactions(loggedInUser, accountNumber, amount, "Deposit", "+");
		} catch (RuntimeException e) {
			throw new UserNotFoundException();
		}
	}

	public void withdraw(BigDecimal amount)
			throws AccountNotFoundException, InvalidAmountException, UserNotFoundException {
		withdraw(selectedAccount, amount);
	}

	public void withdraw(String accountNumber, BigDecimal amount)
			throws AccountNotFoundException, InvalidAmountException, UserNotFoundException {
		BigDecimal currentBalance = getAccountBalance();
		if (amount.compareTo(BigDecimal.ZERO) <= 0)
			throw new InvalidAmountException();
		if (currentBalance.subtract(amount).compareTo(BigDecimal.TEN) <= 0)
			throw new InvalidAmountException();
		dao.updateAccountBalance(accountNumber, currentBalance.subtract(amount));
		try {
			dao.updateUserTransactions(loggedInUser, accountNumber, amount, "Withdraw", "-");
		} catch (RuntimeException e) {
			throw new UserNotFoundException();
		}
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
			for (String userAccount : dao.getUserAccounts(loggedInUser)) {
				if (userAccount.equals(accountNumber)) {
					transferAccount = accountNumber;
				}
			}
		} catch (RuntimeException e) {
			throw new UserNotFoundException();
		}
		return transferAccount != null;
	}

	public void clearUserTransactions() throws UserNotFoundException {
		try {
			dao.clearUserTransactions(loggedInUser);
		} catch (RuntimeException e) {
			throw new UserNotFoundException();
		}
	}

	public BigDecimal toBigDecimal(String string) throws InvalidAmountException {
		try {
			return new BigDecimal(string);
		} catch (NumberFormatException e) {
			throw new InvalidAmountException();
		}
	}

}