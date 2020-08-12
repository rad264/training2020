class GetAccountsController extends React.Component {
    constructor(props) {
        super(props);
        this.state = new GetAccountsModel("jwong");
        this.getAccounts = this.getAccounts.bind(this);
    }

    componentDidMount() {
        this.getAccounts();
    }

    getAccounts() {
        const userId = "jwong";
        let handleResponse = (status, accounts) => this.setState({responseStatus: status, accounts: accounts});
        handleResponse = handleResponse.bind(this);
        $.ajax({
            url: "/atm-api/users/" + userId + "/accounts",
            type: "GET",
            contentType: "application/json",
            success: function(response) {
                handleResponse(200, response);
            },
            error: function(xhr, status, error) {
                handleResponse(xhr.status);
            }
        });
    }
    render() {
        return (<AccountGroup statusCode={this.state.responseStatus} onClick={this.getAccounts} accounts={this.state.accounts} updateSelectedAccount={this.props.updateSelectedAccount}/>);
    }
}
