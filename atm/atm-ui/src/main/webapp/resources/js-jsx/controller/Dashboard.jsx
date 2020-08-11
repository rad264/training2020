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
        return (<div>
            <NavBarDashboard userId={"jwong"}/>
            <div class="container pt-5">
                <div class="row">
                    <div class="col-4">
                        <GetAccountsController updateSelectedAccount={this.updateSelectedAccount}/>
                        <PostCreateAccountController/>
                    </div>
                    <div class="col-8">
                        <GetSummaryController accountNumber={this.state.accountNumber}/>
                        <AccountActions accountNumber={this.state.accountNumber}/>
                        <GetTransactionsController accountNumber={this.state.accountNumber}/>
                    </div>
                </div>
            </div>
        </div>);
    }
}
