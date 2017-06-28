var db = require("../core/db");

exports.getList = function (request, response) {
    db.executeSql("SELECT * FROM emp", function (data, error) {
        if (error) {
            resp.writeHead(500, "Internal Error ocurred", { "Content-Type": "text/html" });
            resp.write("<html><head><title>500</title><\head><body>500: Internal Server Error. Details " + err + "<\body><\html>");           
        }
        else {
            resp.writeHead(200, { "Content-Type": "application/json" });
            resp.write(JSON.stringify(data));           
        }
        resp.end();
    });
};

exports.get = function (request, response, id) {
};

exports.add = function (request, response, reqbody) {
};

exports.update = function (request, resopnse, reqbody) { };

exports.delete = function (request, resopnse, id) { };

