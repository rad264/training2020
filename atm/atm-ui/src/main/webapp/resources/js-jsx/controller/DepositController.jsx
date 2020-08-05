class DepositController extends React.Component {
    constructor(props) {
        super(props);
        this.state = new DepositModel();
        this.onChange = this.onChange.bind(this);
        this.deposit = this.deposit.bind(this);
    }

    onChange(event) {
        if(event.target.name === "accountNumber"){
            this.setState(new DepositModel(event.target.value,this.state.depositAmount));
        }
        if(event.target.name === "depositAmount"){
            this.setState(new DepositModel(this.state.accountNumber,event.target.value));
        }

    }

    deposit() {
        const accountNumber = this.state.accountNumber;
        const depositAmount = this.state.depositAmount;

        let handleResponse = (status) => this.setState({ responseStatus: status })
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
            </div>
        );
    }

}

// ReactDOM.render(<DepositController />, document.getElementById("deposit-box"))