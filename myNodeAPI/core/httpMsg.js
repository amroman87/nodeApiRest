var settings = require("../Settings");

exports.sendJson = function (req, resp, data) {
    resp.writeHead(200, { "Content-Type": "application/json" });
    if (data) {
        resp.write(JSON.stringify(data));
    }
    resp.end();
};

exports.show500Error = function (req, resp, error) {
    if (settings.httpMsgFormat === "HTML") {
        resp.writeHead(500, "Internal Error ocurred", { "Content-Type": "text/html" });
        resp.write("<html><head><title>500</title></head><body>500: Internal Server Error. Details " + error + "</body></html>");           
    }
    else
    {
        resp.writeHead(200, { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Internal Server Error: " + error }));
    }
    resp.end();
};

exports.show405Error = function (resp) {
    if (settings.httpMsgFormat === "HTML") {
        resp.writeHead(405, "Method not supported", { "Content-Type": "text/html" });
        resp.write("<html><head><title>500</title></head><body>405: Method not supported</body></html>");
    }
    else {
        resp.writeHead(405, { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Method Not supported" }));
    }
    resp.end();
};

exports.show404Error = function (resp) {
    if (settings.httpMsgFormat === "HTML") {
        resp.writeHead(404, "Resource not found", { "Content-Type": "text/html" });
        resp.write("<html><head><title>404</title></head><body>404: Resource not found.</body></html>");
    }
    else {
        resp.writeHead(404, { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Resource not found." }));
    }
    resp.end();
};

exports.show413Error = function (resp) {
    if (settings.httpMsgFormat === "HTML") {
        resp.writeHead(413, "Entity too large", { "Content-Type": "text/html" });
        resp.write("<html><head><title>413</title></head><body>413: Entity too large</body></html>");
    }
    else {
        resp.writeHead(413, { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Entity too large" }));
    }
    resp.end();
};

exports.show200 = function (req, resp) {
    resp.writeHead(200, { "Content-Type": "application/json" });
    resp.end();
}


exports.showHome = function (req, resp) {
   
    if (settings.httpMsgFormat === "HTML") {
        resp.writeHead(200, { "Content-Type": "application/html" });
        resp.write("<html><head><title>HOME</title></head><body>Valid endpoints: " +
            "<br> /employee - GET - Get employee List." +
            "<br> /employee/{id} - GET - Get employee by Id." +
            "</body ></html > ");
    }
    else {
        resp.writeHead(200, { "Content-Type": "application/json" });
        resp.write(JSON.stringify({
            data: [
                { url: "/employee", operation: "GET", description: "Get employee list" },
                { url: "/employee/{id}", operation: "GET", description: "Get employee by employee id" }
            ]
        }));
    }
    resp.end();
}

