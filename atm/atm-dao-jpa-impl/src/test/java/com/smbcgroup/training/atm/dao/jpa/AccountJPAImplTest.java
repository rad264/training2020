package com.smbcgroup.training.atm.dao.jpa;

import static org.junit.Assert.assertEquals;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.junit.Before;
import org.junit.Test;

import com.smbcgroup.training.atm.Account;
import com.smbcgroup.training.atm.Transaction;
import com.smbcgroup.training.atm.User;
import com.smbcgroup.training.atm.dao.AccountNotFoundException;
import com.smbcgroup.training.atm.dao.FailedToCreateAccountException;
import com.smbcgroup.training.atm.dao.UserNotFoundException;

public class AccountJPAImplTest {

	private AccountJPAImpl dao = new AccountJPAImpl();

	@Before
	public void setup() {
		EntityManager em = dao.emf.createEntityManager();
		em.getTransaction().begin();

		UserEntity jwong = new UserEntity("jwong");
		em.persist(jwong);

		AccountEntity ac1 = new AccountEntity("123456", "Checkings", new BigDecimal("100"), jwong);
		em.persist(ac1);

		em.persist(new TransactionEntity(new Date(), "Deposit", new BigDecimal("100"), new BigDecimal("100"), ac1));

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

	@Test(expected = UserNotFoundException.class)
	public void testGetAccounts_UserNotFound() throws UserNotFoundException {
		dao.getAccounts("invalidUser");
	}

	@Test
	public void testCreateAccount_Success() throws UserNotFoundException, FailedToCreateAccountException {
		dao.createAccount("jwong", "Credit Card");

		EntityManager em = dao.emf.createEntityManager();
		UserEntity updatedUserEntity = em.find(UserEntity.class, "jwong");
		assertEquals(2, updatedUserEntity.getAccounts().size());
		em.close();
	}

	@Test
	public void testGetTransactions_Success() throws AccountNotFoundException {
		Transaction[] transactions = dao.getAccountTransactions("123456");
		assertEquals(1, transactions.length);
	}

	@Test(expected = AccountNotFoundException.class)
	public void testGetTransactions_AccountNotFound() throws AccountNotFoundException {
		dao.getAccountTransactions("111222");
	}

	@Test
	public void testUpdateAccountTransactions_Success() throws AccountNotFoundException {
		Transaction newTrans = new Transaction();
		newTrans.setDate(new Date());
		newTrans.setType("Deposit");
		newTrans.setAmount(new BigDecimal("50"));
		newTrans.setBalance(new BigDecimal("50"));
		dao.updateAccountTransactions("123456", newTrans);

		EntityManager em = dao.emf.createEntityManager();
		TypedQuery<TransactionEntity> query = em.createQuery(
				"SELECT t FROM TransactionEntity t WHERE t.account.accountNumber = :accountNumber",
				TransactionEntity.class);
		query.setParameter("accountNumber", "123456");
		List<TransactionEntity> transactionEntities = query.getResultList();
		assertEquals(2, transactionEntities.size());
		em.close();
	}

}
