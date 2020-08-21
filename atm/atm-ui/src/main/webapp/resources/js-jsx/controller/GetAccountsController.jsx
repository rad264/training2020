class GetAccountsController extends React.Component {
    constructor(props) {
        super(props);
        this.state = new GetAccountsModel(props.userId);
        this.getAccounts = this.getAccounts.bind(this);
    }

    componentDidMount() {
        this.getAccounts();
    }

    componentWillReceiveProps(nextProps) {
        this.setState(new GetAccountsModel(nextProps.userId), () => {
            this.getAccounts();
        });
    }

    getAccounts() {
        const userId = this.state.userId;
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
        return (

            <AccountGroup statusCode={this.state.responseStatus} accounts={this.state.accounts} updateSelectedAccount={this.props.updateSelectedAccount}/>

        );
    }
}
