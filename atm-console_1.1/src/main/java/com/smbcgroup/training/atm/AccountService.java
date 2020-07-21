package com.smbcgroup.training.atm;

import java.math.BigDecimal;

import com.smbcgroup.training.atm.dao.AccountDAO;

public class AccountService {

	private AccountDAO dao;

	public AccountService(AccountDAO dao) {
		this.dao = dao;
	}

	public String[] getUserAccounts(String userId) throws UserNotFoundException {
		try {
			return dao.getUserAccounts(userId);
		} catch (RuntimeException e) {
			throw new UserNotFoundException();
		}
	}

	public BigDecimal getAccountBalance(String accountNumber) throws AccountNotFoundException {
		try {
			return dao.getAccountBalance(accountNumber);
		} catch (RuntimeException e) {
			throw new AccountNotFoundException();
		}
	}

	public String[] getUserTransactions(String userId) throws UserNotFoundException {
		try {
			return dao.getUserTransactions(userId);
		} catch (RuntimeException e) {
			throw new UserNotFoundException();
		}
	}

	public void deposit(String userId, String accountNumber, BigDecimal amount)
			throws AccountNotFoundException, InvalidAmountException, UserNotFoundException {
		BigDecimal currentBalance = getAccountBalance(accountNumber);
		if (amount.compareTo(BigDecimal.ZERO) <= 0)
			throw new InvalidAmountException();
		dao.updateAccountBalance(accountNumber, currentBalance.add(amount));
		try {
			dao.updateUserTransactions(userId, accountNumber, amount, "Deposit", "+");
		} catch (RuntimeException e) {
			throw new UserNotFoundException();
		}
	}

	public void withdraw(String userId, String accountNumber, BigDecimal amount)
			throws AccountNotFoundException, InvalidAmountException, UserNotFoundException {
		BigDecimal currentBalance = getAccountBalance(accountNumber);
		if (amount.compareTo(BigDecimal.ZERO) <= 0)
			throw new InvalidAmountException();
		if (currentBalance.subtract(amount).compareTo(BigDecimal.TEN) <= 0)
			throw new InvalidAmountException();
		dao.updateAccountBalance(accountNumber, currentBalance.subtract(amount));
		try {
			dao.updateUserTransactions(userId, accountNumber, amount, "Withdraw", "-");
		} catch (RuntimeException e) {
			throw new UserNotFoundException();
		}
	}

	public void transfer(String userId, String sourceAccountNumber, String destinationAccountNumber, BigDecimal amount)
			throws AccountNotFoundException, InvalidAmountException, UserNotFoundException {
		withdraw(userId, sourceAccountNumber, amount);
		deposit(userId, destinationAccountNumber, amount);
	}

	public void clearUserTransactions(String userId) throws UserNotFoundException {
		try {
			dao.clearUserTransactions(userId);
		} catch (RuntimeException e) {
			throw new UserNotFoundException();
		}
	}

//	public void updateUserTransactions(String userId, String accountNumber, BigDecimal amount, String type, String sign)
//			throws UserNotFoundException {
//		try {
//			dao.updateUserTransactions(userId, accountNumber, amount, type, sign);
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
