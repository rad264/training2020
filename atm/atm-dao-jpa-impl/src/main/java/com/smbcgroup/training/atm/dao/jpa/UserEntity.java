package com.smbcgroup.training.atm.dao.jpa;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.smbcgroup.training.atm.User;

@Entity
@Table(name = "Users")
public class UserEntity {

	@Id
	@Column(name = "user_id")
	private String userId;

	@OneToMany(mappedBy = "user")
	private List<AccountEntity> accounts;
	
	@OneToMany(mappedBy = "user")
	private List<TransactionEntity> transactions;

	public UserEntity() {

	}

	public UserEntity(String userId) {
		this.userId = userId;
	}

	public User convertToUser() {
		User user = new User();
		user.setUserId(userId);
		user.setAccounts(accounts.stream().map(AccountEntity::getAccountNumber).toArray(String[]::new));
		user.setTransactions(transactions.stream().map(TransactionEntity::toString).toArray(String[]::new));
		return user;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public List<AccountEntity> getAccounts() {
		return accounts;
	}

	public void setAccounts(List<AccountEntity> accounts) {
		this.accounts = accounts;
	}

	public List<TransactionEntity> getTransactions() {
		return transactions;
	}

	public void setTransactions(List<TransactionEntity> transactions) {
		this.transactions = transactions;
	}

}
