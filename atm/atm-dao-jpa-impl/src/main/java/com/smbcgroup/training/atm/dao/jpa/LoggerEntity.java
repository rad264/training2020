package com.smbcgroup.training.atm.dao.jpa;

import java.math.BigDecimal;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.CascadeType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.smbcgroup.training.atm.Logger;

@Entity
@Table(name = "Logger")
public class LoggerEntity {
	
	@Id 
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "log_id")
	private String logId;
	
	@Column(name = "time")
	private Timestamp time;
	
	@Column(name = "transaction")
	private String transaction;
	
	@Column(name = "amount")
	private BigDecimal amount;
	
	@ManyToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "account_number")
	private AccountEntity account;
	
	public LoggerEntity() {
		
	}
	
	public LoggerEntity(String transaction, BigDecimal amount, AccountEntity account) {
		this.time = new Timestamp(System.currentTimeMillis());
		this.transaction = transaction;
		this.amount = amount;
		this.account = account;
	}
	
	public Logger convertToLogger() {
		Logger log = new Logger();
		log.setTime(time);
		log.setTransaction(transaction);
		log.setAmount(amount);
		return log;
	}
	
	public String getLogId() {
		return logId;
	}


	public Timestamp getTime() {
		return time;
	}
	
	public void setTime(Timestamp time) {
		this.time = time;
	}
	
	public BigDecimal getAmount() {
		return amount;
	}
	
	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public String getTransaction() {
		return transaction;
	}
	
	public void setTransaction(String transaction) {
		this.transaction = transaction;
	}

	public AccountEntity getAccount() {
		return account;
	}

	public void setAccount(AccountEntity account) {
		this.account = account;
	}
	
	

}
