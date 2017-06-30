var db = require("../core/db");

exports.getList = function (request, response) {
    db.executeSql("SELECT * FROM employee", function (data, error) {
        if (error) {
            //response.writeHead(500, "Internal Error ocurred", { "Content-Type": "text/html" });
            //response.write("<html><head><title>500</title></head><body>500: Internal Server Error. Details " + error + "</body></html>");           
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({data: "Error ocurrerd: " + error}));
        }
        else {
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify(data));           
        }
        response.end();
    });
};

exports.get = function (request, response, id) {
};

exports.add = function (request, response, reqbody) {
};

exports.update = function (request, resopnse, reqbody) { };

exports.delete = function (request, resopnse, id) { };

