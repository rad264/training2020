class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = new AppModel("123456");
        this.updateSelectedAccount = this.updateSelectedAccount.bind(this);
    }

    updateSelectedAccount(accountNumber) {
        this.setState(new AppModel(accountNumber));
    }

    render() {
        return (<div>
            <NavigationBar/>
            <div class="container pt-5">
                <div class="row">
                    <GetAccountsController updateSelectedAccount={this.updateSelectedAccount}/>
                    <div class="col-8">
                        <GetSummaryController accountNumber={this.state.accountNumber}/>
                        <AccountActions/>
                        <GetTransactionsController accountNumber={this.state.accountNumber}/>
                    </div>
                </div>
            </div>
        </div>);
    }
}
ReactDOM.render(<App/>, document.getElementById("root"));
