package com.smbcgroup.training.atm;

import java.math.BigDecimal;
import java.util.List;

public class Account {

	private String accountNumber;
	private BigDecimal balance;
	private User user;
	private List<Transaction> transactions;

	public String getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

	public BigDecimal getBalance() {
		return balance;
	}

	public void setBalance(BigDecimal balance) {
		this.balance = balance;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<Transaction> getTransactions() {
		return transactions;
	}

	public void setTransactions(List<Transaction> transaction) {
		this.transactions = transaction;
	}
	
	public String toString() {
		return accountNumber;
	}

}
