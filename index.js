const mysql = require ("mysql");
const inquirer = require ("inquirer");
const console = require ("console.table");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

// Your port; if not 3306
    port: 3306,

// Your username
    user: "root",

// Your password
    password: "password",
    database: "company_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    promptUser();
});

// function which prompts the user for what action they should take
function promptUser() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View current data",
            "Update existing data",
            "Create new data",
            "Delete existing data",
            "Exit"
        ]
    })
    .then(function(response) {
        // based on their answer, call the appropriate function
        switch(response.action){
            case "View current data":
                getData();
            break;
            case "Update existing data":
                updateData();
            break;
            case "Create new data":
                addData();
            case "Delete existing data":
                deleteData();
            default:
                connection.end();
        }
    });
};



function getData () {

    
    inquirer.prompt([{
        type: "list",
        message: "What data are you looking for?",
        choices: [
            "Department",
            "Employee",
            "Role"
        ],
        name: "userSearch"
    }
    ])
    .then(function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput.userSearch + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    });
};

function updateData (){

};