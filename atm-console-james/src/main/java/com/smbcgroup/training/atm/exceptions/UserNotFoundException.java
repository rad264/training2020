package com.smbcgroup.training.atm.exceptions;

public class UserNotFoundException extends Exception{
	
	private static final long serialVersionUID = 1L;
	
	public UserNotFoundException() {
		super();
	}
	
	public String toString() {
		return ("User Not Found.");
	}
	
}
