package com.smbcgroup.training.jpa;

import static org.junit.Assert.assertEquals;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class JPATest {

	private EntityManagerFactory emf = Persistence.createEntityManagerFactory("derby-entities");
	private EntityManager em = emf.createEntityManager();

	@Before
	public void setup() {
		em.getTransaction().begin();

		Department treasury = new Department(1, "Treasury");
		em.persist(treasury);
		Department loans = new Department(2, "Loans");
		em.persist(loans);
		Department jria = new Department(3, "JRIA");
		em.persist(jria);

		em.persist(new Employee(1452, "Alison Smith", new BigDecimal("70000"), treasury));
		em.persist(new Employee(1453, "Bob Smith", new BigDecimal("60000"), treasury));
		em.persist(new Employee(1454, "Chris Smith", new BigDecimal("50000"), treasury));
		em.persist(new Employee(1455, "Dinesh Smith", new BigDecimal("50000"), loans));
		em.persist(new Employee(1456, "Emily Smith", new BigDecimal("90000"), jria));
		em.persist(new Employee(1457, "Felix Smith", new BigDecimal("80000"), jria));
		em.persist(new Employee(1458, "Gonzo Smith", new BigDecimal("100000"), jria));

		em.getTransaction().commit();
		em.close();
		
		em = emf.createEntityManager();
		em.getTransaction().begin();
	}

	@Test
	public void testFind() {
		Employee alison = em.find(Employee.class, 1452);
		assertEquals("Alison Smith", alison.getName());
		assertEquals("Treasury", alison.getDepartment().getName());
	}

	@Test
	public void testSelect1() {
		TypedQuery<Employee> query = em.createQuery("SELECT e FROM Employee e WHERE e.salary > ?1", Employee.class);
		query.setParameter(1, 50000);
		List<Employee> employees = query.getResultList();
		assertEquals(5, employees.size());
	}

	@Test
	public void testSelect2() {
		Department department = em.find(Department.class, 1);
		assertEquals(3, department.getEmployees().size());
	}

	@Test
	public void testSelect3() {
		List<Department> departments = em.createQuery("SELECT d FROM Department d ORDER BY d.id", Department.class).getResultList();
		assertEquals(3, departments.get(0).getEmployees().size());
		assertEquals(1, departments.get(1).getEmployees().size());
		assertEquals(3, departments.get(2).getEmployees().size());
	}

	@After
	public void teardown() {
		em.getTransaction().rollback();
		em.close();
	}

}
