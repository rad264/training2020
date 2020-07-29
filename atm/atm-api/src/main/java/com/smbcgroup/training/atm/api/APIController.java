package com.smbcgroup.training.atm.api;

import java.math.BigDecimal;
import java.util.Random;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.smbcgroup.training.atm.ATMService;
import com.smbcgroup.training.atm.ATMServiceException;
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
	
	@ApiOperation("Deposit to account")
	@RequestMapping(value = "/accounts/{accountNumber}/deposit/{depositAmount}/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Account> depositToAccount(@PathVariable("accountNumber") String accountNumber, @PathVariable("depositAmount") String depositAmount) {

		try {
			service.deposit(accountNumber, new BigDecimal(depositAmount));
		} catch(ATMServiceException e) {
			return new ResponseEntity<Account>(HttpStatus.NOT_FOUND);
		} catch (AccountNotFoundException e) {
			return new ResponseEntity<Account>(HttpStatus.NOT_FOUND);
		}
		
		try {
			return new ResponseEntity<Account>(service.getAccount(accountNumber), HttpStatus.OK);
		} catch (AccountNotFoundException e) {
			return new ResponseEntity<Account>(HttpStatus.NOT_FOUND);
		}
	}

	
	@ApiOperation("Withdraw from account")
	@RequestMapping(value = "/accounts/{accountNumber}/withdraw/{withdrawAmount}/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Account> withdrawFromAccount(@PathVariable("accountNumber") String accountNumber, @PathVariable("withdrawAmount") String withdrawAmount) {

		try {
			service.withdraw(accountNumber, new BigDecimal(withdrawAmount));
		} catch(ATMServiceException e) {
			return new ResponseEntity<Account>(HttpStatus.NOT_FOUND);
		} catch (AccountNotFoundException e) {
			return new ResponseEntity<Account>(HttpStatus.NOT_FOUND);
		}
		
		try {
			return new ResponseEntity<Account>(service.getAccount(accountNumber), HttpStatus.OK);
		} catch (AccountNotFoundException e) {
			return new ResponseEntity<Account>(HttpStatus.NOT_FOUND);
		}
	}

	@ApiOperation("Hello world")
	@RequestMapping(value = "/greeting", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Greeting> helloWorld() {
		try {
			return new ResponseEntity<Greeting>(new Greeting(new Random().nextLong(), "Hello world"), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Greeting>(HttpStatus.NOT_FOUND);
		}
	}
	
	@ApiOperation("Create account")
	@RequestMapping(value = "/users/create-account/{userId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> createAccount(@PathVariable("userId") String userId) {
		try {
			service.createAccount(userId);
			return new ResponseEntity<User>(service.getUser(userId), HttpStatus.OK);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}
	}
	
	@ApiOperation("Transfer")
	@RequestMapping(value = "/transfer/from/{accountToTransferFrom}/to/{accountToTransferTo}/amount/{amount}/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Account> transfer(@PathVariable("accountToTransferFrom") String accountToTransferFrom, @PathVariable("accountToTransferTo") String accountToTransferTo, @PathVariable("amount") String amount) {
		try {
			service.transfer(accountToTransferFrom, accountToTransferTo, new BigDecimal(amount));
			return new ResponseEntity<Account>( service.getAccount(accountToTransferFrom) ,HttpStatus.OK);
		} catch (AccountNotFoundException e) {
			return new ResponseEntity<Account>(HttpStatus.NOT_FOUND);
		}
	}
	
	@ApiOperation("User summary")
	@RequestMapping(value = "/summary/{userId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Message> getSummary(@PathVariable("userId") String userId) {
		try {
			return new ResponseEntity<Message>(new Message(service.summary(userId)), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Message>(HttpStatus.NOT_FOUND);
		}
	}

	@ApiOperation("Account history")
	@RequestMapping(value = "/history/{accountNumber}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Message> getHistory(@PathVariable("accountNumber") String accountNumber) {
		try {
			return new ResponseEntity<Message>(new Message(service.history(accountNumber)), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Message>(HttpStatus.NOT_FOUND);
		}
	}
	
	private class Message {
		private final String content;
		
		public Message(String content) {
			this.content = content;
		}
		
		public String getContent() {
			return content;
		}
		
	}
	
	private class Greeting {

		private final long id;
		private final String content;

		public Greeting(long id, String content) {
			this.id = id;
			this.content = content;
		}

		public long getId() {
			return id;
		}

		public String getContent() {
			return content;
		}
	}
}
