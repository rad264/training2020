var users = {
    "rdelaney": ["123456", "999999"],
    "pkusuma": ["222222"]
};
var accountBalances = {
    "123456": 100.00,
    "999999": 10,
    "222222": 50
};
var transactionHistory = {
    "log1": {
        time: "January 13, 2020 11:14 AM",
        transaction: "deposit",
        amount: "40"
    },
    "log2": {
        time: "January 13, 2020 11:16 AM",
        transaction: "withdraw",
        amount: "10"
    },
    "log3": {
        time: "January 13, 2020 11:20 AM",
        transaction: "deposit",
        amount: "20"
    },
};
$.ajax = function (config) {
    var resources = {
        "/atm-api/users/{userId}": {
            "GET": function (params) {
                var accounts = users[params.userId];
                if (accounts) {
                    success({ "userId": params.userId, "accounts": accounts });
                } else {
                    error(404);
                }
            }
        },
        "/atm-api/users/{userId}/accounts": {
            "GET": function (params) {
                var toSend = [];
                var accounts = users[params.userId];
                for (account of accounts) {
                    var jsonPushed = {
                        "accountNumber": account,
                        "balance": accountBalances[account],
                    };
                    toSend = toSend + [jsonPushed];
                }
                if (toSend) {
                    success({ "data": toSend });
                } else {
                    error(404);
                }
            }
        },
        "/atm-api/accounts/{accountNumber}": {
            "GET": function (params) {
                var balance = accountBalances[params.accountNumber];
                if (balance)
                    success({ "accountNumber": params.accountNumber, "balance": balance });
                else
                    error(404);
            },
            "PUT": function(params) {
            	error(500);
            }
        },
        "/atm-api/accounts": {
            "POST": function(_, requestBody) {
                if (users[requestBody.userId]) {
                    users[requestBody.userId] = users[requestBody.userId].push("234567");
                    accountBalances["234567"] = 0;
                    success({ "accountNumber": "234567", "balance": 0 });
                } else {
                    error(404);
                }
            }
        },
        "/atm-api/accounts/{accountNumber}/transactions": {
            "GET": function (params) {
                if (transactionHistory)
                success(transactionHistory);
                else
                    error(404);
                    
            }
        },
        "/atm-api/accounts/{accountNumber}/deposit": {
            "POST": function (params, requestBody) {
                if (accountBalances[params.accountNumber]) {
                    accountBalances[params.accountNumber] += requestBody.amount;
                    success();
                } else {
                    error(404);
                }
            }
        },
        "/atm-api/accounts/{accountNumber}/withdraw": {
            "POST": function (params, requestBody) {
                if (accountBalances[params.accountNumber]) {
                    if (accountBalances[params.accountNumber] < requestBody.amount) {
                        error(400);
                    } else {
                        accountBalances[params.accountNumber] -= requestBody.amount;
                        success();
                    }
                } else {
                    error(404);
                }
            }
        },
        "/atm-api/transfer": {
            "POST": function (params, requestBody) {
                if (accountBalances[requestBody.destinationAccount] === undefined) {
                    error(404);
                } else {
                    if (accountBalances[requestBody.homeAccount]) {
                        if (accountBalances[requestBody.homeAccount] < requestBody.amount) {
                            error(400);
                        } else {
                            accountBalances[requestBody.homeAccount] -= requestBody.amount;
                            accountBalances[requestBody.destinationAccount] += requestBody.amount;
                            success();
                        }
                    } else {
                        error(404);
                    }
                }
            }
        }
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