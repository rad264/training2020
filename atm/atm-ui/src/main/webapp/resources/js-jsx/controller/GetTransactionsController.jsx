class GetTransactionsController extends React.Component {
    constructor(props) {
        super(props);
        this.state = new GetTransactionsModel(props.accountNumber);
        this.getTransactions = this.getTransactions.bind(this);
    }

    componentDidMount() {
        this.getTransactions();
    }

    componentWillReceiveProps(nextProps) {
        this.setState(new GetTransactionsModel(nextProps.accountNumber), () => {
            this.getTransactions();
        });
    }

    getTransactions() {
        const userId = this.props.userId;
        const accountNumber = this.state.accountNumber;
        let handleResponse = (status, transactions) => this.setState({responseStatus: status, transactions: transactions});
        handleResponse = handleResponse.bind(this);
        $.ajax({
            url: "/atm-api/users/" + userId + "/accounts/" + accountNumber + "/transactions",
            type: "GET",
            contentType: "application/json",
            success: function(response) {
                handleResponse(200, response.reverse());
            },
            error: function(xhr, status, error) {
                handleResponse(xhr.status);
            }
        });
    }
    render() {
        return (
            <TransactionsCard transactions={this.state.transactions} statusCode={this.state.responseStatus}/>
        );
    }
}
