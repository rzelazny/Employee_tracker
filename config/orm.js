var connection = require("./connection.js");

var orm = {
    // The last variable cb represents the anonymous function being passed from server.js
    selectAll: function(tableInput, cb) {
    var queryString = "SELECT * FROM ??";
    connection.query(queryString, [tableInput], function(err, result) {
        if (err) throw err;
        cb(result);
        });
    },
    
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
    }
};

module.exports = orm;