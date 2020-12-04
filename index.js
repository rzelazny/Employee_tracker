const inquirer = require ("inquirer");
const conTable = require("console.table");

var orm = require("./config/orm.js");
var connection = require("./config/connection.js");

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
    inquirer.prompt({
        type: "list",
        message: "What data are you looking for?",
        choices: [
            "Department",
            "Employee",
            "Role"
        ],
        name: "userSearch"
    })
    .then(function(response){
        orm.selectAll(response.userSearch, function(result) {
            console.log(result);
            promptUser();
        })
    });
};

function updateData (){
    inquirer.prompt({
        type: "list",
        message: "What data do you want to update?",
        choices: [
            "Department",
            "Employee",
            "Role"
        ],
        name: "userUpdate"
    })
    .then(function(response){
        orm.selectAll(response.userSearch, function(result) {
            console.log(result);
            promptUser();
        })
    });
};

//table, cols, vals
function addData (){
    inquirer.prompt({
        type: "list",
        message: "What data do you want to add?",
        choices: [
            "New Department",
            "New Employee",
            "New Role"
        ],
        name: "userCreate"
    })
    .then(function(response){
        orm.create(response.userSearch, function(result) {
            console.log(``);
            promptUser();
        })
    });
};

promptUser();