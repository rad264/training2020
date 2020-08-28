class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        let initialAccountNumber = props.location.state.initialAccountNumber
            ? props.location.state.initialAccountNumber
            : null;
        this.state = new DashboardModel(props.location.state.userId, initialAccountNumber);
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
        var content = <div class="container pt-5">
            <div class="row">
                <div class="col-4">
                    <h3>Accounts</h3>

                    <GetAccountsController userId={this.state.userId} updateSelectedAccount={this.updateSelectedAccount}/>

                </div>
                <div class="col-8">
                    <h3>&nbsp;</h3>
                    <GetSummaryController userId={this.state.userId} accountNumber={this.state.accountNumber}/>
                    <AccountActions userId={this.state.userId} accountNumber={this.state.accountNumber} updateDashboard={this.updateDashboard}/>
                    <GetTransactionsController userId={this.state.userId} accountNumber={this.state.accountNumber}/>
                </div>
            </div>
        </div>;
        if (!this.state.accountNumber)
            content = <div class="container pt-5">
                <div class="row">
                    <div class="col-12">
                        <div class="">
                            <div class="card-header smbc-color-primary border-success">Create Account</div>
                            <PostCreateAccountController userId={this.state.userId} updateDashboard={this.updateDashboard} updateSelectedAccount={this.updateSelectedAccount}/>
                        </div>
                    </div>
                </div>
            </div>;

        return (<div class="app-bg">
            <NavBarDashboard userId={this.state.userId} location={this.props.location}/> {content}
            <footer class="footer text-center">
                <div class="container">
                    <span>© James Wong 2020</span>
                </div>
            </footer>
        </div>);
    }
}
