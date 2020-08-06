var accountBalances = {
    "123456": 100.01,
    "654321": 200.17,
    "567890": 13.45,
};

var users = {
    "l": {
        "userId": "l",
        "accounts": ["123456", "654321", "567890"],
    }
}

function generateAccountSummary(userId){
    let summary = ""
    users[userId].accounts.map((account) => {
        summary += account + ": $" + this.accountBalances[account]  + "\n"
    });
    return summary
}

var histories = {
    "123456": {
        "content": "Deposited  $70.54 at: Tue Jul 28 14:49:24 MDT 2020\nWithdrew  $80.41 at: Tue Jul 28 14:49:37 MDT 2020\nDeposited  $100.12 at: Wed Jul 29 09:40:46 MDT 2020\nDeposited  $150.12 at: Wed Jul 29 09:41:01 MDT 2020\n"
    },
    "654321": {
        "content": "Just a debug message\nLorem ipsum dolor sit amet\n"
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
        "/atm-api/summary/{userId}": {
            "GET": function (params) {
                var summary = generateAccountSummary(params.userId);
                if (summary)
                    success({ "content": generateAccountSummary(params.userId) });
                else
                    error(404);
            }
        },
        "/atm-api/history/{accountNumber}": {
            "GET": function (params) {
                var history = histories[params.accountNumber];
                if (history)
                    success({ "content": history });
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