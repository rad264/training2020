class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = new DashboardModel(props.location.state.userId, props.location.state.initialAccountNumber);
        this.updateSelectedUserId = this.updateSelectedUserId.bind(this);
        this.updateSelectedAccount = this.updateSelectedAccount.bind(this);
        this.updateDashboard = this.updateDashboard.bind(this);
    }

    updateSelectedAccount(accountNumber) {
        this.setState({accountNumber: accountNumber});
    }

    updateSelectedUserId(userId) {
        this.setState({userId: userId});
    }

    updateDashboard() {
        this.setState({state: this.state});
    }

    render() {
        return (<div class="app-bg">
            <NavBarDashboard userId={this.state.userId} location={this.props.location}/>
            <div class="container pt-5">
                <div class="row">
                    <div class="col-4">
                        <h3>Accounts</h3>

                        <GetAccountsController userId={this.state.userId} updateSelectedAccount={this.updateSelectedAccount}/>

                    </div>
                    <div class="col-8">
                        <h3>&nbsp;</h3>
                        <GetSummaryController accountNumber={this.state.accountNumber}/>
                        <AccountActions userId={this.state.userId} accountNumber={this.state.accountNumber} updateDashboard={this.updateDashboard}/>
                        <GetTransactionsController accountNumber={this.state.accountNumber}/>
                    </div>
                </div>
            </div>
            <footer class="footer text-center">
                <div class="container">
                    <span>© James Wong 2020</span>
                </div>
            </footer>
        </div>);
    }
}
