package com.smbcgroup.training.atm;

import java.math.BigDecimal;
import java.util.Calendar;

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

	public void deposit(String accountNumber, BigDecimal amount) throws AccountNotFoundException, ATMServiceException {
		Account account = getAccount(accountNumber);
		validateIsPositiveAmount(amount);
		account.setBalance(account.getBalance().add(amount));
		dao.updateAccount(account);
		dao.appendAudit(accountNumber,
				"Deposited  $" + amount.toPlainString() + " at: " + Calendar.getInstance().getTime() + "\n");
	}

	public void withdraw(String accountNumber, BigDecimal amount) throws AccountNotFoundException, ATMServiceException {
		Account account = getAccount(accountNumber);
		validateIsPositiveAmount(amount);
		account.setBalance(account.getBalance().subtract(amount));
		if (!isAboveMinimumBalance(account.getBalance()))
			throw new ATMServiceException(Type.INSUFFICIENT_FUNDS);
		dao.updateAccount(account);
		dao.appendAudit(accountNumber,
				"Withdrew  $" + amount.toPlainString() + " at: " + Calendar.getInstance().getTime() + "\n");
	}
	
	public void transfer(String accountToTransferFrom, String accountToTransferTo, BigDecimal amount) {
		dao.updateAccountBalance(accountToTransferTo, dao.getAccountBalance(accountToTransferTo).add(amount));
		dao.updateAccountBalance(accountToTransferFrom, dao.getAccountBalance(accountToTransferFrom).subtract(amount));

		dao.appendAudit(accountToTransferTo, "Received $" + amount.toPlainString()
		+ " transfer from account: " + accountToTransferFrom + " at: " + Calendar.getInstance().getTime() + "\n");
		
		dao.appendAudit(accountToTransferFrom, "Transferred  $" + amount.toPlainString() + " to account: "
				+ accountToTransferTo + " at: " + Calendar.getInstance().getTime() + "\n");
		
	}
	
	public void createAccount(String userId) {
		String newAccount = dao.createAccount(userId);
		dao.appendAudit(newAccount, "Account created at: " + Calendar.getInstance().getTime() + "\n");
	}
	
	public String summary(String userId) throws UserNotFoundException {
		StringBuilder sb = new StringBuilder();
		for (String account : getUser(userId).getAccounts()) {
			sb.append(account + ": $" + dao.getAccountBalance(account) + "\n");
		}
		return sb.toString();
	}

	public String history(String accountNumber) {
		return dao.getAccountHistory(accountNumber);
	}
	
	private void validateIsPositiveAmount(BigDecimal amount) throws ATMServiceException {
		if (BigDecimal.ZERO.compareTo(amount) > 0)
			throw new ATMServiceException(Type.NON_POSITIVE_AMOUNT);
	}

	private boolean isAboveMinimumBalance(BigDecimal balance) {
		return balance.compareTo(BigDecimal.TEN) >= 0;
	}

}
