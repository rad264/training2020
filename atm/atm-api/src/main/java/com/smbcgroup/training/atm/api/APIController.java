package com.smbcgroup.training.atm.api;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.smbcgroup.training.atm.ATMService;
import com.smbcgroup.training.atm.Account;
import com.smbcgroup.training.atm.User;
import com.smbcgroup.training.atm.dao.AccountNotFoundException;
import com.smbcgroup.training.atm.dao.UserNotFoundException;
import com.smbcgroup.training.atm.dao.jpa.AccountJPAImpl;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(tags = "ATM API")
public class APIController {

	static ATMService service = new ATMService(new AccountJPAImpl());

	@ApiOperation("Get user")
	@RequestMapping(value = "/users/{userId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> getUser(@PathVariable("userId") String userId) {
		try {
			return new ResponseEntity<User>(service.getUser(userId), HttpStatus.OK);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}
	}

	@ApiOperation("Get account")
	@RequestMapping(value = "/accounts/{accountNumber}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Account> getAccount(@PathVariable("accountNumber") String accountNumber) {
		try {
			return new ResponseEntity<Account>(service.getAccount(accountNumber), HttpStatus.OK);
		} catch (AccountNotFoundException e) {
			return new ResponseEntity<Account>(HttpStatus.NOT_FOUND);
		}
	}
	
	@ApiOperation("Get user accounts")
	@RequestMapping(value = "/{userId}/accounts", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<String>> getUserAccounts(@PathVariable("userId") String userId) {
		try {
			return new ResponseEntity<List<String>>(service.getUserAccounts(userId), HttpStatus.OK);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<List<String>>(HttpStatus.NOT_FOUND);
		}
	}
	
	@ApiOperation("Get account balance")
	@RequestMapping(value = "/accounts/{accountNumber}/balance", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<BigDecimal> getAccountBalance(@PathVariable("accountNumber") String accountNumber) {
		try {
			return new ResponseEntity<BigDecimal>(service.getAccountBalance(accountNumber), HttpStatus.OK);
		} catch (AccountNotFoundException e) {
			return new ResponseEntity<BigDecimal>(HttpStatus.NOT_FOUND);
		}
	}
	
	@ApiOperation("Get account history")
	@RequestMapping(value = "/accounts/{accountNumber}/history", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<String>> getAccountHistory(@PathVariable("accountNumber") String accountNumber) {
		try {
			return new ResponseEntity<List<String>>(service.viewAccountHistory(accountNumber), HttpStatus.OK);
		} catch (AccountNotFoundException e) {
			return new ResponseEntity<List<String>>(HttpStatus.NOT_FOUND);
		}
	}

	@ApiOperation("Deposit")
	@RequestMapping(value = "/accounts/{accountNumber}/deposits", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> deposit(@PathVariable("accountNumber") String accountNumber, @RequestBody BigDecimal amount) {
		try {
			service.deposit(accountNumber, amount);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@ApiOperation("Withdraw")
	@RequestMapping(value = "/accounts/{accountNumber}/withdrawals", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> withdraw(@PathVariable("accountNumber") String accountNumber, @RequestBody BigDecimal amount) {
		try {
			service.withdraw(accountNumber, amount);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@ApiOperation("Add new account")
	@RequestMapping(value = "{userId}/accounts", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> addNewAccount(@PathVariable("userId") @RequestBody String userId) {
		try {
			return new ResponseEntity<String>(service.addNewAccount(userId), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		}
	}
	
	

}
