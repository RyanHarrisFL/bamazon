## Bamazon Store Application 

**Contact:** ryanharrisfl@gmail.com

**Technologies Used** 
* node.js
* Javascript
* Sql
* MAMP MySql Server
* dBeaver Database Manager
* NPM Packages (MySql, Inquirer, cli-table)

Gifs below created using Screen to GIF: https://www.screentogif.com/

**Purpose of Project:** This project practices making SQL server requests by pulling information from the database and also making updates to the item inventory in the database.

**What it Does:** A user can select the id of an item they want to purchase. Once the item selection is made they can shoose the quantity. If their is enough inventory available the user will receive a total for the purchase and can choose to make another purchse. If their is not enough inventory they will receive a message telling them their is insufficient inventory and they will have the option to try a smaller quantity, or make another purchase. 

## Commands In Action 

### Successful Purchase

1. Making an initial purchase then exiting the store. NOTE: The Gif for "Insufficent Inventory" shows the updated database in the table (Bananas 150 from 151 in first Gif example.)

![Alt Text](https://github.com/RyanHarrisFL/bamazon/blob/master/assets/bamazon-purchase.gif)

### Insufficient Inventory

2. Attempting a purchase and receiving an insufficient inventory message. 

![Alt Text](https://github.com/RyanHarrisFL/bamazon/blob/master/assets/bamazon-insufficient-inventory.gif)

## Do It Yourself
Follow the instructions below if you would like to run the application in the command line.

1. Clone down the respoitory to a place on your local machine.

2. Open root folder in your code editor.

3. In your terminal type "npm install" to install all npm packages.

4. Type "node bamazonCustomer.js" to run the store in the terminal and follow the CLI instructions.

