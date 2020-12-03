const inquirer = require ("inquirer");
const console = require ("console.table");

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
    .then(function(response){
        orm.selectWhere("department", "dept_name", "Engineering", function(result) {
        var data = result;
        console.log(data);
    })}
    );
};

// function updateData (){

// };

promptUser();