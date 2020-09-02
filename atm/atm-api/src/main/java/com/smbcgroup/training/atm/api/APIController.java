package com.smbcgroup.training.atm.api;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import com.smbcgroup.training.atm.dao.FailedToCreateAccountException;
import com.smbcgroup.training.atm.dao.InsufficientFundsException;
import com.smbcgroup.training.atm.dao.NegativeAmountException;
import com.smbcgroup.training.atm.dao.UserAlreadyExistsException;
import com.smbcgroup.training.atm.dao.UserNotFoundException;
import com.smbcgroup.training.atm.dao.jpa.AccountJPAImpl;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@CrossOrigin(origins="http://localhost:3000")
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

	@ApiOperation("Deposit")
	@RequestMapping(value = "/accounts/{accountNumber}/deposits", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Account> deposit(@PathVariable("accountNumber") String accountNumber,
			@RequestBody BigDecimal depositAmount) {
		try {
			return new ResponseEntity<Account>(service.deposit(accountNumber, depositAmount), HttpStatus.OK);
		} catch (AccountNotFoundException e) {
			return new ResponseEntity<Account>(HttpStatus.NOT_FOUND);
		} catch (NegativeAmountException e) {
			return new ResponseEntity<Account>(HttpStatus.BAD_REQUEST);
		}
	}

	@ApiOperation("Withdraw")
	@RequestMapping(value = "/accounts/{accountNumber}/withdraws", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Account> withdraw(@PathVariable("accountNumber") String accountNumber,
			@RequestBody BigDecimal withdrawAmount) {
		try {
			return new ResponseEntity<Account>(service.withdraw(accountNumber, withdrawAmount), HttpStatus.OK);
		} catch (AccountNotFoundException e) {
			return new ResponseEntity<Account>(HttpStatus.NOT_FOUND);
		} catch (NegativeAmountException e) {
			return new ResponseEntity<Account>(HttpStatus.BAD_REQUEST);
		} catch (InsufficientFundsException e) {
			return new ResponseEntity<Account>(HttpStatus.FORBIDDEN);
		}
	}

	@ApiOperation("Create account")
	@RequestMapping(value = "/accounts", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Account> createAccount(@RequestBody AccountInfo accountInfo) {
		try {
			return new ResponseEntity<Account>(service.createAccount(accountInfo.getUserId(), accountInfo.getAccountType()), HttpStatus.OK);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<Account>(HttpStatus.NOT_FOUND);
		} catch (FailedToCreateAccountException e) {
			return new ResponseEntity<Account>(HttpStatus.CONFLICT);
		}
	}
	
	@ApiOperation("Create User")
	@RequestMapping(value = "/users", method = RequestMethod.POST)
	public ResponseEntity<Void> createAccount(@RequestBody String userId) {
		try {
			service.createUser(userId);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch (UserAlreadyExistsException e) {
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
	}


	@ApiOperation("Transfer")
	@RequestMapping(value = "/accounts/transfers", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Account>> accountTransfer(@RequestBody Transfer transfer) {
		try {
			return new ResponseEntity<List<Account>>(service.transfer(transfer), HttpStatus.OK);
		} catch (AccountNotFoundException e) {
			return new ResponseEntity<List<Account>>(HttpStatus.NOT_FOUND);
		} catch (NegativeAmountException e) {
			return new ResponseEntity<List<Account>>(HttpStatus.BAD_REQUEST);
		} catch (InsufficientFundsException e) {
			return new ResponseEntity<List<Account>>(HttpStatus.FORBIDDEN);
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
	@RequestMapping(value = "/accounts/{accountNumber}/transactions", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Transaction[]> getAccountTransactions(@PathVariable("accountNumber") String accountNumber) {
		try {
			return new ResponseEntity<Transaction[]>(service.getAccountTransactions(accountNumber), HttpStatus.OK);
		} catch (AccountNotFoundException e) {
			return new ResponseEntity<Transaction[]>(HttpStatus.NOT_FOUND);
		}
	}

}
