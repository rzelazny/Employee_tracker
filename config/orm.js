var connection = require("./connection.js");

// Helper functions for SQL syntax, adds necessary number of '?' marks.
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
            value = "'" + value + "'";
            }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

//The object relational mapping functions
var orm = {
    // The last variable cb represents the anonymous callback function
    selectAll: function(tableInput, cb) {
    var queryString = "SELECT * FROM ??";
    connection.query(queryString, [tableInput], function(err, result) {
        if (err) throw err;
        cb(result);
        });
    },

    getDepartments: function(cb) {
        var queryString = "SELECT dept_name FROM department";
        var choiceArray = [];

        connection.query(queryString, function(err, result) {
            if (err) throw err;

            for (var i = 0; i < result.length; i++) {
                choiceArray.push(result[i].dept_name);
            }
            cb(choiceArray);
        });  
    },

    // getManagerNames: function(tableInput, cb) {
    //     var queryString = "SELECT * FROM ??";
    //     connection.query(queryString, [tableInput], function(err, result) {
    //         if (err) throw err;
    //         cb(result);
    //         });
    // },

    // getEmpName: function(tableInput, cb) {
    //     var queryString = "SELECT * FROM ??";
    //     connection.query(queryString, [tableInput], function(err, result) {
    //         if (err) throw err;
    //         cb(result);
    //         });
    // },

    //updates an existing row for a given table and conditions
    update: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;
    
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
    
        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
    
            cb(result);
        });
    },

    //creates a new row in a given table with as many columns as provided
    create: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
    
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
    
        console.log(queryString);
    
        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }
    
            cb(result);
        });
    },

    //deletes a row in a given table with a given id
    destroy: function(table, dept, cb) {
        var queryString = "DELETE FROM " + table;
    
        queryString += " WHERE ";
        queryString += "dept_name = '" + dept + "'";
    
        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
};

module.exports = orm;