function CheckBalanceForm() {
    this.accountNumber = document.getElementById("accountNumber");
    this.submitButton = document.getElementById("checkBalance");
    this.balance = document.getElementById("balance");
}

CheckBalanceForm.prototype = {
    getAccountNumber: function() {
        return this.accountNumber.value;
    },
    setAccountNumber: function(value) {
        this.accountNumber.value = value;
    },
    displayBalance: function(balance) {
        this.balance.innerHTML = balance;
        this.balance.style = "color: green";
    },
    displayError: function(error) {
        this.balance.innerHTML = error;
        this.balance.style = "color: red";
    }
}