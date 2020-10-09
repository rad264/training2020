package com.smbcgroup.training.atm.dao.jpa;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.smbcgroup.training.atm.Account;
import com.smbcgroup.training.atm.Transaction;

@Entity
@Table(name = "Accounts")

public class AccountEntity {
	@Id
	@Column(name = "account_number")
	private String accountNumber;
	
	@Column(name = "balance")
	private BigDecimal balance;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private UserEntity user;
	
	@OneToMany(mappedBy = "account")
	private List<TransactionEntity> transactions;
	
	public AccountEntity() {
		this.balance = BigDecimal.ZERO;
		this.transactions = new ArrayList<TransactionEntity>();
	}
	
	public AccountEntity(String accountNumber, UserEntity user) {
		this.accountNumber = accountNumber;
		this.balance = BigDecimal.ZERO;
		this.user = user;
		this.transactions = new ArrayList<TransactionEntity>();
	}
	
	public Account convertToAccount() {
		Account account = new Account();
		account.setAccountNumber(accountNumber);
		account.setBalance(balance);
		account.setUser(user.convertToUser());
		
		List<Transaction> accountTransactions = new ArrayList<Transaction>();
		for (TransactionEntity entity : this.transactions) {
			accountTransactions.add(entity.convertToTransaction());
		}
		account.setTransactions(accountTransactions);
		return account;
	}
	
	
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
	
	public UserEntity getUser() {
		return user;
	}
	
	public void setUser(UserEntity user) {
		this.user = user;
	}

	public List<TransactionEntity> getTransactions() {
		return transactions;
	}

	public void setTransactions(List<TransactionEntity> transactions) {
		this.transactions = transactions;
	}
}
