new Vue({
    el: "#app",
    data: {
      loggedIn: false,
      error: "none",
      username: null,
      accounts: null,
      accountSelected: null,
      showResultsArea: {
          type: null,
          data: null,
      },
      amount: null,
      destinationAccount: null,
      message: null
    },
    methods: {
        successFunction: function(message) {
            this.showResultsArea.type = "success";
            this.message = message;
        },
        errorFunction: function(message) {
            this.showResultsArea.type = "error";
            this.message = message;
        },
        login: function() {
            var user = controller.getUser(this.username); 
            if (user) { 
                this.showResultsArea.type = "";
                this.loggedIn = true;
                this.accounts = controller.getAllUserAccounts(user.userId); 
            } else { 
                this.errorFunction("User not found");
                this.username = null;
            }
        },
        createAccount: function() {
            var newAccount = controller.createAccount(this.username); 
            if (newAccount === null) this.errorFunction("Internal server error, try refreshing the page");
            this.accounts.push(newAccount);
        },
        getTransactionHistory: function() {
            this.showResultsArea.type = "history";
            this.showResultsArea.data = controller.getTransactionHistory(this.accountSelected.accountNumber); 
        },
        deposit: function() {
            if (amountNotValid(this.amount)) {
                this.errorFunction("Deposit error; check numeral validity");
                return;
            }
            if (controller.deposit(this.accountSelected.accountNumber, this.amount)) {
                this.successFunction("Successfully deposited $" + this.amount +" to " + this.accountSelected.accountNumber);
                this.accountSelected.balance = this.accountSelected.balance + parseFloat(this.amount)
            } else {
                this.errorFunction("Internal server error; try logging out and re-login");
            }
        },
        withdraw: function() {
            if (amountNotValid(this.amount)) {
                this.errorFunction("Withdraw error; check numeral validity");
                return;
            }
            var withdrawSuccess = controller.withdraw(this.accountSelected.accountNumber, this.amount)
            if (withdrawSuccess === "success") {
                this.successFunction("Successfully withdrew $" + this.amount +" from " + this.accountSelected.accountNumber);
                this.accountSelected.balance = this.accountSelected.balance - parseFloat(this.amount)
            } else if (withdrawSuccess === "insufficient") {
                this.errorFunction("Insufficient balance");
            } else {
                this.errorFunction("Internal server error; try logging out and re-login");
            }
        },
        transfer: function() {
            if (amountNotValid(this.amount)) {
                this.errorFunction("Withdraw from home account error; check numeral validity");
                return;
            }
            if (this.destinationAccount === this.accountSelected.accountNumber) {
                this.errorFunction("Destination account cannot be the same as home account");
            }
            var transferSuccess = controller.transfer(this.accountSelected.accountNumber, this.destinationAccount, this.amount);
            if (transferSuccess === "success") {
                this.successFunction("Successfully transferred $" + this.amount +" to " + this.destinationAccount);
                this.accountSelected.balance = this.accountSelected.balance - parseFloat(this.amount);
            } else if (transferSuccess === "insufficient") {
                this.errorFunction("Insufficient balance from home account");
            } else if (transferSuccess === "notfound") {
                this.errorFunction("Destination account not found");
            } else {
                this.errorFunction("Internal server error; try logging out and re-login");
            }
        },
        back: function() {
            this.message = null;
            this.amount = null;
            this.showResultsArea = {
                type: null,
                data: null,
            };
            this.accountSelected = null;
        },
        logout: function() {
            this.amount = null;
            this.showResultsArea = {
                type: null,
                data: null,
            };
            this.accountSelected = null;
            this.accounts = null;
            this.username = null;
            this.error = null;
            this.loggedIn = false;
        }
    }
});

function amountNotValid(amount) { // true if not valid
    return (isNaN(amount) || (amount <= 0) || amount === null);
}
