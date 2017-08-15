var http = require("http");
var url = require("url");
var config = require("./config").config;

var port = process.env.PORT || 8124;

function start() {
    function onRequest(request, response) {
        var parsedRequest = url.parse(request.url);
        var pathName = url.parse(request.url).pathname;
        var postData = "";

        if (request.method === 'POST') {
            request.on('data', function (chunk) {
                postData += chunk.toString();
            });
        } else {
            request.on('data', function(chunk) {});
        }

        request.on('end', function () {
            var chaos = null;
            for (var i = 0; i < config.Chaos.length; i++) {
                if (pathName.toLocaleLowerCase() === config.Chaos[i].path.toLocaleLowerCase()) {
                    console.log("Found match in chaos settings for request path [" + pathName + "] | [" + config.Chaos[i].path + "]");
                    chaos = config.Chaos[i];
                    break;
                }
            }
            if (chaos) {
                chaos.action(response);
            } else {
                response.writeHead(200, {"Content-Type":"text/plain"});
                response.write("Method: " + request.method + "\n");
                if (request.method !== 'POST') {
                    response.write("Query string: " + (parsedRequest.query || "None") + "\n");
                }

                response.write("Headers: \n");
                for (header in request.headers) {
                    response.write("\t" + header + "=" + request.headers[header] + "\n");
                }
                if (request.method === 'POST') {
                    response.write("POST data:\n");
                    response.write("\t" + postData + "\n");
                }
                response.end();
            }
        });
    }

    http.createServer(onRequest).listen(port, () => {
        console.log("Server has started.");
    });
}

start();
