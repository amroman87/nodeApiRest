var http = require("http");
var emp = require("../controllers/employee");
var settings = require("../Settings");


http.createServer(function (request, response) {   
    console.log(request.method);
    switch (request.method) {
        case "GET":           
            if (request.url === "/") {
                respose.end();
            }
            else if (request.url === "/employee")
            {
                emp.getList(request, response);
            }
            else {
                response.end();
            }
            break;
        case "POST":
            response.end();
            break;
        case "PUT":
            break;
        case "DELETE":
            break
        default:
            break;
    }
}).listen(settings.serverPort, function () {
        console.log("Starterd listening at: " + settings.serverPort);
    });