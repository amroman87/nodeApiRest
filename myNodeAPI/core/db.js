var sqlDb = require("mysql");
var settings = require("../Settings");


exports.executeSql = function (sql, callback) {
    var connection = new sqlDb.createConnection(settings.dbConfig);
    connection.connect(function (error) {
        if (error) {
            console.log(error);
            callback(null, error);
        }
        connection.query(sql, function (error, result, fields) {
            if (error) {
                console.log(error);
                callback(null, error);
            }
            else
                callback(result);
        });
            
    });
        
};
