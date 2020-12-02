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
            "Find a specific song",
            "Exit"
        ]
    })
    .then(function(response) {
        // based on their answer, either call the bid or the post functions
        switch(response.action){
            case "Find a specific song":

            break;
            default:
                connection.end();
        }
    });
}

// function findArtistSongs () {
//     inquirer.prompt([{
//         type: "input",
//         message: "What artist do you want to search for?",
//         name: "artist"
//     }
//     ])
//     .then(function(response){
//         connection.query("SELECT * FROM top5000 WHERE ?",
//         [{
//             artist: response.artist
//         }],
//         function(err, result){
//             if(err) throw err;
//             result.forEach(row => {
//                 console.log(`Song: ${row.song} Release || Date: ${row.year}`)
//             });
//             promptUser();
//         })
//     })
// };