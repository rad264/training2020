package com.smbcgroup.training.atm.dao;

import java.math.BigDecimal;

public interface AccountDAO {

	String[] getUserAccounts(String userId) throws UserNotFoundException;

	BigDecimal getAccountBalance(String accountNumber) throws AccountNotFoundException;

	void updateAccountBalance(String accountNumber, BigDecimal balance);

}
