// Requiring npm packages
const mysql = require("mysql");
const inquirer = require("inquirer");
var Table = require('cli-table');

var table = new Table({
    head: ['Product', 'Department', 'Price' , 'In Stock']
  , colWidths: [40, 25, 25, 25]
});

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
    connection.end();
  });

  const displayMerch = () => {
      connection.query("SELECT product_name, department_name, price, stock_quantity FROM products", (err, res) => {
        if (err) throw err;
        //console.log(res);
        for (let i = 0; i < res.length; i++) {
        table.push(
            [res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
        );
        }
        console.log(table.toString());
      });
  }

  const prodRequest = () => {
        inquirer.prompt([
            {
                name: "product"
                type: "input"
                message: "What is the ID number of the item you would like to purchase?"
            }
        ])

  }

  prodRequest();

  
  
  