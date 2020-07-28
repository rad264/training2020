var accountBalances = {
    "123456": 100.00
};
$.ajax = function (config) {
    var resources = {
        "/atm-api/users/{userId}": {
            "GET": function (params) {
            	error(500);
            }
        },
        "/atm-api/accounts/{accountNumber}": {
            "GET": function (params) {
                const balance = accountBalances[params.accountNumber];
                if (balance)
                    success({ "balance": balance });
                else
                    error(404);
            },
            "PUT": function(params) {
            	error(500);
            }
        }
    }
    for (let resourcePath in resources) {
        const urlPattern = "^" + resourcePath.replace(/{.*}/, "[^/]*") + "$";
        if (new RegExp(urlPattern).exec(config.url)) {
            const operations = resources[resourcePath];
            if (operations[config.type]) {
                const params = {};
                const staticUrlParts = resourcePath.split("/");
                const urlParts = config.url.split("/");
                for (let i in staticUrlParts) {
                    if (staticUrlParts[i].match(/^\{[^\/]*\}$/)) {
                        const paramName = staticUrlParts[i].substring(1, staticUrlParts[i].length - 1);
                        params[paramName] = urlParts[i];
                    }
                }
                operations[config.type](params, config.data);
            } else {
                error(405);
            }
            return;
        }
    }
    error(404);

    function success(result) {
        config.success(result);
    }
    function error(code) {
        config.error({
            status: code
        })
    }
};