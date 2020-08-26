class GetSummaryController extends React.Component {
    constructor(props) {
        super(props);
        this.state = new GetSummaryModel(props.accountNumber);
        this.getSummary = this.getSummary.bind(this);
    }

    componentDidMount() {
        this.getSummary();
    }

    componentWillReceiveProps(nextProps) {
        this.setState(new GetSummaryModel(nextProps.accountNumber), () => {
            this.getSummary();
        });
    }

    getSummary() {
        const accountNumber = this.state.accountNumber;
        let handleResponse = (status, balance) => this.setState({responseStatus: status, balance: balance ? Number.parseFloat(balance).toFixed(2) : (0).toFixed(2)});
        handleResponse = handleResponse.bind(this);
        $.ajax({
            url: "/atm-api/accounts/" + accountNumber,
            type: "GET",
            success: function(response) {
                handleResponse(200, response.balance);
            },
            error: function(xhr, status, error) {
                handleResponse(xhr.status);
            }
        });
    }
    render() {
        return (<AccountSummary accountNumber={this.state.accountNumber} statusCode={this.state.responseStatus} balance={this.state.balance}/>);
    }
}
