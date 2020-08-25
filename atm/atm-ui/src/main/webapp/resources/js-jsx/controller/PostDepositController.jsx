class PostDepositController extends React.Component {
    constructor(props) {
        super(props);
        this.state = new PostDepositModel();
        this.onChange = this.onChange.bind(this);
        this.postDeposit = this.postDeposit.bind(this);
    }
    onChange(event) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }
    postDeposit(e) {
        if (!this.state.accountNumber || !this.state.depositAmount)
            return false;
        e.preventDefault();
        const accountNumber = this.state.accountNumber;
        const depositAmount = this.state.depositAmount;
        let handleResponse = (status, balance) => {
            this.setState({responseStatus: status, balance: balance});
            if (status == 200)
                this.props.updateDashboard();
            }
        handleResponse = handleResponse.bind(this);
        $.ajax({
            url: "/atm-api/accounts/" + accountNumber + "/deposit",
            type: "POST",
            contentType: "application/json",
            data: depositAmount,
            success: function(response) {
                handleResponse(200, response.balance);
            },
            error: function(xhr, status, error) {
                handleResponse(xhr.status);
            }
        });
    }

    render() {
        return (<DepositCard userId={this.props.userId} accountNumber={this.state.accountNumber} onChange={this.onChange} onClick={this.postDeposit} statusCode={this.state.responseStatus} depositAmount={this.state.depositAmount}/>);
    }
}
