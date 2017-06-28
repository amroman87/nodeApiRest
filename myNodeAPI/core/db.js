var sqlDb = require("mysql");
var settings = require("../Settings");


exports.executeSql = function (sql, callback) {
    var connection = new sqlDb.createConnection(settings.dbConfig);
    connection.connect()
        .then(function () {
            connection.query(sql)
                .then(function (recordset) {
                    callback(recordset);
                })
                .catch(function (error) {
                    console.log(err);
                    callback(null, error);
                });
        })
        .catch(function (error) {
            console.log(err);
            callback(null, error);
        });
};