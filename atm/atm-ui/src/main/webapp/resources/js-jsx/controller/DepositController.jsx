class DepositController extends React.Component {
    constructor(props) {
        super(props);
        this.state = new DepositModel();
        this.onChange = this.onChange.bind(this);
        this.deposit = this.deposit.bind(this);
        this.confirmation;
    }

    onChange(event) {
        if (event.target.name === "accountNumber") {
            this.setState(new DepositModel(event.target.value, this.state.depositAmount));
        }
        if (event.target.name === "depositAmount") {
            this.setState(new DepositModel(this.state.accountNumber, event.target.value));
        }

    }

    clearForm(){
        this.setState( { accountNumber: "", depositAmount: "" })
        this.initialFocus();
    }

    componentDidMount(){
        this.initialFocus();
    }

    initialFocus(){
        $("#account-input").focus()
    }

    deposit() {
        const accountNumber = this.state.accountNumber;
        const depositAmount = this.state.depositAmount;

        let handleResponse = (status) => {
            this.setState({ responseStatus: status })
            this.confirmation = (
                <ConfirmationMessage message={"Deposited $" + depositAmount + " to " + accountNumber} />
            )
            this.clearForm();
        }
        handleResponse = handleResponse.bind(this);

        $.ajax({
            url: "/atm-api/accounts/" + accountNumber + "/deposit/" + depositAmount + "/",
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
            <div class="deposit-form">
                <DepositForm accountNumber={this.state.accountNumber} depositAmount={this.state.depositAmount} onChange={this.onChange} onClick={this.deposit} />
                {this.confirmation}
            </div>
        );
    }

}

// ReactDOM.render(<DepositController />, document.getElementById("deposit-box"))