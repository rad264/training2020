class WithdrawController extends React.Component {
    constructor(props) {
        super(props);
        this.state = new WithdrawModel();
        this.onChange = this.onChange.bind(this);
        this.withdraw = this.withdraw.bind(this);
        this.confirmation;
    }

    onChange(event) {
        if (event.target.name === "accountNumber") {
            this.setState(new WithdrawModel(event.target.value, this.state.withdrawAmount));
        }
        if (event.target.name === "withdrawAmount") {
            this.setState(new WithdrawModel(this.state.accountNumber, event.target.value));
        }

    }

    clearForm(){
        this.setState( { accountNumber: "", withdrawAmount: "" })
        this.initialFocus();
    }

    componentDidMount(){
        this.initialFocus();
    }

    initialFocus(){
        $("#account-input").focus()
    }

    withdraw() {
        const accountNumber = this.state.accountNumber;
        const withdrawAmount = this.state.withdrawAmount;

        let handleResponse = (status) => {
            this.setState({ responseStatus: status })
            this.confirmation = (
                <ConfirmationMessage message={"Withdrew $" + withdrawAmount + " from " + accountNumber} />
            )
            this.clearForm();
        }
        handleResponse = handleResponse.bind(this);

        $.ajax({
            url: "/atm-api/accounts/" + accountNumber + "/withdraw/" + withdrawAmount + "/",
            type: "POST",
            success: function (response) {
                handleResponse(200, response);
            },
            error: function (xhr, status, error) {
                handleResponse(xhr.status);
            }
        });
    }

    render() {
        return (
            <div class="withdraw-form">
                <WithdrawForm accountNumber={this.state.accountNumber} withdrawAmount={this.state.withdrawAmount} onChange={this.onChange} onClick={this.withdraw} />
                {this.confirmation}
            </div>
        );
    }

}

// ReactDOM.render(<WithdrawController />, document.getElementById("withdraw-box"))