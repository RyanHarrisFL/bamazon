// Requiring npm packages
const mysql = require("mysql");
const inquirer = require("inquirer");

//creating connection to Database
const connection = mysql.createConnection({
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

    displayMerch();
  });

  const displayMerch = () => {
      connection.query("SELECT product_name, department_name, price, stock_quantity FROM products", (err, res) => {
        if (err) throw err;
        console.log(res);
        connection.end();
      });
  }

  


  
  