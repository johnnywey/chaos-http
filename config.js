var Settings = Settings || {};

Settings.Chaos = [
    {
        name:"HttpTimeout",
        path:"/timeout",
        timeoutLengthInSeconds:60,
        action:function (response) {
            console.log("=========== " + this.name + " ===========");
            console.log("Performing simulated timeout of [" + this.timeoutLengthInSeconds + "]");
            setTimeout(function () {
                response.write("Timed out");
								response.writeHead(200);
								response.end();
            }, this.timeoutLengthInSeconds * 1000)
        }
    },
    {
        name:"ResourceNotFound",
        path:"/notfound",
        action:function (response) {
            console.log("=========== " + this.name + " ===========");
            console.log("Performing simulated 404");
            response.writeHead(404);
            response.end();
        }
    },
    {
        name:"AccessDenied",
        path:"/accessdenied",
        action:function (response) {
            console.log("=========== " + this.name + " ===========");
            console.log("Performing simulated 403");
            response.writeHead(403);
            response.end();
        }
    },
		{
        name:"RandomFailure",
        path:"/randomfailure",
        action:function (response) {
            console.log("=========== " + this.name + " ===========");
            console.log("Performing simulated random error");
						var responseCode = 200;
						if(Date.now() % 10 == 0) {
							responseCode = 404;
						}
						response.writeHead(responseCode);
            response.end();
        }
    }
];

exports.config = Settings;
