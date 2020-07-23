package com.smbcgroup.training.atm.dao;

public class InvalidAmountException extends Exception {
	
	private static final long serialVersionUID = 1L;
	
	public InvalidAmountException() {
		super();
	}

	public String toString() {
		return ("Invalid amount.");
	}

}
