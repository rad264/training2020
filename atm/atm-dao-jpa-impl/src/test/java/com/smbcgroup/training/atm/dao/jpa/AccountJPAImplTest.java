package com.smbcgroup.training.atm.dao.jpa;

import static org.junit.Assert.assertEquals;

import java.math.BigDecimal;

import javax.persistence.EntityManager;

import org.junit.Before;
import org.junit.Test;

import com.smbcgroup.training.atm.Account;
import com.smbcgroup.training.atm.dao.AccountNotFoundException;

public class AccountJPAImplTest {
	
	private AccountJPAImpl dao = new AccountJPAImpl();

	@Before
	public void setup() {
		EntityManager em = dao.emf.createEntityManager();
		em.getTransaction().begin();

		em.persist(new AccountEntity("123456", new BigDecimal("100")));

		em.getTransaction().commit();
		em.close();
	}

	@Test
	public void testGetAccount() throws AccountNotFoundException {
		Account account = dao.getAccount("123456");
		assertEquals(new BigDecimal("100.0"), account.getBalance());
	}

}
