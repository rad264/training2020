class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = new DashboardModel("123456");
        this.updateSelectedAccount = this.updateSelectedAccount.bind(this);
    }

    updateSelectedAccount(accountNumber) {
        this.setState(new DashboardModel(accountNumber));
    }

    render() {
        return (<div class="app-bg">
            <NavBarDashboard userId={"jwong"}/>
            <div class="container pt-5">
                <div class="row">
                    <div class="col-4">
                        <span class="ml-3">Accounts</span>
                        <span class="mr-3 float-right">Balance</span>
                        <GetAccountsController updateSelectedAccount={this.updateSelectedAccount}/>

                    </div>
                    <div class="col-8">
                        <span>&nbsp;</span>
                        <GetSummaryController accountNumber={this.state.accountNumber}/>
                        <AccountActions accountNumber={this.state.accountNumber}/>
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
