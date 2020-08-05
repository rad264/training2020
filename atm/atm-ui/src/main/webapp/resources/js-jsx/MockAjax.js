var accountBalances = {
    "123456": 100.00,
    "654321": 200.17,
};

var users = {
    "l": {
        "userId": "l",
        "accounts": ["123456", "654321"],
    }
}

$.ajax = function (config) {
    var resources = {
        "/atm-api/users/{userId}": {
            "GET": function (params) {
                var user = users[params.userId];
                if (user)
                    success({ "user": user });
                else
                    error(404);
            }
        },
        "/atm-api/accounts/{accountNumber}": {
            "GET": function (params) {
                var balance = accountBalances[params.accountNumber];
                if (balance)
                    success({ "balance": balance });
                else
                    error(404);
            },
            "PUT": function (params) {
                error(500);
            }
        },
        "/atm-api/accounts/123456/deposit/{depositAmount}/": {
            "POST": function (params) {
                var accountNumber = "123456";
                accountBalances[accountNumber] += parseFloat(params.depositAmount);
                if (accountBalances[accountNumber])
                    success();
                else
                    error(404);
            }
        },
        "/atm-api/accounts/123456/withdraw/{withdrawAmount}/": {
            "POST": function (params) {
                var accountNumber = "123456";
                accountBalances[accountNumber] -= parseFloat(params.withdrawAmount);
                if (accountBalances[accountNumber])
                    success();
                else
                    error(404);
            }
        },
        "/atm-api/transfer/from/123456/to/654321/amount/{amount}/": {
            "POST": function (params) {
                var toTransferFrom = "123456";
                accountBalances[toTransferFrom] -= parseFloat(params.amount);
                var toTransferTo = "654321";
                accountBalances[toTransferTo] += parseFloat(params.amount);
                if (accountBalances[toTransferFrom] && accountBalances[toTransferTo])
                    success();
                else
                    error(404);
            }
        },
    }
    for (var resourcePath in resources) {
        var urlPattern = "^" + resourcePath.replace(/{.*}/, "[^/]*") + "$";
        if (new RegExp(urlPattern).exec(config.url)) {
            var operations = resources[resourcePath];
            if (operations[config.type]) {
                var params = {};
                var staticUrlParts = resourcePath.split("/");
                var urlParts = config.url.split("/");
                for (var i in staticUrlParts) {
                    if (staticUrlParts[i].match(/^\{[^\/]*\}$/)) {
                        var paramName = staticUrlParts[i].substring(1, staticUrlParts[i].length - 1);
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