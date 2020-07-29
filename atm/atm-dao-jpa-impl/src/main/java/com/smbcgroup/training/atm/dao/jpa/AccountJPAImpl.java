package com.smbcgroup.training.atm.dao.jpa;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;

import com.smbcgroup.training.atm.Account;
import com.smbcgroup.training.atm.Transaction;
import com.smbcgroup.training.atm.User;
import com.smbcgroup.training.atm.dao.AccountDAO;
import com.smbcgroup.training.atm.dao.AccountNotFoundException;
import com.smbcgroup.training.atm.dao.UserNotFoundException;

public class AccountJPAImpl implements AccountDAO {

	EntityManagerFactory emf = Persistence.createEntityManagerFactory("derby-entities");

	@Override
	public User getUser(String userId) throws UserNotFoundException {
		EntityManager em = emf.createEntityManager();
		try {
			UserEntity entity = em.find(UserEntity.class, userId);
			if (entity == null)
				throw new UserNotFoundException();
			return entity.convertToUser();
		} finally {
			em.close();
		}
	}

	@Override
	public Account getAccount(String accountNumber) throws AccountNotFoundException {
		EntityManager em = emf.createEntityManager();
		try {
			AccountEntity entity = em.find(AccountEntity.class, accountNumber);
			if (entity == null)
				throw new AccountNotFoundException();
			return entity.convertToAccount();
		} finally {
			em.close();
		}
	}

	@Override
	public void updateAccount(Account account) {
		EntityManager em = emf.createEntityManager();
		em.getTransaction().begin();
		try {
			AccountEntity entity = new AccountEntity();
			entity.setAccountNumber(account.getAccountNumber());
			entity.setBalance(account.getBalance());
			em.merge(entity);
			em.getTransaction().commit();
		} finally {
			em.close();
		}
	}

	@Override
	public Account[] getAccounts(String userId) throws UserNotFoundException {
		EntityManager em = emf.createEntityManager();
		try {
			TypedQuery<AccountEntity> query = em
					.createQuery("SELECT a FROM AccountEntity a WHERE a.user.userId = :userId", AccountEntity.class);
			query.setParameter("userId", userId);
			List<AccountEntity> accountEntities = query.getResultList();
			if (accountEntities == null || accountEntities.size() == 0)
				throw new UserNotFoundException();
			Account[] accounts = new Account[accountEntities.size()];
			for (int i = 0; i < accountEntities.size(); i++)
				accounts[i] = accountEntities.get(i).convertToAccount();
			return accounts;
		} finally {
			em.close();
		}
	}

	@Override
	public void createAccount(String userId, String accountNumber) {
		EntityManager em = emf.createEntityManager();
		em.getTransaction().begin();
		try {
			AccountEntity entity = new AccountEntity();
			entity.setAccountNumber(accountNumber);
			entity.setBalance(new BigDecimal("0.0"));
			UserEntity userEntity = em.find(UserEntity.class, userId);
			entity.setUser(userEntity);
			em.merge(entity);
			em.getTransaction().commit();
		} finally {
			em.close();
		}
	}

	@Override
	public Transaction[] getAccountTransactions(String accountNumber) throws AccountNotFoundException {
		EntityManager em = emf.createEntityManager();
		try {
			TypedQuery<TransactionEntity> query = em.createQuery(
					"SELECT t FROM TransactionEntity t WHERE t.account.accountNumber = :accountNumber",
					TransactionEntity.class);
			query.setParameter("accountNumber", accountNumber);
			List<TransactionEntity> transactionEntities = query.getResultList();
			if (transactionEntities == null || transactionEntities.size() == 0)
				throw new AccountNotFoundException();
			Transaction[] transactions = new Transaction[transactionEntities.size()];
			for (int i = 0; i < transactionEntities.size(); i++)
				transactions[i] = transactionEntities.get(i).convertToTransaction();
			return transactions;
		} finally {
			em.close();
		}
	}

}
