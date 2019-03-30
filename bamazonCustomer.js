// Requiring npm packages
const mysql = require("mysql");
const inquirer = require("inquirer");
var Table = require("cli-table");

var table = new Table({
  head: ["ID", "Product", "Department", "Price", "In Stock"],
  colWidths: [10, 60, 25, 10, 10]
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
connection.connect(err => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");

  displayMerch();
  connection.end();
});

// Prompt asking the customer which items they would like to buy along with the quantity.
prodRequest = () => {
  inquirer.prompt([
    {
      name: "product",
      type: "input",
      message: "What is the ID number of the item you would like to purchase?",
      validate: (value) => {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }
  ]).then( answers => {

    console.log("Then is working.")
 
  });
};

displayMerch = () => {
  connection.query(
    "SELECT id, product_name, department_name, price, stock_quantity FROM products",
    (err, res) => {
      if (err) throw err;
      //console.log(res);
      for (let i = 0; i < res.length; i++) {
        table.push([
          res[i].id,
          res[i].product_name,
          res[i].department_name,
          res[i].price,
          res[i].stock_quantity
        ]);
      }
      console.log(table.toString());
      prodRequest();
    }
  );
};
