package com.smbcgroup.training.jdbc;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

public class JDBCTest {

	private static Connection conn;

	@BeforeClass
	public static void setupConnection() throws Exception {
		Class.forName("org.apache.derby.jdbc.EmbeddedDriver");
		conn = DriverManager.getConnection("jdbc:derby:target/testdb;create=true");
	}
	@Before
	public void setupTables() throws SQLException {

		dropView("TREASURY_EMPLOYEES");
		dropTable("Employees");
		dropTable("Departments");
		
		conn.prepareStatement(
			"CREATE TABLE Employees ("
			+ "id INT PRIMARY KEY,"
			+ "name VARCHAR(64) NOT NULL,"
			+ "wage INT,"
			+ "department_id INT)"
			).execute();
		
		conn.prepareStatement(
			"INSERT INTO Employees(id, name, wage, department_id) VALUES"
			+ "(1452, 'Alison Smith', 70000, 1),"
			+ "(1453, 'Bob Smith', 60000, 1),"
			+ "(1454, 'Chris Smith', 50000, 1),"
			+ "(1455, 'Dinesh Smith', 50000, 2),"
			+ "(1456, 'Emily Smith', 90000, 3),"
			+ "(1457, 'Felix Smith', 80000, 3),"
			+ "(1458, 'Gonzo Smith', 100000, 3)"
			).execute();
		
		conn.prepareStatement(
			"DELETE FROM Employees "
			+ "WHERE id IN (1459, 1460)"
			).execute();
		
		conn.prepareStatement(
			"CREATE TABLE Departments ("
			+ "id INT PRIMARY KEY,"
			+ "name VARCHAR(64) NOT NULL,"
			+ "manager_name VARCHAR(64))"
			).execute();
		
		conn.prepareStatement(
			"INSERT INTO Departments(id, name, manager_name) VALUES"
			+ "(1, 'Treasury', 'Alex Smith'),"
			+ "(2, 'Loans', 'Alex Smith'),"
			+ "(3, 'JRIA', 'Beatriz Smith')"
			).execute();
	}

	private void dropTable(String table) {
		try {
			conn.prepareStatement("DROP TABLE " + table).execute();
		} catch (SQLException e) {
//			e.printStackTrace();
			System.out.println(table + " Already Dropped.");
		}
	}
	
	private void dropView(String view) {
		try {
			conn.prepareStatement("DROP VIEW " + view).execute();
		} catch (SQLException e) {
//			e.printStackTrace();
			System.out.println(view + " Already Dropped.");
		}
	}
	
	private String[] resultToStringArr(ResultSet result, int length)  throws SQLException {
		String[] fields = new String[length];
		for (int i = 0; i < length; i++) {
			fields[i] = result.getString(i + 1);
		}
		return fields;
	}
	
	private void printRow(ResultSet result, int length) throws SQLException {
		String[] fields = resultToStringArr(result, length);
		for (String s: fields) {
			System.out.print(s + ", ");
		}
		System.out.println();
	}

	@Test
	public void testSelect0() throws SQLException {
		ResultSet result = conn.prepareStatement("SELECT * FROM Employees WHERE id = 1452").executeQuery();
		result.next();
		assertEquals("Alison Smith", result.getString("name"));
		assertFalse(result.next());
	}
	
	@Test
	public void testSelectEmpMoreThanFiftyThousand() throws SQLException {
		ResultSet result = conn.prepareStatement(
				"SELECT *"
				+ "FROM Employees "
				+ "WHERE wage > 50000 "
				+ "ORDER BY wage DESC"
				).executeQuery();
		result.next();
		assertEquals("Gonzo Smith", result.getString("name"));
		result.next();
		assertEquals("Emily Smith", result.getString("name"));
		result.next();
		assertEquals("Felix Smith", result.getString("name"));
		result.next();
		assertEquals("Alison Smith", result.getString("name"));
		result.next();
		assertEquals("Bob Smith", result.getString("name"));
		assertFalse(result.next());
	}
	
	@Test
	public void testSelectNumberofEmployeesInTreasury() throws SQLException {
		ResultSet result = conn.prepareStatement(
				"SELECT COUNT(*) AS Count "
				+ "FROM Employees E "
				+ "INNER JOIN Departments D "
				+ "ON E.department_id = D.id "
				+ "WHERE D.name = 'Treasury'"
				).executeQuery();
		result.next();
		assertEquals("3", result.getString("Count"));
		assertFalse(result.next());
	}
	
	@Test
	public void testSelectNumberOfEmployeesPerDepartment() throws SQLException {
		ResultSet result = conn.prepareStatement(
				"SELECT D.id AS DID, "
				+ "D.name AS Name, "
				+ "COUNT(D.id) AS Count "
				+ "FROM Employees E "
				+ "INNER JOIN Departments D "
				+ "ON E.department_id = D.id "
				+ "GROUP BY D.id, D.name "
				+ "ORDER BY D.id"
				).executeQuery();
		result.next();
		assertEquals("1", result.getString("DID"));
		assertEquals("Treasury", result.getString("Name"));
		assertEquals("3", result.getString("Count"));
		result.next();
		assertEquals("2", result.getString("DID"));
		assertEquals("Loans", result.getString("Name"));
		assertEquals("1", result.getString("Count"));
		result.next();
		assertEquals("3", result.getString("DID"));
		assertEquals("JRIA", result.getString("Name"));
		assertEquals("3", result.getString("Count"));
		assertFalse(result.next());
	}
	
	@Test
	public void testDepartmentsWithOverTwoEmployees() throws SQLException {
		ResultSet result = conn.prepareStatement(
				"SELECT D.id as DID, "
				+ "D.name as Name "
				+ "FROM Employees E "
				+ "INNER JOIN Departments D "
				+ "ON E.department_id = D.id "
				+ "GROUP BY D.id, D.name "
				+ "HAVING COUNT(D.id) > 2"
				).executeQuery();
		result.next();
		assertEquals("1", result.getString("DID"));
		assertEquals("Treasury", result.getString("Name"));
		result.next();
		assertEquals("3", result.getString("DID"));
		assertEquals("JRIA", result.getString("Name"));
		assertFalse(result.next());
	}
	
	@Test
	public void testNamesOfEmployeesWithManagerAlexSmith() throws SQLException {
		ResultSet result = conn.prepareStatement(
				"SELECT E.name as Name "
				+ "FROM Employees E "
				+ "INNER JOIN Departments D "
				+ "ON E.department_id = D.id "
				+ "WHERE D.manager_name = 'Alex Smith' "
				+ "ORDER BY Name"
				).executeQuery();
		result.next();
		assertEquals("Alison Smith", result.getString("Name"));
		result.next();
		assertEquals("Bob Smith", result.getString("Name"));
		result.next();
		assertEquals("Chris Smith", result.getString("Name"));
		result.next();
		assertEquals("Dinesh Smith", result.getString("Name"));
		assertFalse(result.next());
	}
	
	@Test
	public void testLowHighAvgWageLoans() throws SQLException {
		conn.prepareStatement(
				"INSERT INTO Employees(id, name, wage, department_id) VALUES"
				+ "(1459, 'James Smith', 30000, 2),"
				+ "(1460, 'Rob Smith', 100000, 2)"
				).execute();
		ResultSet result = conn.prepareStatement(
				"SELECT MIN(E.wage) AS minWage,"
				+ "MAX(E.wage) AS maxWage,"
				+ "AVG(E.wage) AS avgWage "
				+ "FROM Employees E "
				+ "INNER JOIN Departments D "
				+ "ON E.department_id = D.id "
				+ "WHERE D.name = 'Loans' "
				+ "GROUP BY D.id "
				).executeQuery();
		result.next();
		assertEquals("30000", result.getString("minWage"));
		assertEquals("100000", result.getString("maxWage"));
		assertEquals("60000", result.getString("avgWage"));
		assertFalse(result.next());
	}
	
	@Test
	public void testCreateViewTreasury_Employees() throws SQLException {
		conn.prepareStatement(
				"CREATE VIEW TREASURY_EMPLOYEES "
				+ "(EID, Name, Wage) AS "
				+ "SELECT E.id AS EID,"
				+ "E.name AS Name,"
				+ "E.wage AS Wage "
				+ "FROM Employees E "
				+ "INNER JOIN Departments D "
				+ "ON E.department_id = D.id "
				+ "WHERE D.name = 'Treasury'"
				).execute();
		ResultSet result = conn.prepareStatement(
				"SELECT * FROM TREASURY_EMPLOYEES"
				).executeQuery();
		result.next();
		assertEquals("1452", result.getString("EID"));
		assertEquals("Alison Smith", result.getString("Name"));
		assertEquals("70000", result.getString("Wage"));
		result.next();
		assertEquals("1453", result.getString("EID"));
		assertEquals("Bob Smith", result.getString("Name"));
		assertEquals("60000", result.getString("Wage"));
		result.next();
		assertEquals("1454", result.getString("EID"));
		assertEquals("Chris Smith", result.getString("Name"));
		assertEquals("50000", result.getString("Wage"));
		assertFalse(result.next());
	}
	
	@Test
	public void testUpdateWages() throws SQLException {
		conn.prepareStatement(
				"CREATE VIEW TREASURY_EMPLOYEES "
				+ "(EID, Name, Wage) AS "
				+ "SELECT E.id AS EID,"
				+ "E.name AS Name,"
				+ "E.wage AS Wage "
				+ "FROM Employees E "
				+ "INNER JOIN Departments D "
				+ "ON E.department_id = D.id "
				+ "WHERE D.name = 'Treasury'"
				).execute();
		conn.prepareStatement(
				"UPDATE Employees "
				+ "SET wage = wage * 1.10 "
				+ "WHERE id in ("
				+ "SELECT EID FROM TREASURY_EMPLOYEES)"
				).execute();
		conn.prepareStatement(
				"UPDATE Employees "
				+ "SET wage = wage * 1.20 "
				+ "WHERE id in ("
				+ "SELECT E.id "
				+ "FROM Employees E "
				+ "INNER JOIN Departments D "
				+ "ON E.department_id = D.id "
				+ "WHERE D.name = 'Loans')"
				).execute();
		ResultSet result = conn.prepareStatement(
				"SELECT E.id as EID, "
				+ "E.name as Name, "
				+ "E.wage as Wage,"
				+ "D.name as Department "
				+ "FROM Employees E "
				+ "INNER JOIN Departments D "
				+ "ON E.department_id = D.id "
				+ "WHERE D.name IN ('Treasury', 'Loans') "
				).executeQuery();
		result.next();
		assertEquals("1452", result.getString("EID"));
		assertEquals("Alison Smith", result.getString("Name"));
		assertEquals("77000", result.getString("Wage"));
		assertEquals("Treasury", result.getString("Department"));
		result.next();
		assertEquals("1453", result.getString("EID"));
		assertEquals("Bob Smith", result.getString("Name"));
		assertEquals("66000", result.getString("Wage"));
		assertEquals("Treasury", result.getString("Department"));
		result.next();
		assertEquals("1454", result.getString("EID"));
		assertEquals("Chris Smith", result.getString("Name"));
		assertEquals("55000", result.getString("Wage"));
		assertEquals("Treasury", result.getString("Department"));
		result.next();
		assertEquals("1455", result.getString("EID"));
		assertEquals("Dinesh Smith", result.getString("Name"));
		assertEquals("60000", result.getString("Wage"));
		assertEquals("Loans", result.getString("Department"));
		assertFalse(result.next());
	}
	
	
	@Test
	public void testRemoveThings() throws SQLException {
		conn.prepareStatement(
				"CREATE VIEW TREASURY_EMPLOYEES "
				+ "(EID, Name, Wage) AS "
				+ "SELECT E.id AS EID,"
				+ "E.name AS Name,"
				+ "E.wage AS Wage "
				+ "FROM Employees E "
				+ "INNER JOIN Departments D "
				+ "ON E.department_id = D.id "
				+ "WHERE D.name = 'Treasury'"
				).execute();
		conn.prepareStatement(
				"DELETE FROM Employees "
				+ "WHERE id IN ("
				+ "SELECT EID FROM TREASURY_EMPLOYEES)"
				).execute();
		conn.prepareStatement(
				"DELETE FROM Departments "
				+ "WHERE name = 'Treasury'"
				).execute();
		conn.prepareStatement(
				"DELETE FROM Employees "
				+ "WHERE id IN ("
				+ "SELECT E.id "
				+ "FROM Employees E "
				+ "INNER JOIN Departments D "
				+ "ON E.department_id = D.id "
				+ "WHERE D.name = 'JRIA' "
				+ "AND E.wage > 80000)"
				).execute();
	}
	
	@Test
	public void testAddRename() throws SQLException {
		conn.prepareStatement(
				"ALTER TABLE Employees "
				+ "ADD PHONE_NUMBER varchar(15)"
				).execute();
//		ResultSet result = conn.prepareStatement(
//				"SELECT * FROM Employees"
//				).executeQuery();
//		ResultSetMetaData meta = result.getMetaData();
//		System.out.println(meta.getColumnName(5));
		
		conn.prepareStatement("RENAME COLUMN Employees.wage TO SALARY").execute();
//		conn.prepareStatement("ALTER TABLE Employees ADD COLUMN SALARY INT").execute();
//		conn.prepareStatement("UPDATE Employees SET SALARY = wage").execute();
//		conn.prepareStatement("ALTER TABLE Employees DROP COLUMN wage").execute();
//		conn.prepareStatement("RENAME COLUMN Employees.SALARY to wage").execute();
		
//		ResultSet r2 = conn.prepareStatement(
//				"SELECT * FROM Employees"
//				).executeQuery();
//		ResultSetMetaData meta = r2.getMetaData();
//		for (int i = 0; i < 5; i++)
//			System.out.println(meta.getColumnName(i+1));
//		while (r2.next())
//			printRow(r2, 5);
	}




}
