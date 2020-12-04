const inquirer = require ("inquirer");
require("console.table");

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
            break;
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
            console.table(result);
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

//Function adds new rows based on user input
function addData (){
    inquirer.prompt({
        type: "list",
        message: "What type of data do you want to create?",
        choices: [
            "New Department",
            "New Employee",
            "New Role"
        ],
        name: "userTable"
    })
    .then(function(tableChoice){
        switch(tableChoice.userTable){
            case "New Department":
                inquirer.prompt({
                    type: "input",
                    message: "What is the new department's name?",
                    name: "newDept"
                })
                .then(function(response){
                    orm.create("department", "dept_name", [response.newDept], function(result) {
                        console.log(`Created new department: ${response.newDept} || Department id: ${result.insertId}`);
                        promptUser();
                    })
                });
            break;
            case "New Employee":
                inquirer.prompt([{
                type: "input",
                    message: "What is the employee's first name?",
                    name: "firstName"
                },
                {
                    type: "input",
                    message: "What is the employee's last name?",
                    name: "lastName"
                },
                {
                    type: "input",
                    message: "What is the employee's role?",
                    name: "empRole"
                },
                {
                    type: "input",
                    message: "Who is the employee's manager (if applicable)?",
                    name: "empManager"
                }])
                .then(function(response){
                    orm.create("employee", ["first_name", "last_name", "role_id", "manager_id"], [response.firstName, response.lastName, response.empRole, response.empManager], function(result) {
                        console.log(`Created new employee: ${response.firstName} ${response.lastName} || Employee id: ${result.insertId}`);
                        promptUser();
                    })
                });
            break;
            case "New Role":
                inquirer.prompt([{
                    type: "input",
                        message: "What is the new role's title?",
                        name: "newRole"
                    },
                    {
                        type: "input",
                        message: "What is the new role's salary?",
                        name: "salary"
                    },
                    {
                        type: "input",
                        message: "What department is the new role in?",
                        name: "department"
                    }])
                    .then(function(response){
                        orm.create("role", ["title", "salary", "department_id"], [response.newRole, response.salary, response.department], function(result) {
                            console.log(`Created new role: ${response.newRole} in department ${response.department} || role id: ${result.insertId}`);
                            promptUser();
                        })
                    });
            break;
        }
    })
};

promptUser();