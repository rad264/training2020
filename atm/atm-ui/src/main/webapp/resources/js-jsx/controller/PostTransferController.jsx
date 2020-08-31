class PostTransferController extends React.Component {
    state = new PostTransferModel();

    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        });
    };

    postTransfer = (e) => {
        if (
            !this.state.fromAccountNumber ||
            !this.state.toAccountNumber ||
            !this.state.transferAmount
        )
            return false;
        e.preventDefault();
        const userId = this.props.userId;
        const fromAccountNumber = this.state.fromAccountNumber;
        const toAccountNumber = this.state.toAccountNumber;
        const transferAmount = this.state.transferAmount;
        let handleResponse = (status, response) => {
            this.setState({ responseStatus: status });
            if (status == 200) this.props.updateDashboard();
        };
        handleResponse = handleResponse.bind(this);
        if (this.state.fromAccountNumber == this.state.toAccountNumber) {
            handleResponse("Same Account");
            return false;
        }
        $.ajax({
            url: "/atm-api/accounts/transfers/",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                fromAccountNumber: fromAccountNumber,
                toAccountNumber: toAccountNumber,
                transferAmount: transferAmount,
            }),
            success: function (response) {
                handleResponse(200, response);
            },
            error: function (xhr, status, error) {
                handleResponse(xhr.status);
            },
        });
    };

    render() {
        return (
            <TransferCard
                userId={this.props.userId}
                toAccountNumber={this.state.toAccountNumber}
                fromAccountNumber={this.state.fromAccountNumber}
                onChange={this.onChange}
                onClick={this.postTransfer}
                statusCode={this.state.responseStatus}
                transferAmount={this.state.transferAmount}
            />
        );
    }
}
