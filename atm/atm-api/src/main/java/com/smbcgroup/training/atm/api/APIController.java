package com.smbcgroup.training.atm.api;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smbcgroup.training.atm.ATMService;
import com.smbcgroup.training.atm.Account;
import com.smbcgroup.training.atm.Logger;
import com.smbcgroup.training.atm.User;
import com.smbcgroup.training.atm.dao.AccountNotFoundException;
import com.smbcgroup.training.atm.dao.InsufficientBalanceException;
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
	
	@ApiOperation("Get all users accounts")
	@RequestMapping(value = "/users/{userId}/accounts", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Account>> getAllUsersAccounts(@PathVariable("userId") String userId) {
		try {
			return new ResponseEntity<List<Account>>(service.getUserAccounts(userId), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<List<Account>>(HttpStatus.NOT_FOUND);
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
	
	@ApiOperation("Create account")
	@RequestMapping(value = "/accounts", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Account> createAccount(@RequestBody String userId) {
		try {
			if (userId.contains("=")) userId = processJson(userId);
			return new ResponseEntity<Account>(service.createAccount(userId), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Account>(HttpStatus.NOT_FOUND);
		} 
	}

	@ApiOperation("Deposit")
	@RequestMapping(value = "/accounts/{accountNumber}/deposit", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> saveAccount(@PathVariable("accountNumber") String accountNumber, @RequestBody String amount) {
		try {
			if (amount.contains("=")) amount = processJson(amount);
			BigDecimal depositAmount = new BigDecimal(amount);
			service.deposit(accountNumber, depositAmount);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		}
	}
	
	@ApiOperation("Withdraw")
	@RequestMapping(value = "/accounts/{accountNumber}/withdraw", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> withdrawFromAccount(@PathVariable("accountNumber") String accountNumber, @RequestBody String amount) {
		try {
			if (amount.contains("=")) amount = processJson(amount);
			BigDecimal withdrawAmount = new BigDecimal(amount);
			service.withdraw(accountNumber, withdrawAmount);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch (AccountNotFoundException e) {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		} catch (InsufficientBalanceException e) {
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@ApiOperation("Get account history")
	@RequestMapping(value = "/accounts/{accountNumber}/transactions", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<byte[]> getAccountHistory(@PathVariable("accountNumber") String accountNumber) {
		try {
			Map<String, Logger> result = transactionJsonBuilder(service.getAccountLogs(accountNumber));
			ObjectMapper objectMapper = new ObjectMapper();
			byte[] stringResult = objectMapper.writeValueAsBytes(result);
			return new ResponseEntity<byte[]>(stringResult, HttpStatus.OK);
		} catch (AccountNotFoundException e) {
			return new ResponseEntity<byte[]>(HttpStatus.NOT_FOUND);
		} catch (JsonProcessingException e) {
			return new ResponseEntity<byte[]>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@ApiOperation("Transfer between accounts")
	@RequestMapping(value = "/transfer", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE) 
	public ResponseEntity<Void> transferBetweenAccounts(@RequestBody String transferVariables) {
		try {
			System.out.println(transferVariables);
			String homeAccount = transferProcessJson(transferVariables)[0];
			String destinationAccount = transferProcessJson(transferVariables)[1];
			BigDecimal amount = new BigDecimal(transferProcessJson(transferVariables)[2]);
			service.transfer(homeAccount, destinationAccount, amount);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch (InsufficientBalanceException e) {
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		} catch (AccountNotFoundException e) {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		}
	}
	
	private Map<String, Logger> transactionJsonBuilder(List<Logger> rawTransactions) {
		Map<String, Logger> object = new HashMap<String, Logger>();
		for (int i = 0; i < rawTransactions.size(); i++) {
			rawTransactions.get(i).setTimeString(rawTransactions.get(i).getTime().toString());
			object.put("log" + Integer.toString(i), rawTransactions.get(i));
		}
		return object;
	}
	
	private String[] transferProcessJson(String transferWrapper) {
		String[] result = new String[3];
		result[0] = transferWrapper.substring(16, 22);
		result[1] = transferWrapper.substring(46, 52);
		result[2] = transferWrapper.substring(64, transferWrapper.length() - 2);
		return result;
 	}
	
	private String processJson(String inputString) {
		return inputString.substring(inputString.indexOf("=")+1, inputString.length())
;	}


}
