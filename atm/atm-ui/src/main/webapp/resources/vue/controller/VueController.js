var base_url = "http://localhost:8080/atm-api";
var controller = {
    getUser: function(userId) {
        var result = null;
        $.ajax({
            type: "GET",
            url: base_url + '/users/' + userId,
            dataType: 'json',
            data: {},
            async: false,
            error: function(xhr, error){
                console.debug(xhr); 
                console.debug(error);
            },
            success: function(response) {
                result = response;
            }
        });
        return result;
    },
    getAccount: function(accountNumber) {
        var result = null;
        $.ajax({
            type: "GET",
            url: base_url + "/accounts/" + accountNumber,
            dataType: 'json',
            data: {},
            async: false,
            success: function(response) {
                result = response;
            },
            error: function(xhr, error) {
                console.debug(xhr);
                console.debug(error);
            }
        });
        return result;
    },
    getAllUserAccounts: function(userId) {
        var result = [];
        var user = this.getUser(userId);
        if (user) {
            for (account of user.accounts) {
                var pushAccount = this.getAccount(account);
                if (pushAccount) result.push(pushAccount);
            }
            return result;
        }
        return null;
    },
    createAccount: function(userId) {
        var result = null;
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            url: base_url + "/accounts",
            data: { "userId": userId },
            async: false,
            success: function(response) {
                result = response;
            },
            error: function(xhr, error) {
                console.debug(xhr);
                console.debug(error);
            }
        });
        return result;
    },
    getTransactionHistory: function(accountNumber) {
        var result = null;
        var resultArray = [];
        $.ajax({
            headers: {
                'Accept': 'application/json'
            },
            type: "GET",
            url: base_url + "/accounts/" + accountNumber + "/transactions",
            data: {},
            async: false,
            success: function(response) {
                result = response;
            },
            error: function(xhr, error) { 
                console.debug(xhr);
                console.debug(error);
            }
        });
        if (result === null) return result;
        for (var i = 1; i <= Object.keys(result).length; i++) {
            resultArray.push(result["log" + i.toString()]);
        }
        return resultArray;
    },
    deposit: function(accountNumber, amount) {
        var result = null;
        $.ajax({
            headers: {
                'Content-Type': 'application/json'
            },
            type: "POST",
            url: base_url + "/accounts/" + accountNumber + "/deposit",
            data: { "amount": amount },
            async: false,
            success: function() {
                result = true;
            },
            error: function(xhr, error) {
                console.debug(xhr);
                console.debug(error);
                result = false;
            }
        });
        return result;
    },
    withdraw: function(accountNumber, amount) {
        var result = null;
        $.ajax({
            headers: {
                'Content-Type': 'application/json'
            },
            type: "POST",
            url: base_url + "/accounts/" + accountNumber + "/withdraw",
            data: { "amount": amount },
            async: false,
            success: function() {
                result = "success";
            },
            error: function(xhr, error) {
                console.debug(xhr);
                console.debug(error);
                if (xhr.status === 400) result = "insufficient";
            }
        });
        return result;
    },
    transfer: function(homeAccount, destinationAccount, amount) {
        var result = "notfound";
        $.ajax({
            headers: {
                'Content-Type': 'application/json'
            },
            type: "POST",
            url: base_url + "/transfer",
            data: JSON.stringify({ 
                "homeAccount": homeAccount,
                "destinationAccount": destinationAccount,
                "amount": amount 
            }),
            async: false,
            success: function() {
                result = "success";
            },
            error: function(xhr, error) {
                console.debug(xhr);
                console.debug(error);
                if (xhr.status === 400) result = "insufficient";
            }
        });
        console.log(result);
        return result;
    }
};