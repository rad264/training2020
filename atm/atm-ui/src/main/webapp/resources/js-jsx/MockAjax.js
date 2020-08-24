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
    "jsmith": [

    ]
};
var userAccountsNumbers = {
    "jwong": ["123456", "111222"],
    "jsmith": ["123123", "010101"],
};
var accountBalances = {
    "123456": 100.00,
    "111222": 150.00,
};
var accountTransactions = {
    "123456": [{
            "date": 1596653726310,
            "type": "Deposit",
            "amount": 150,
            "balance": 150.00
        },
        {
            "date": 1596653726310,
            "type": "Withdraw",
            "amount": 50.00,
            "balance": 100.00,
        },
    ],
    "111222": [{
            "date": 1596653726310,
            "type": "Deposit",
            "amount": 550,
            "balance": 550.00
        },
        {
            "date": 1596653726310,
            "type": "Withdraw",
            "amount": 400,
            "balance": 150.00
        },
    ],
};
$.ajax = function(config) {
    var resources = {
        "/atm-api/users/{userId}": {
            "GET": function(params) {
                var accountNumbers = userAccountsNumbers[params.userId];
                if (accountNumbers)
                    success(
                        accountNumbers
                    );
                else
                    error(404);
            }
        },
        "/atm-api/users/{userId}/accounts": {
            "GET": function(params) {
                var accounts = userAccounts[params.userId];
                if (accounts)
                    success(accounts);
                else
                    error(404);
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
            }
        },
        "/atm-api/accounts/{accountNumber}/deposit": {
            "POST": function(params, data) {
                var balance = accountBalances[params.accountNumber] + parseFloat(data);
                if (balance)
                    success({
                        "balance": balance
                    });
                else
                    error(404);
            }
        },
        "/atm-api/accounts/{accountNumber}/withdraw": {
            "POST": function(params, data) {
                var balance = accountBalances[params.accountNumber] - parseFloat(data);
                if (balance)
                    success({
                        "balance": balance
                    });
                else
                    error(404);
            }
        },
        "/atm-api/accounts/{fromAccountNumber}/transfer": {
            "POST": function(params, data) {
                var d = JSON.parse(data);
                var fromBalance = accountBalances[params.fromAccountNumber];
                var toBalance = accountBalances[d.toAccountNumber];

                if (fromBalance && toBalance)
                    success({
                        "fromBalance": fromBalance - d.transferAmount,
                        "toBalance": toBalance + d.transferAmount
                    });
                else
                    error(404);
            }
        },
        "/atm-api/accounts/create/": {
            "POST": function(params, data) {
                var d = JSON.parse(data);
                if (!(d.accountNumber in accountBalances))
                    success({
                        "createdAccountNumber": d.accountNumber
                    });
                else
                    error(403);
            }
        },
        "/atm-api/accounts/{accountNumber}/transactions": {
            "GET": function(params) {
                var transactions = accountTransactions[params.accountNumber];
                if (transactions)
                    success(transactions);
                else
                    error(404);
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
