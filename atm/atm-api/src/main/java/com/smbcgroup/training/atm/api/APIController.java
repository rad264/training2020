package com.smbcgroup.training.atm.api;

import java.math.BigDecimal;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smbcgroup.training.atm.ATMService;
import com.smbcgroup.training.atm.Account;
import com.smbcgroup.training.atm.AccountInfo;
import com.smbcgroup.training.atm.Transaction;
import com.smbcgroup.training.atm.Transfer;
import com.smbcgroup.training.atm.User;
import com.smbcgroup.training.atm.dao.AccountAlreadyExistsException;
import com.smbcgroup.training.atm.dao.AccountNotFoundException;
import com.smbcgroup.training.atm.dao.InvalidAmountException;
import com.smbcgroup.training.atm.dao.UserAlreadyExistsException;
import com.smbcgroup.training.atm.dao.UserNotFoundException;
import com.smbcgroup.training.atm.dao.jpa.AccountJPAImpl;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

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
	@RequestMapping(value = "/users/{userId}/accounts/{accountNumber}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Account> getAccount(@PathVariable("userId") String userId,
			@PathVariable("accountNumber") String accountNumber) {
		try {
			return new ResponseEntity<Account>(service.getAccount(userId, accountNumber), HttpStatus.OK);
		} catch (AccountNotFoundException e) {
			return new ResponseEntity<Account>(HttpStatus.NOT_FOUND);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<Account>(HttpStatus.NOT_FOUND);
		}
	}

	@ApiOperation("Deposit")
	@RequestMapping(value = "/users/{userId}/accounts/{accountNumber}/deposit", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> deposit(@PathVariable("userId") String userId,
			@PathVariable("accountNumber") String accountNumber, @RequestBody BigDecimal depositAmount) {
		try {
			service.deposit(userId, accountNumber, depositAmount);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch (AccountNotFoundException e) {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		} catch (InvalidAmountException e) {
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		}
	}

	@ApiOperation("Withdraw")
	@RequestMapping(value = "/users/{userId}/accounts/{accountNumber}/withdraw", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> withdraw(@PathVariable("userId") String userId,
			@PathVariable("accountNumber") String accountNumber, @RequestBody BigDecimal withdrawAmount) {
		try {
			service.withdraw(userId, accountNumber, withdrawAmount);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch (AccountNotFoundException e) {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		} catch (InvalidAmountException e) {
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		}
	}

	@ApiOperation("Create account")
	@RequestMapping(value = "/users/{userId}/accounts/create", method = RequestMethod.POST)
	public ResponseEntity<Void> createAccount(@PathVariable("userId") String userId, @RequestBody String accountNumber) {
		try {
			service.createAccount(userId, accountNumber);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		} catch (AccountAlreadyExistsException e) {
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
	}

	@ApiOperation("Create user")
	@RequestMapping(value = "/users/create", method = RequestMethod.POST)
	public ResponseEntity<Void> createUser(@RequestBody String userId) {
		try {
			service.createUser(userId);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch (UserAlreadyExistsException e) {
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
	}

	@ApiOperation("Transfer")
	@RequestMapping(value = "/users/{userId}/accounts/transfer", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> accountTransfer(@PathVariable("userId") String userId, @RequestBody Transfer transfer) {
		try {
			service.transfer(userId, transfer);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch (AccountNotFoundException e) {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		} catch (InvalidAmountException e) {
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		}
	}

	@ApiOperation("Get accounts")
	@RequestMapping(value = "/users/{userId}/accounts", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Account[]> getAccounts(@PathVariable("userId") String userId) {
		try {
			return new ResponseEntity<Account[]>(service.getAccounts(userId), HttpStatus.OK);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<Account[]>(HttpStatus.NOT_FOUND);
		} 
	}

	@ApiOperation("Get account transactions")
	@RequestMapping(value = "/users/{userId}/accounts/{accountNumber}/transactions", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Transaction[]> getAccountTransactions(@PathVariable("userId") String userId, @PathVariable("accountNumber") String accountNumber) {
		try {
			return new ResponseEntity<Transaction[]>(service.getAccountTransactions(userId, accountNumber),
					HttpStatus.OK);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<Transaction[]>(HttpStatus.NOT_FOUND);
		} catch (AccountNotFoundException e) {
			return new ResponseEntity<Transaction[]>(HttpStatus.NOT_FOUND);
		}
	}

}
