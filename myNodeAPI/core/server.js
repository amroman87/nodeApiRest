var http = require("http");
var emp = require("../controllers/employee");
var settings = require("../Settings");
var httpMsg = require("../core/httpMsg");

http.createServer(function (request, response) {   
    console.log(request.method);
    switch (request.method) {
        case "GET":           
            if (request.url === "/") {
                httpMsg.showHome(request, response);
            }
            else if (request.url === "/employee")
            {
                emp.getList(request, response);
            }
            else
            {
                var empPat = "[0-9]+";
                var empPatObj = new RegExp("/employee/" + empPat);
                if (empPatObj.test(request.url)) {
                    empPatObj = new RegExp(empPat);
                    var id = empPatObj.exec(request.url);                    
                        emp.get(request, response, id);
                    
                }
                else {
                    httpMsg.show404Error(response);
                }
            }
            break;
        case "POST":
            if (request.url == "/employee") {
                var reqBody = '';
                request.on("data", function (data) {
                    reqBody += data;
                    if (data.length > 1e7) //10 MB
                    {
                        httpMsg.show413Error(response);
                    }
                });
                request.on("end", function (data) {
                    emp.add(request, response, reqBody);
                });
            }
            else
            {
                httpMsg.show404Error(response);
            }

            break;
        case "PUT":
            if (request.url == "/employee") {
                var reqBody = '';
                request.on("data", function (data) {
                    reqBody += data;
                    if (data.length > 1e7) //10 MB
                    {
                        httpMsg.show413Error(response);
                    }
                });
                request.on("end", function (data) {
                    emp.update(request, response, reqBody);
                });
            }
            else {
                httpMsg.show404Error(response);
            }
            break;
        case "DELETE":
            if (request.url == "/employee") {
                httpMsg.show404Error(response); //Not found for delete all employee
            }
            else {
                var empPat = "[0-9]+";
                var empPatObj = new RegExp("/employee/" + empPat);
                if (empPatObj.test(request.url)) {
                    empPatObj = new RegExp(empPat);
                    var id = empPatObj.exec(request.url);
                    emp.delete(request, response, id);

                }
                else {
                    httpMsg.show404Error(response);
                }
            }
            break
        default:
            httpMsg.show405Error(response);
            break;
    }
}).listen(settings.serverPort, function () {
        console.log("Starterd listening at: " + settings.serverPort);
    });