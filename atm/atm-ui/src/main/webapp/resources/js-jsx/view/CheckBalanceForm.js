class CheckBalanceForm {
    constructor() {
        this.accountNumber = document.getElementById("accountNumber");
        this.submitButton = document.getElementById("checkBalance");
        this.balance = document.getElementById("balance");
    }
    getAccountNumber() {
        return this.accountNumber.value;
    }
    setAccountNumber(value) {
        this.accountNumber.value = value;
    }
    displayBalance(balance) {
        this.balance.innerHTML = balance;
        this.balance.style = "color: green";
    }
    displayError(error) {
        this.balance.innerHTML = error;
        this.balance.style = "color: red";
    }
}