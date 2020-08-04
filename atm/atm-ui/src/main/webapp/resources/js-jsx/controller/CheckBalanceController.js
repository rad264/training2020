function CheckBalanceController(model, view) {
    view.setAccountNumber(model.value);
    view.accountNumber.addEventListener("change", function() {
        model.value = view.getAccountNumber();
    });
    view.accountNumber.addEventListener("keydown", function() {
        view.displayBalance("");
    });
    view.submitButton.addEventListener("click", function() {
        $.ajax({
            url: "/atm-api/accounts/" + model.value,
            type: "GET",
            success: function(response) {
                view.displayBalance(response.balance);
            },
            error: function(xhr, status, error) {
                view.displayError(xhr.status == 404 ? "Account Not Found" : "Unexpected Error");
            }
        });
    })
}

CheckBalanceController.init = function() {
    new CheckBalanceController(new TextFieldData(), new CheckBalanceForm());
}