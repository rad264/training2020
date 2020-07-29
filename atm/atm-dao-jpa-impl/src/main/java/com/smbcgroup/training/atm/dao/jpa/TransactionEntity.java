package com.smbcgroup.training.atm.dao.jpa;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.smbcgroup.training.atm.Transaction;

@Entity
@Table(name = "Transactions")
public class TransactionEntity {

	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "tid")
	private Integer tid;

	@Column(name = "date")
	private Date date;

	@Column(name = "type")
	private String type;

	@Column(name = "amount")
	private BigDecimal amount;

	@ManyToOne
	@JoinColumn(name = "account_number")
	private AccountEntity account;

	public TransactionEntity() {

	}

	public TransactionEntity(Date date, String type, BigDecimal amount, AccountEntity account) {
		this.date = date;
		this.type = type;
		this.amount = amount;
		this.account = account;
	}

	public Transaction convertToTransaction() {
		Transaction transaction = new Transaction();
		transaction.setDate(date);
		transaction.setType(type);
		transaction.setAmount(amount);
		return transaction;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public AccountEntity getAccount() {
		return account;
	}

	public void setAccount(AccountEntity account) {
		this.account = account;
	}

	public String toString() {
		StringBuilder str = new StringBuilder("Date: ");
		str.append(date.toString());
		str.append("; Type: ");
		str.append(type);
		str.append("; Amount: ");
		str.append(amount.toString());
		str.append(";");
		return str.toString();
	}

}
