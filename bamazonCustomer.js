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

  displayMerch();
});

// Prompt asking the customer which items they would like to buy along with the quantity.
prodRequest = () => {
  inquirer
    .prompt([
      {
        name: "product",
        type: "input",
        message:
          "What is the ID number of the item you would like to purchase?",
        validate: value => {
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
        validate: value => {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(answers => {
      connection.query(
        "SELECT * FROM products",
        [answers.product, answers.stock_quantity],
        (err, response) => {
          let reqQuantity = parseInt(answers.quantity);
          let productId = response[answers.product - 1].id;
          let price = response[answers.product - 1].price;
          let availQuantity = response[answers.product - 1].stock_quantity;
          let updatedInventory = availQuantity - reqQuantity;

          if (availQuantity < reqQuantity) {
            console.log("------------------------------------------------------------------------------------------------------------------");
            console.log("Item currently not available in the requested amount. Please adjust your order, or try purchasing a different item");
            console.log("------------------------------------------------------------------------------------------------------------------");
            prodRequest();
          } else {
            console.log("---------------------------------");
            console.log("YOUR TOTAL PRICE COMES TO $ " + price * reqQuantity);
            console.log("---------------------------------");
            console.log("");
            additionalOrder();
            var query = connection.query("UPDATE products SET ? WHERE ?", [
              {
                stock_quantity: updatedInventory
              },
              {
                id: productId
              }
            ]);
          }
          
        }
      );
    });
};

displayMerch = () => {
  connection.query(
    "SELECT id, product_name, department_name, price, stock_quantity FROM products",
    (err, res) => {
      if (err) throw err;
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

additionalOrder = () => {
  inquirer
    .prompt([{
      type: "list",
      message: "Would you like to make another purchase?",
      choices: ["yes", "no"],
      name: "userChoices"
    }]).then( answer => {
      if (answer.userChoices === "yes") {
        prodRequest();
      }
    else {
      console.log("");
      console.log("-------------------------------");
      console.log("Thank you for shopping with us!")
      console.log("-------------------------------");
      connection.end();
    }
})
};