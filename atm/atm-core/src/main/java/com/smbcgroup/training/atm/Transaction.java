package com.smbcgroup.training.atm;

import java.math.BigDecimal;
import java.util.Date;

public class Transaction {

	private Date date;
	private String type;
	private BigDecimal amount;

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
