package com.smbcgroup.training.atm.dao.jpa;

import static org.junit.Assert.assertEquals;

import java.math.BigDecimal;

import javax.persistence.EntityManager;

import org.junit.Before;
import org.junit.Test;

import com.smbcgroup.training.atm.Account;
import com.smbcgroup.training.atm.User;
import com.smbcgroup.training.atm.dao.AccountNotFoundException;
import com.smbcgroup.training.atm.dao.UserNotFoundException;

public class AccountJPAImplTest {

	private AccountJPAImpl dao = new AccountJPAImpl();

	@Before
	public void setup() {
		EntityManager em = dao.emf.createEntityManager();
		em.getTransaction().begin();

		UserEntity jwong = new UserEntity("jwong");
		em.persist(jwong);

		em.persist(new AccountEntity("123456", new BigDecimal("100"), jwong));

		em.getTransaction().commit();
		em.close();
	}

	@Test
	public void testGetAccount_Success() throws AccountNotFoundException {
		Account account = dao.getAccount("123456");
		assertEquals(new BigDecimal("100.0"), account.getBalance());
	}

	@Test(expected = AccountNotFoundException.class)
	public void testGetAccount_AccountNotFound() throws AccountNotFoundException {
		dao.getAccount("000000");
	}

	@Test
	public void testGetUser_Success() throws UserNotFoundException {
		User user = dao.getUser("jwong");
		assertEquals("jwong", user.getUserId());
	}

	@Test(expected = UserNotFoundException.class)
	public void testGetUser_UserNotFound() throws UserNotFoundException {
		dao.getUser("invalidUser");
	}

	@Test
	public void testUpdateAccount_Existing() {
		Account account = new Account();
		account.setAccountNumber("123456");
		account.setBalance(new BigDecimal("200.0"));
		dao.updateAccount(account);

		EntityManager em = dao.emf.createEntityManager();
		AccountEntity updatedAccount = em.find(AccountEntity.class, "123456");
		assertEquals("123456", updatedAccount.getAccountNumber());
		assertEquals(new BigDecimal("200.0"), updatedAccount.getBalance());
		em.close();
	}

	@Test
	public void testUpdateAccount_New_Fail() {
		Account account = new Account();
		account.setAccountNumber("222444");
		account.setBalance(new BigDecimal("200.0"));
		dao.updateAccount(account);

		EntityManager em = dao.emf.createEntityManager();
		AccountEntity updatedAccount = em.find(AccountEntity.class, "222444");

		assertEquals("222444", updatedAccount.getAccountNumber());
		assertEquals(new BigDecimal("200.0"), updatedAccount.getBalance());
		em.close();
	}

	@Test
	public void testGetAccounts_Success() throws UserNotFoundException {
		Account[] accounts = dao.getAccounts("jwong");
		assertEquals("123456", accounts[0].getAccountNumber());
		assertEquals(new BigDecimal("100.0"), accounts[0].getBalance());
	}

	@Test
	public void testGetAccounts_UserNotFound() throws UserNotFoundException {
		dao.getAccounts("invalidUser");
	}

	@Test
	public void testCreateAccount_Success() {
		dao.createAccount("jwong", "111222");

		EntityManager em = dao.emf.createEntityManager();
		AccountEntity createdAccount = em.find(AccountEntity.class, "111222");

		assertEquals("111222", createdAccount.getAccountNumber());
		assertEquals(new BigDecimal("0.0"), createdAccount.getBalance());
		assertEquals("jwong", createdAccount.getUser().getUserId());
		em.close();
	}

}
