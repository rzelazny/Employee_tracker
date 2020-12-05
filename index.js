const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
require("console.table");

var orm = require("./config/orm.js");

init();

//The welcome function
function init(){
    const logoText = logo({ name: "Employee Manager" }).render();

    console.log(logoText);

    promptUser();
}

//Main prompt function that asks the user which action they want to take
function promptUser() {
    prompt([{
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
    },
    {
        type: "list",
        message: "Of what type?",
        choices: [
            "Department",
            "Employee",
            "Role"
        ],
        name: "table",
        when: (response) => response.action != "Exit",
    }])
    .then(function(response) {
        // based on their answer, call the appropriate function
        switch(response.action){
            case "View current data":
                return getData(response.table);
            case "Update existing data":
                return updateData(response.table);
            case "Create new data":
                return addData(response.table);
            case "Delete existing data":
                return deleteData(response.table);
            default:
                orm.quit();
        }
    });
};

//Function returns all data from a table with joins to pull linked data where appropriate
function getData (table) {
    switch(table){
        case "Department":
            orm.selectDeptartments(function(result) {
                console.table(result);
                return promptUser();
            })
        break;
        case "Employee":
            orm.selectEmployees(function(result) {
                console.table(result);
                return promptUser();
            })
        break;
        case "Role":
            orm.selectRoles(function(result) {
                console.table(result);
                return promptUser();
            })
        break;
    }
};

//Function updates existing data
function updateData (table){
    orm.getColumns(table, function(columns) {
        switch(table){
            case "Department":
                orm.getDepartments(function(departments) {
                prompt([{
                    type: "list",
                    message: "Which department is being updated?",
                    name: "updateDept",
                    choices: departments
                },
                {
                    type: "list",
                    message: "Which field is being updated?",
                    name: "updateCol",
                    choices: columns
                },
                {
                    type: "input",
                    message: "Enter the new value:",
                    name: "newData",
                }
                ])
                .then(function(response){
                    orm.update("department", response.updateCol + " = '" + response.newData + "'", "id=" + response.updateDept , function(result) {
                        console.log(`Created updated department: ${response.updateDept} || ${response.updateCol}: ${response.newData}`);
                        promptUser();
                    })
                });
                });
            break;
            case "Employee":
                prompt([{
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
            case "Role":
                prompt([{
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

//Function adds new rows to existing tables
function addData (table){
    switch(table){
        case "Department":
            prompt({
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
        case "Employee":
            //get list of existing employees for manager selection
            orm.getEmployees(function(employees) {
            //add N/A option to employees for manager selection
            employees.push({name: "N/A", value: null})

            //get roles for role selection
            orm.getRoles(function(roles) {
                
            prompt([{
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
                type: "list",
                message: "Who is the employee's manager (if applicable)?",
                name: "empManager",
                choices: employees
            },
            {
                type: "list",
                message: "What is the employee's role?",
                name: "empRole",
                choices: roles
            }])
            .then(function(response){
                orm.create("employee", ["first_name", "last_name", "role_id", "manager_id"], [response.firstName, response.lastName, response.empRole, response.empManager], function(result) {
                    console.log(`Created new employee: ${response.firstName} ${response.lastName} || Employee id: ${result.insertId}`);
                    promptUser();
                })
            });
            })
        })
        break;
        case "Role":
            //get existing departments for departments selection
            orm.getDepartments(function(departments) {
            prompt([{
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
                    type: "list",
                    message: "What department is the new role in?",
                    name: "department",
                    choices: departments
                }])
                .then(function(response){
                    orm.create("role", ["title", "salary", "department_id"], [response.newRole, response.salary, response.department], function(result) {
                        console.log(`Created new role: ${response.newRole} in department ${response.department} || role id: ${result.insertId}`);
                        promptUser();
                    })
                });
            })
        break;
    }
};

//Function deletes data from existing tables
function deleteData(table) {
    switch(table){
        case "Department":
            //get existing department list
            orm.getDepartments(function(departments) {
            prompt({
                type: "list",
                message: "Which department is being deleted?",
                name: "delDept",
                choices: departments
                })
            .then(function(response){
                console.log(response.delDept)
                orm.destroy("department", [response.delDept], function(result) {
                    console.log(`Deleted department: ${response.delDept}`);
                    promptUser();
                })
            });
            });
        break;
        case "Employee":
            //get existing employee list
            orm.getEmployees(function(employees) {
            prompt({
            type: "list",
                message: "Which employee is being deleted?",
                name: "delName",
                choices: employees
            })
            .then(function(response){
                console.log(response.delName);
                orm.destroy("employee", [response.delName], function(result) {
                    console.log(`Deleted employee: ${response.delName}`);
                    promptUser();
                })
            });
            });
        break;
        case "Role":
            //get existing role list
            orm.getRoles(function(role) {
            prompt({
                type: "list",
                    message: "Which role is being deleted?",
                    name: "delRole",
                    choices: role
                })
                .then(function(response){
                    orm.destroy("role", [response.delRole], function(result) {
                        console.log(`Deleted role: ${response.delRole}`);
                        promptUser();
                    })
                });
            });
        break;
    }
};