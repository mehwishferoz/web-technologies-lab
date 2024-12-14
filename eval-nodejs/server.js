// Imagine you are developing a web application that manages a Employee Management system in an organization.
// The application has a database with two tables :Employee and Department.
// The Employee table has columns like EmpId, EmpName, address, salary,DeptId,designation,DOJ.
// The Department table has columns such as DeptID, DeptName, TotalEmployees.
// your task is to create a Nodejs server that interacts with the database using SQL queries to perform the following operations:
// 1. Retrieve the list of all employees in the organization.
// 2. Retrieve the list of all employees in the organization who are working in sales department.
// 3. Add new employee.
// 4. Delete an employee whose salary is more than 1 lakh.
// 5. Display latest 5 employees.
// how would you structure the SQL queries in your nodejs application to achieve these operations efficiently.
var mysql = require("mysql");
var http = require("http");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: true });

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("connected");

  con.query("CREATE DATABASE IF NOT EXISTS empdept;", function (err, result) {
    if (err) throw err;
    console.log("database connected");

    con.query("USE empdept;", function (err, result) {
      if (err) throw err;
      console.log("using database empdept");

      var q1 =
    "CREATE TABLE IF NOT EXISTS department (DeptID int(5) primary key, DeptName varchar(30), TotalEmployees int(5));";
  con.query(q1, function (err, result) {
    if (err) throw err;
    console.log("department table created");

    var q2 =
      "CREATE TABLE IF NOT EXISTS employee (EmpId int(5) primary key, EmpName varchar(30), address varchar(30), salary int(8), DeptId int(5), foreign key (DeptId) references empdept.department(DeptID), designation varchar(30), DOJ date)";
    con.query(q2, function (err, result) {
      if (err) throw err;
      console.log("employee table created");
    });
  });
    });
  });
});

app.get("/", function (req, res) {
  res.send(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Management System</title>
    <style>
        h1 {
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
            color: brown;
        }
        .forms{
            display: flex;
            width: 1200px;
            margin-left: auto;
            margin-right: auto;
            font-size: x-large;
        }
        .c1{
            width: 800px;
            border-style: double;
            border-color: chocolate;
            margin-right: 50px;
            height: fit-content;
        }
        body{
            background-color: bisque;
        }
    </style>
</head>
<body>
    <h1 style="text-align: center;">Employee Management System</h1>
    <div class="forms">
        <div class="c1">
            <form action="/dept/insert" method="post">
    <div>
        <label for="deptID">Department ID: </label>
        <input type="number" name="deptID" id="deptID"> <!-- Corrected name attribute -->
    </div>
    <div>
        <label for="deptName">Department Name: </label>
        <input type="text" name="deptName" id="deptName"> <!-- Corrected name attribute -->
    </div>
    <div>
        <label for="totalEmp">Total Employees: </label>
        <input type="number" name="totalEmp" id="totalEmp"> <!-- Corrected name attribute -->
    </div>
    <input type="submit" value="DEPARTMENT">
</form>
        </div>
        
        <div class="c1">
        <form action="/employee/insert" method="post">
        <div>
            <label for="EmpID">Employee ID: </label>
            <input type="number" name="EmpID" id="EmpID"> <!-- Corrected name attribute -->
        </div>
        <div>
            <label for="EmpName">Employee Name: </label>
            <input type="text" name="EmpName" id="EmpName"> <!-- Corrected name attribute -->
        </div>
        <div>
            <label for="address">Address: </label>
            <input type="text" name="address" id="address">
        </div>
        <div>
            <label for="salary">Salary: </label>
            <input type="number" name="salary" id="salary">
        </div>
        <div>
            <label for="Deptid">Department ID: </label>
            <input type="number" name="Deptid" id="Deptid"> <!-- Corrected name attribute -->
        </div>
        <div>
            <label for="designation">Designation: </label>
            <input type="text" name="designation" id="designation">
        </div>
        <div>
            <label for="DOJ">Date of Joining: </label>
            <input type="date" name="DOJ" id="DOJ">
        </div>
        <input type="submit" value="EMPLOYEE">
    </form>
    
        </div>
        <div class="c1">
            <form action="/employee/view" method="get">
            <h3>Clickhere to view Employees</h3>
            <input type="submit" value="VIEW EMPLOYEE">
        </form>
        </div>
        <div class="c1">
            <form action="/dept/view" method="get">
            <h3>Clickhere to view Departments</h3>
            <input type="submit" value="VIEW DEPARTMENT">
        </form>
        </div>
        <div class="c1">
            <form action="/employeeLatest/view" method="get">
            <h3>Clickhere to view Latest 5 employees</h3>
            <input type="submit" value="VIEW LATEST EMPLOYEE">
        </form>
        </div>
    </div>
</body>
</html>
    `);
});

app.get('/employee/view', function(req, res){
    var q1 = `SELECT * FROM employee`;
    con.query(q1, function(err, result){
        if (err) throw err;
        res.json(result);
    })
});

app.get('/dept/view', function(req, res){
    var q1 = `SELECT * FROM department`;
    con.query(q1, function(err, result){
        if (err) throw err;
        res.json(result);
    })
});

app.get('/employeeLatest/view', function(req, res){
    var q1 = `SELECT * FROM employee`;
    con.query(q1, function(err, result){
        if (err) throw err;
        res.json(result[0]);
        res.json(result[1]);
        res.json(result[2]);
        res.json(result[3]);
        res.json(result[4]);
    })
});

app.post('/dept/insert', urlencodedParser, function(req, res){
    console.log(req.body);
    const { deptID, deptName, totalEmp } = req.body; // Corrected parameter names
    var q1 = `INSERT INTO department VALUES('${deptID}', '${deptName}', ${totalEmp})`; // Removed single quotes around numeric values
    con.query(q1, function(err, result){
        if (err) throw err;
        res.write('department inserted');
        res.end();
    });
});


app.post('/employee/insert', urlencodedParser, function(req, res){
    console.log(req.body);
    const { EmpID, EmpName, address, salary, Deptid, designation, DOJ } = req.body; // Corrected parameter names
    var q1 = `INSERT INTO employee VALUES('${EmpID}', '${EmpName}', '${address}', ${salary}, ${Deptid}, '${designation}', '${DOJ}')`; // Removed single quotes around numeric values
    con.query(q1, function(err, result){
        if (err) throw err;
        res.write('employee inserted');
        res.end();
    });
});


app.listen(5000, function () {
    console.log("Server is running on port 5000");
});