package com.smbcgroup.training.atm.dao.jpa;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "History")
public class HistoryEntity {
	
	@Column(name = "message")
	private String message;
	
	@ManyToOne
	@JoinColumn(name = "accountNumber")
	private AccountEntity account;

	@Id
	@Column(name = "id")
	private String id;
	
	public HistoryEntity() {
		id = UUID.randomUUID().toString();
	}
	
	
	public HistoryEntity(String message, AccountEntity account) {
		this.message = message;
		this.account = account;
		id = UUID.randomUUID().toString();
	}


	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public AccountEntity getAccount() {
		return account;
	}

	public void setAccount(AccountEntity account) {
		this.account = account;
	}
}
