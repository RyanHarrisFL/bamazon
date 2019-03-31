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
  //connection.end();
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
    },
    {
      name: "quantity",
      type: "input",
      message: "How much of this item would you like to purchase?",
      validate: (value) => {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }
  ]).then( answers => {
      console.log(answers)
      let reqQuantity = (answers.quantity)
    connection.query("SELECT * FROM products", [answers.product, answers.stock_quantity], (err, response) => {
        let productId = (response[answers.product - 1].id);
        let price = (response[answers.product - 1].price);
        let availQuantity = (response[answers.quantity - 1].stock_quantity);
        let updatedInventory = availQuantity - reqQuantity;

        if (reqQuantity > availQuantity) {
          console.log("INSUFFICIENT QUANITY! :( ")
        } else {
          console.log ("YOUR TOTAL PRICE COMES TO $" + price * reqQuantity)
          connection.query("UPDATE products SET ? WHERE ?", [
            {
              stock_quantity: updatedInventory
            },
            {
              id: productId
            }
          ])
        }

        connection.end();
    });
    
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
