package com.smbcgroup.training.atm;

import java.math.BigDecimal;
import java.sql.Time;
import java.util.Date;

public class Transaction {
	
	private String accountNumber;
	private String type;
	private BigDecimal amount;
	private String recipientAccount;
	private Date date;
	private Time time;
	
	public String getAccountNumber() {
		return accountNumber;
	}
	
	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}
	
	public String getRecipientAccount() {
		return recipientAccount;
	}
	
	public void setRecipientAccount(String recipientAccount) {
		this.recipientAccount = recipientAccount;
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
	
	public void setTime(Time time) {
		this.time = time;
	}
	
	public String getType() {
		return type;
	}
	
	public void setType(String type) {
		this.type = type;
	}
	
	public String toString() {
		return accountNumber + "\t" + type + "\t" + amount;
	}
}
