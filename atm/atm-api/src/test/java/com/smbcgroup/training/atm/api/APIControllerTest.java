package com.smbcgroup.training.atm.api;

import static org.junit.Assert.assertEquals;

import java.math.BigDecimal;

import org.hamcrest.CoreMatchers;
import org.junit.Before;
import org.junit.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.smbcgroup.training.atm.ATMService;
import com.smbcgroup.training.atm.ATMServiceException;
import com.smbcgroup.training.atm.Account;
import com.smbcgroup.training.atm.User;
import com.smbcgroup.training.atm.dao.AccountNotFoundException;
import com.smbcgroup.training.atm.dao.UserNotFoundException;

public class APIControllerTest {

	private APIController apiController = new APIController();
	private MockMvc mockMvc;

	@Before
	public void setup() {
		mockMvc = MockMvcBuilders.standaloneSetup(apiController).build();
	}

	@Test
	public void getUser_NotFound() throws Exception {
		APIController.service = new ATMService(null) {
			@Override
			public User getUser(String userId) throws UserNotFoundException {
				throw new UserNotFoundException();
			}
		};
		MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/users/schan")).andReturn();
		assertEquals(404, result.getResponse().getStatus());
	}

	@Test
	public void getUser_Found() throws Exception {
		APIController.service = new ATMService(null) {
			@Override
			public User getUser(String userId) throws UserNotFoundException {
				User user = new User();
				user.setUserId("rdelaney");
				user.setAccounts(new String[] { "123456" });
				return user;
			}
		};
		MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/users/rdelaney")).andReturn();
		assertEquals(200, result.getResponse().getStatus());
		assertEquals("{\"userId\":\"rdelaney\",\"accounts\":[\"123456\"]}", result.getResponse().getContentAsString());
	}

	@Test
	public void getAccount_NotFound() throws Exception {
		APIController.service = new ATMService(null) {
			@Override
			public Account getAccount(String accountNumber) throws AccountNotFoundException {
				throw new AccountNotFoundException();
			}
		};
		mockMvc.perform(MockMvcRequestBuilders.get("/accounts/123457"))
				.andExpect(MockMvcResultMatchers.status().is(404));
	}

	@Test
	public void getAccount_Found() throws Exception {
		APIController.service = new ATMService(null) {
			@Override
			public Account getAccount(String accountNumber) throws AccountNotFoundException {
				Account account = new Account();
				account.setAccountNumber("123456");
				account.setBalance(new BigDecimal("100.00"));
				return account;
			}
		};
		MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/accounts/123456")).andReturn();
		assertEquals(200, result.getResponse().getStatus());
		assertEquals("{\"accountNumber\":\"123456\",\"balance\":100.00}", result.getResponse().getContentAsString());
//		mockMvc.perform(MockMvcRequestBuilders.get("/accounts/123456"))
//				.andExpect(MockMvcResultMatchers.jsonPath("$.accountNumber", CoreMatchers.is("123456")))
//				.andExpect(MockMvcResultMatchers.jsonPath("$.balance", CoreMatchers.is(100.0)));
	}

	@Test
	public void getUserSummary() throws Exception {
		APIController.service = new ATMService(null) {
			@Override
			public String summary(String userId) throws UserNotFoundException {
				String summary = new String("123456: $100.00");
				return summary;
			}
		};
		MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/summary/rdelaney")).andReturn();
		assertEquals(200, result.getResponse().getStatus());
		assertEquals("{\"content\":\"123456: $100.00\"}", result.getResponse().getContentAsString());
	}
	
	@Test
	public void getUserSummary_NotFound() throws Exception {
		APIController.service = new ATMService(null) {
			@Override
			public String summary(String userId) throws UserNotFoundException {
				throw new UserNotFoundException();
			}
		};
		mockMvc.perform(MockMvcRequestBuilders.get("/summary/fake-user"))
			.andExpect(MockMvcResultMatchers.status().is(404));
	}
	
	@Test
	public void getAccountHistory() throws Exception {
		APIController.service = new ATMService(null) {
			@Override
			public String history(String accountNumber) throws AccountNotFoundException {
				String summary = new String("Account Created at 12:00pm");
				return summary;
			}
		};
		MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/history/123456")).andReturn();
		assertEquals(200, result.getResponse().getStatus());
		assertEquals("{\"content\":\"Account Created at 12:00pm\"}", result.getResponse().getContentAsString());
	}

	@Test
	public void getAccountHistory_NotFound() throws Exception {
		APIController.service = new ATMService(null) {
			@Override
			public String history(String accountNumber) throws AccountNotFoundException {
				throw new AccountNotFoundException();
			}
		};
		mockMvc.perform(MockMvcRequestBuilders.get("/history/123457"))
			.andExpect(MockMvcResultMatchers.status().is(404));
	}
	
	@Test
	public void testCreateAccount() throws Exception {
		APIController.service = new ATMService(null) {
			
			@Override
			public void createAccount(String userId) {
				
			}
			
			@Override
			public User getUser(String userId) {
				return new User();
			}
		};
		MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/users/create-account/123456")).andReturn();
		assertEquals(200, result.getResponse().getStatus());
	}
	
	@Test
	public void testDeposit() throws Exception {
		APIController.service = new ATMService(null) {
			
			private Account testAccount = new Account(){{ setAccountNumber("123456"); setBalance(new BigDecimal("0.00")); }};
			
			@Override
			public void deposit(String accountNumber, BigDecimal amount) throws AccountNotFoundException, ATMServiceException {
				testAccount.setBalance(testAccount.getBalance().add(amount));
				
			}
			
			@Override
			public Account getAccount(String accountNumber) {
				return testAccount;
			}
		
		};
	
		MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/accounts/123456/deposit/100.12/")).andReturn();
		assertEquals(200, result.getResponse().getStatus());
		
	}

	@Test
	public void testDeposit_NotFound() throws Exception {
		APIController.service = new ATMService(null) {
			
			private Account testAccount = new Account(){{ setAccountNumber("123456"); setBalance(new BigDecimal("0.00")); }};
			
			@Override
			public void deposit(String accountNumber, BigDecimal amount) throws AccountNotFoundException, ATMServiceException {
				throw new AccountNotFoundException();
			}
			
			@Override
			public Account getAccount(String accountNumber) {
				return testAccount;
			}
		
		};
		mockMvc.perform(MockMvcRequestBuilders.get("/accounts/123457/deposit/100.12/"))
			.andExpect(MockMvcResultMatchers.status().is(404));
	}
	
	@Test
	public void testWithdraw() throws Exception {
		APIController.service = new ATMService(null) {
			
			private Account testAccount = new Account(){{ setAccountNumber("123456"); setBalance(new BigDecimal("0.00")); }};
			
			@Override
			public void withdraw(String accountNumber, BigDecimal amount) throws AccountNotFoundException, ATMServiceException {
				testAccount.setBalance(testAccount.getBalance().subtract(amount));
				
			}
			
			@Override
			public Account getAccount(String userId) {
				return testAccount;
			}
		
		};
	
		MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/accounts/123456/withdraw/100.12/")).andReturn();
		assertEquals(200, result.getResponse().getStatus());
	}
	
	@Test
	public void testWithdraw_NotFound() throws Exception {
		APIController.service = new ATMService(null) {
			
			private Account testAccount = new Account(){{ setAccountNumber("123456"); setBalance(new BigDecimal("0.00")); }};
			
			@Override
			public void withdraw(String accountNumber, BigDecimal amount) throws AccountNotFoundException, ATMServiceException {
				throw new AccountNotFoundException();
			}
			
			@Override
			public Account getAccount(String accountNumber) {
				return testAccount;
			}
		
		};
		mockMvc.perform(MockMvcRequestBuilders.get("/accounts/123457/withdraw/100.12/"))
			.andExpect(MockMvcResultMatchers.status().is(404));
	}
}