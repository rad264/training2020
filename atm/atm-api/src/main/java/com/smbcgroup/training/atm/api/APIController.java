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
			return new ResponseEntity<Account>(service.createAccount(userId), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Account>(HttpStatus.NOT_FOUND);
		}
	}

	@ApiOperation("Deposit")
	@RequestMapping(value = "/accounts/{accountNumber}/deposit", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> saveAccount(@PathVariable("accountNumber") String accountNumber, @RequestBody BigDecimal amount) {
		try {
			service.deposit(accountNumber, amount);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		}
	}
	
	@ApiOperation("Withdraw")
	@RequestMapping(value = "/accounts/{accountNumber}/withdraw", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> withdrawFromAccount(@PathVariable("accountNumber") String accountNumber, @RequestBody BigDecimal amount) {
		try {
			service.withdraw(accountNumber, amount);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch (AccountNotFoundException e) {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		} catch (InsufficientBalanceException e) {
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@ApiOperation("Get account history")
	@RequestMapping(value = "/accounts/{accountNumber}/transactions", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Map<String, Logger>> getAccountHistory(@PathVariable("accountNumber") String accountNumber) {
		try {
			List<Logger> result = service.getAccountLogs(accountNumber);
			return new ResponseEntity<Map<String, Logger>>(transactionJsonBuilder(result), HttpStatus.OK);
		} catch (AccountNotFoundException e) {
			return new ResponseEntity<Map<String, Logger>>(HttpStatus.NOT_FOUND);
		}
	}
	
	@ApiOperation("Transfer between accounts")
	@RequestMapping(value = "/transfer", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE) 
	public ResponseEntity<Void> transferBetweenAccounts(@RequestBody TransferWrapper transferVariables) {
		try {
			String homeAccount = transferVariables.getHomeAccount();
			String destinationAccount = transferVariables.getDestinationAccount();
			BigDecimal amount = transferVariables.getAmount();
			service.transfer(homeAccount, destinationAccount, amount);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch (InsufficientBalanceException e) {
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		} catch (AccountNotFoundException e) {
			System.out.println("Account not found");
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


}
