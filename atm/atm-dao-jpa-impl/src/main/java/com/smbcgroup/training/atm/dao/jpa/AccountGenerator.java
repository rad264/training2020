package com.smbcgroup.training.atm.dao.jpa;

import java.util.Random;

public class AccountGenerator {

	private static Random random = new Random();
	private static Integer accountNumberLength = 6;

	private static String generateRandomNumber(int length) {
		StringBuilder sb = new StringBuilder(length);
		for (int i = 0; i < length; i++)
			sb.append((char) ('0' + random.nextInt(10)));
		return sb.toString();
	}
	
	public static String generateAccountNumber() {
		return generateRandomNumber(accountNumberLength);
	}

}
