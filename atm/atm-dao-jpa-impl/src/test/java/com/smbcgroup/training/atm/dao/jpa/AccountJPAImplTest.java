package com.smbcgroup.training.atm.dao.jpa;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.EntityManager;

import org.junit.Before;
import org.junit.Test;

import com.smbcgroup.training.atm.Account;
import com.smbcgroup.training.atm.Logger;
import com.smbcgroup.training.atm.User;
import com.smbcgroup.training.atm.dao.AccountNotFoundException;
import com.smbcgroup.training.atm.dao.InsufficientBalanceException;
import com.smbcgroup.training.atm.dao.UserNotFoundException;

public class AccountJPAImplTest {

	private AccountJPAImpl dao = new AccountJPAImpl();

	@Before
	public void setup() {
		EntityManager em = dao.emf.createEntityManager();
		em.getTransaction().begin();

		UserEntity rdelaney = new UserEntity("rdelaney");
		em.persist(rdelaney);
		AccountEntity account = new AccountEntity("123456", new BigDecimal("100"), rdelaney);
		em.persist(account);
		em.merge(new LoggerEntity("creation", new BigDecimal("100"), account));

		em.getTransaction().commit();
		em.close();
	}

	@Test(expected = UserNotFoundException.class)
	public void testGetUser_UserDoesntExist() throws UserNotFoundException {
		dao.getUser("schan");
	}

	@Test
	public void testGetUser() throws UserNotFoundException {
		User user = dao.getUser("rdelaney");
		assertEquals("rdelaney", user.getUserId());
		assertArrayEquals(new String[] {"123456"}, user.getAccounts());
	}

	@Test(expected = AccountNotFoundException.class)
	public void testGetAccount_AccountDoesntExist() throws AccountNotFoundException {
		dao.getAccount("123457");
	}

	@Test
	public void testGetAccount() throws AccountNotFoundException {
		Account account = dao.getAccount("123456");
		assertEquals("123456", account.getAccountNumber());
		assertEquals(new BigDecimal("100.0"), account.getBalance());
	}

	@Test
	public void testUpdateAccount_NewAccount() {
		Account account = new Account();
		account.setAccountNumber("123457");
		account.setBalance(new BigDecimal("50"));
		dao.updateAccount(account);
		
		EntityManager em = dao.emf.createEntityManager();
		AccountEntity savedAccount = em.find(AccountEntity.class, "123457");
		assertEquals("123457", savedAccount.getAccountNumber());
		assertEquals(new BigDecimal("50.0"), savedAccount.getBalance());
		em.close();
	}

	@Test
	public void testUpdateAccount_ExistingAccount() {
		Account account = new Account();
		account.setAccountNumber("123456");
		account.setBalance(new BigDecimal("1000"));
		dao.updateAccount(account);
		
		EntityManager em = dao.emf.createEntityManager();
		AccountEntity savedAccount = em.find(AccountEntity.class, "123456");
		assertEquals("123456", savedAccount.getAccountNumber());
		assertEquals(new BigDecimal("1000.0"), savedAccount.getBalance());
		em.close();
	}
	
	@Test
	public void testCreateAccount() throws UserNotFoundException {
		Account account = new Account();
		account.setAccountNumber("222222");
		account.setBalance(BigDecimal.ZERO);
		dao.createAccount("rdelaney", account);
		
		EntityManager em = dao.emf.createEntityManager();
		AccountEntity savedAccount = em.find(AccountEntity.class, "222222");
		assertEquals("222222", savedAccount.getAccountNumber());
		assertEquals(0.0, savedAccount.getBalance().doubleValue(), 0.01);
		assertEquals("rdelaney", savedAccount.getUser().getId());
		em.close();
	}
	
	@Test
	public void testWriteAccountLog() throws AccountNotFoundException {
		dao.writeAccountLog("123456", "deposit", new BigDecimal(10));
		EntityManager em = dao.emf.createEntityManager();
		LoggerEntity newLog = em.find(LoggerEntity.class, 2);
		assertEquals("123456", newLog.getAccount().getAccountNumber());
		assertEquals(10.0, newLog.getAmount().doubleValue(), 0.01);
		assertEquals("deposit", newLog.getTransaction());
		em.close();
	}
	
	@Test(expected = AccountNotFoundException.class)
	public void testWriteAccountLog_AccountDoesntExist() throws AccountNotFoundException {
		dao.writeAccountLog("222222", "deposit", new BigDecimal(10));
	}
	
	@Test
	public void testDeposit() throws AccountNotFoundException {
		dao.deposit("123456", new BigDecimal(10));
		EntityManager em = dao.emf.createEntityManager();
		AccountEntity account = em.find(AccountEntity.class, "123456");
		BigDecimal newBalance = account.getBalance();
		assertEquals(110.0, newBalance.doubleValue(), 0.01);
	}
	
	@Test(expected = AccountNotFoundException.class)
	public void testDeposit_AccountDoesntExist() throws AccountNotFoundException {
		dao.deposit("222222", new BigDecimal(10));
	}
	
	@Test
	public void testWithdraw() throws AccountNotFoundException, InsufficientBalanceException {
		dao.withdraw("123456", new BigDecimal(10));
		EntityManager em = dao.emf.createEntityManager();
		AccountEntity account = em.find(AccountEntity.class, "123456");
		assertEquals(90.0, account.getBalance().doubleValue(), 0.01);
	}
	
	@Test(expected=InsufficientBalanceException.class)
	public void testWithdrawFail() throws AccountNotFoundException, InsufficientBalanceException {
		dao.withdraw("123456", new BigDecimal(200));
	}
	
	@Test(expected = AccountNotFoundException.class)
	public void testWithdraw_AccountDoesntExist() throws AccountNotFoundException, InsufficientBalanceException {
		dao.withdraw("222222", new BigDecimal(10));
	}
	
	@Test
	public void testGetAccountLogs() throws AccountNotFoundException {
		List<Logger> logs = dao.getAccountLogs("123456");
		assertEquals("creation", logs.get(0).getTransaction());
		assertEquals(100.0, logs.get(0).getAmount().doubleValue(), 0.01);
	}



}