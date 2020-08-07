class HistoryController extends React.Component {
    constructor(props) {
        super(props);
        this.state = new HistoryModel(props.userId);
        this.getHistory = this.getHistory.bind(this);
        this.setActiveAccount = this.setActiveAccount.bind(this);
    };

    setActiveAccount(accountNumber){
        this.setState({accountNumber: accountNumber},  () => {this.getHistory()});
        
    }

    componentWillMount() {
        this.getUserAccounts();
    }

    getUserAccounts() {
        const userId = this.state.userId;
        let handleResponse = (status, accounts) => this.setState({ responseStatus: status, accounts: accounts});
        handleResponse = handleResponse.bind(this);
        $.ajax({
            url: "/atm-api/users/" + userId,
            type: "GET",
            success: function (response) {
                handleResponse(200, response.accounts);
            }.bind(this),
            error: function (xhr, status, error) {
                handleResponse(xhr.status);
            }
        });
    }

    getHistory(){
        const accountNumber = this.state.accountNumber;
        let handleResponse = (status, content) => this.setState({ responseStatus: status, history: content});
        handleResponse = handleResponse.bind(this);
        $.ajax({
            url: "/atm-api/history/" + accountNumber,
            type: "GET",
            success: function (response) {
                handleResponse(200, response.content);
            }.bind(this),
            error: function (xhr, status, error) {
                handleResponse(xhr.status);
            }
        });
    }

    render() {
        return(
            <HistoryForm history={this.state.history} accounts={this.state.accounts} onClick={this.getHistory} setActiveAccount={this.setActiveAccount} />
        )
    }
}