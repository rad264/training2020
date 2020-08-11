class PostTransferController extends React.Component {
    constructor(props) {
        super(props);
        this.state = new PostTransferModel();
        this.onChange = this.onChange.bind(this);
        this.postWithdraw = this.postTransfer.bind(this);
    }
    onChange(event) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }
    postTransfer(e) {
        e.preventDefault();
        const fromAccountNumber = this.state.fromAccountNumber;
        const toAccountNumber = this.state.toAccountNumber;
        const transferAmount = this.state.transferAmount;
        let handleResponse = (status, fromBalance, toBalance) => this.setState({responseStatus: status, fromBalance: fromBalance, toBalance: toBalance});
        handleResponse = handleResponse.bind(this);
        $.ajax({
            url: "/atm-api/accounts/" + fromAccountNumber + "/transfer",
            type: "POST",
            data: {
                toAccountNumber: toAccountNumber,
                transferAmount: parseFloat(transferAmount)
            },
            success: function(response) {
                handleResponse(200, response.fromBalance, response.toBalance);
            },
            error: function(xhr, status, error) {
                handleResponse(xhr.status);
            }
        });
    }
    render() {
        return (<TransferCard toAccountNumber={this.state.toAccountNumber} fromAccountNumber={this.state.fromAccountNumber} onChange={this.onChange} onClick={this.postWithdraw} statusCode={this.state.responseStatus} transferAmount={this.state.transferAmount}/>);
    }
}
