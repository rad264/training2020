var userAccounts = {
    "jwong": [{
            "accountNumber": "123456",
            "balance": 100.00,
            "transactions": [
                "Date: Wed Aug 05 14:55:26 EDT 2020; Type: Deposit; Amount: 100.0;"
            ]
        },
        {
            "accountNumber": "111222",
            "balance": 150.00,
            "transactions": [
                "Date: Wed Aug 05 14:55:26 EDT 2020; Type: Deposit; Amount: 100.0;"
            ]
        },
    ],
};
var userAccountsNumbers = {
    "jwong": ["123456", "111222"]
};
var accountBalances = {
    "123456": 100.00,
    "111222": 150.00,
};
var accountTransactions = {
    "123456": [{
            "date": 1596653726310,
            "type": "Deposit",
            "amount": 100
        },
        {
            "date": 1596653726310,
            "type": "Withdraw",
            "amount": 50
        },
    ],
    "111222": [{
            "date": 1596653726310,
            "type": "Deposit",
            "amount": 100
        },
        {
            "date": 1596653726310,
            "type": "Withdraw",
            "amount": 50
        },
    ],
};
$.ajax = function(config) {
    var resources = {
        "/atm-api/users/{userId}": {
            "GET": function(params) {
                var accountNumbers = userAccountsNumbers[params.userId];
                if (accountNumbers)
                    success({
                        "accounts": accountNumbers
                    });
                else
                    error(401);
            }
        },
        "/atm-api/users/{userId}/accounts": {
            "GET": function(params) {
                var accounts = userAccounts[params.userId];
                if (accounts)
                    success({
                        "accounts": accounts
                    });
                else
                    error(402);
            }
        },
        "/atm-api/accounts/{accountNumber}": {
            "GET": function(params) {
                var balance = accountBalances[params.accountNumber];
                if (balance)
                    success({
                        "balance": balance
                    });
                else
                    error(404);
            },
            "PUT": function(params) {
                error(500);
            }
        },
        "/atm-api/accounts/{accountNumber}/transactions": {
            "GET": function(params) {
                var transactions = accountTransactions[params.accountNumber];
                if (transactions)
                    success({
                        "transactions": transactions
                    });
                else
                    error(403);
            },
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
