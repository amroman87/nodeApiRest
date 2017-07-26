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
            var sql = "INSERT INTO EMPLOYEE (ID, NAME, ADDRESS) VALUES ";
            sql += util.format("( %d, '%s', '%s');", data.id, data.name, data.address);
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

exports.update = function (request, response, reqbody) {
    try {
        if (!reqbody)
            throw new Error("Input not valid");
        var data = JSON.parse(reqbody);
        if (data) {

            var dataIsProvider = false;
            var sql = "UPDATE EMPLOYEE SET ";

            if (!data.id) {
                throw new Error("Employee ID not provider");
            }

            if (data.name) {
                sql += "NAME = '" + data.name + "' ,";
                dataIsProvider = true;
            }
            if (data.address) {
                sql += " ADDRESS = '" + data.address + "' ,";
                dataIsProvider = true;
            }

            sql = sql.slice(0, -1); // remove last coma

            

            sql += "WHERE ID = " + data.id + ";";

            console.log(sql);

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

exports.delete = function (request, response, id) {
    try {

        if (id) {

            
            var sql = "DELETE FROM EMPLOYEE ";
          
            sql += "WHERE ID = " + id + ";";

            console.log(sql);

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
            throw new Error("Employee ID not provider");
        }

    }
    catch (ex) {
        httpMsg.show500Error(request, response, ex);
    }
};

