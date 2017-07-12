var db = require("../core/db");
var httpMsg = require("../core/httpMsg");
var util = require("util");

exports.getList = function (request, response) {
    db.executeSql("SELECT * FROM employee", function (data, error) {
        if (error) {
            httpMsg.show500Error(request, response, error);            
        }
        else {
            httpMsg.sendJson(request, response, data);
        }
       
    });
};

exports.get = function (request, response, id) {
    db.executeSql("SELECT * FROM employee where id = "+ id, function (data, error) {
        if (error) {
            httpMsg.show500Error(request, response, error);
        }
        else {
            httpMsg.sendJson(request, response, data);
        }

    });
};

exports.add = function (request, response, reqbody) {
    try {
        if (!reqbody)
            throw new Error("Input not valid");
        var data = JSON.parse(reqbody);
        if (data) {
            var sql = "INSERT INTO EMPLOYEE (ID, NAME, ADDRESS) VALUES ;";
            sql += util.format("( %d, '%s', '%s'", data.id, data.name, date.address);
            db.executeSql(sql, function (data, error) {
                if (error) {
                    httpMsg.show500Error(request, response, error);
                }
                else {
                    httpMsg.show200(request, response);
                }

            });
        }
        else {
            throw new Error("Input not valid");
        }

    }
    catch (ex) {
        httpMsg.show500Error(request, response, ex);
    }
};

exports.update = function (request, resopnse, reqbody) { };

exports.delete = function (request, resopnse, id) { };

