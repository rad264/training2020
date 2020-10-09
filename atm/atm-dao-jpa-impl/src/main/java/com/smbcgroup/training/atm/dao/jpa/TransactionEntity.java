package com.smbcgroup.training.atm.dao.jpa;

import java.math.BigDecimal;
import java.sql.Time;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.persistence.ManyToOne;

import com.smbcgroup.training.atm.Transaction;
import com.smbcgroup.training.atm.TransactionType;

@Entity
@Table(name = "Transactions")

public class TransactionEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id")
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name = "account_number")
	private AccountEntity account;
	
	@Column(name = "type")
	private TransactionType transactionType;
	
	@Column(name = "amount")
	private BigDecimal amount;
	
	@ManyToOne
	@JoinColumn(name = "recipient_account", referencedColumnName = "account_number")
	private AccountEntity recipientAccount;
	
	@Column(name = "date")
	private Date date;
	
	@Column(name = "time")
	private Time time;

	public TransactionEntity() {
		this.date = new Date();
		this.time = new Time(date.getTime());
	}
	
	public TransactionEntity(AccountEntity account, TransactionType transactionType, BigDecimal amount,
			AccountEntity recipientAccount) {
		super();
		this.account = account;
		this.transactionType = transactionType;
		this.amount = amount;
		this.recipientAccount = recipientAccount;
		this.date = new Date();
		this.time = new Time(date.getTime());
	}

	public Transaction convertToTransaction() {
		Transaction transaction = new Transaction();
		transaction.setAccountNumber(account.getAccountNumber());
		transaction.setType(transactionType.toString());
		if (recipientAccount != null)
			transaction.setRecipientAccount(recipientAccount.getAccountNumber());
		transaction.setAmount(amount);
		transaction.setDate(date);
		transaction.setTime(time);
		return transaction;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public AccountEntity getAccount() {
		return account;
	}

	public void setAccount(AccountEntity account) {
		this.account = account;
	}

	public TransactionType getTransactionType() {
		return transactionType;
	}

	public void setTransactionType(TransactionType transactionType) {
		this.transactionType = transactionType;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Time getTime() {
		return time;
	}

	public void setTime(Time time2) {
		this.time = time2;
	}
	
	public AccountEntity getRecipientAccount() {
		return recipientAccount;
	}

	public void setRecipientAccount(AccountEntity recipientAccount) {
		this.recipientAccount = recipientAccount;
	}

	
}
