class GetSummaryController extends React.Component {
    constructor(props) {
        super(props);
        this.state = new GetSummaryModel(props.accountNumber);
    }

    componentDidMount() {
        this.getSummary();
    }

    componentWillReceiveProps(nextProps) {
        this.setState(new GetSummaryModel(nextProps.accountNumber), () => {
            this.getSummary();
        });
    }

    getSummary = () => {
        const userId = this.props.userId;
        const accountNumber = this.state.accountNumber;
        let handleResponse = (status, response) =>
            this.setState({
                responseStatus: status,
                accountType: response ? response.accountType : "",
                balance: response
                    ? Number.parseFloat(response.balance).toFixed(2)
                    : (0).toFixed(2),
            });
        handleResponse = handleResponse.bind(this);
        $.ajax({
            url: "/atm-api/accounts/" + accountNumber,
            type: "GET",
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
            <AccountSummary
                accountNumber={this.state.accountNumber}
                statusCode={this.state.responseStatus}
                accountType={this.state.accountType}
                balance={this.state.balance}
            />
        );
    }
}
