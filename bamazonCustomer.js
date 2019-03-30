// Requiring npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");

//creating connection to Database
var connection = mysql.createConnection({
    host: "localhost",
  
    port: 8889,
  
    user: "root",
  
    password: "root",
    database: "bamazon"
  });
  
  // connect to the mysql server and sql database
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    
  });
  