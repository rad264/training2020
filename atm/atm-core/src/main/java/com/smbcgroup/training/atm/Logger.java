package com.smbcgroup.training.atm;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class Logger {
	private String logId;
	private Timestamp time;
	private String transaction;
	private BigDecimal amount;
	
	
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
}
