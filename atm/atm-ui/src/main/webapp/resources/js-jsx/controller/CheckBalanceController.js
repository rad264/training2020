class CheckBalanceController {
    static init() {
        new CheckBalanceController(new TextFieldData(), new CheckBalanceForm());
    }
    constructor(model, view) {
        this.model = model;
        this.view = view;
        view.setAccountNumber(model.value);
        view.accountNumber.addEventListener("change", () => model.value = view.getAccountNumber());
        view.accountNumber.addEventListener("keydown", () => view.displayBalance(""));
        view.submitButton.addEventListener("click", function () {
            $.ajax({
                url: "/atm-api/accounts/" + model.value,
                type: "GET",
                success: function (response) {
                    view.displayBalance(response.balance);
                },
                error: function (xhr, status, error) {
                    view.displayError(xhr.status == 404 ? "Account Not Found" : "Unexpected Error");
                }
            });
        });
    }
}