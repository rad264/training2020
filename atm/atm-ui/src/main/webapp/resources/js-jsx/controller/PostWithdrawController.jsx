class PostWithdrawController extends React.Component {
    constructor(props) {
        super(props);
        this.state = new PostWithdrawModel();
        this.onChange = this.onChange.bind(this);
        this.postWithdraw = this.postWithdraw.bind(this);
    }
    onChange(event) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }
    postWithdraw(e) {
        if (!this.state.accountNumber || !this.state.withdrawAmount)
            return false;
        e.preventDefault();
        const userId = this.props.userId;
        const accountNumber = this.state.accountNumber;
        const withdrawAmount = this.state.withdrawAmount;
        let handleResponse = (status, balance) => {
            this.setState({responseStatus: status, balance: balance});
            if (status == 200) this.props.updateDashboard();
        }
        handleResponse = handleResponse.bind(this);
        $.ajax({
            url: "/atm-api/accounts/" + accountNumber + "/withdraws",
            type: "POST",
            contentType: "application/json",
            data: withdrawAmount,
            success: function(response) {
                handleResponse(200, response.balance);
            },
            error: function(xhr, status, error) {
                handleResponse(xhr.status);
            }
        });
    }
    render() {
        return (<WithdrawCard userId={this.props.userId} accountNumber={this.state.accountNumber} onChange={this.onChange} onClick={this.postWithdraw} statusCode={this.state.responseStatus} withdrawAmount={this.state.withdrawAmount}/>);
    }
}
