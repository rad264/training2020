class CheckBalanceController extends React.Component {
    state = new CheckBalanceModel();

    onChange = (e) => {
        this.setState(new CheckBalanceModel(e.target.value));
    };
    getBalance = (e) => {
        e.preventDefault();
        const userId = this.props.userId;
        const accountNumber = this.state.accountNumber;
        let handleResponse = (status, balance) =>
        this.setState({
            responseStatus: status,
            balance: Number.parseFloat(balance).toFixed(2),
        });
        handleResponse = handleResponse.bind(this);
        $.ajax({
            url: "/atm-api/accounts/" + accountNumber,
            type: "GET",
            success: function (response) {
                handleResponse(200, response.balance);
            },
            error: function (xhr, status, error) {
                handleResponse(xhr.status);
            },
        });
    };
    render() {
        return (
            <div>
                <CheckBalanceForm
                    accountNumber={this.state.accountNumber}
                    onChange={this.onChange}
                    onClick={this.getBalance}
                />
                <Balance
                    statusCode={this.state.responseStatus}
                    balance={this.state.balance}
                />
            </div>
        );
    }
}
