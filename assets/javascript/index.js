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
            "Check existing data",
            "Update employee data",
            "Exit"
        ]
    })
    .then(function(response) {
        // based on their answer, either call the bid or the post functions
        switch(response.action){
            case "Check existing data":
                getData();
            break;
            case "Update employee data":
                updateData();
            break;
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
            "Employee",
            "Department"
        ],
        name: "choice"
    }
    ])
    .then(function(response){
        connection.query("SELECT * FROM department WHERE ?",
        [{
            id: 1
        }],
        function(err, result){
            
            if(err) throw err;

            promptUser();
        })
    })
};

function updateData (){

};