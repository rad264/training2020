class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = new NavbarModel(props.userId, props.accounts);
        this.onChange = this.onChange.bind(this);
        this.userId = props.userId;

        this.insertLocation = "current-container";
        this.homeState = "home";
        this.depositState = "deposit";
        this.withdrawState = "withdraw";
        this.transferState = "transfer";
        this.balanaceState = "check-balance";
        this.historyState = "history";
        this.createAccountState = "create-account";
    }

    onChange(event) {
        this.bindNavButtons()
    }

    render() {

        return (
            <div>
                <NavbarController currentUser={this.userId} />
                <div id="current-container">

                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>

            </div>

        )
    };

    componentDidMount() {
        this.bindNavButtons();
        this.insertSummaryController(this.insertLocation);
        this.setState({ activePage: this.homeState });
        this.setActivePage("home");
        }

    setActivePage(override) {
        $("."+ this.homeState + "-navbar-button").removeClass("active")
        $("."+ this.depositState + "-navbar-button").removeClass("active")
        $("."+ this.withdrawState + "-navbar-button").removeClass("active")
        $("."+ this.transferState + "-navbar-button").removeClass("active")
        $("."+ this.balanaceState + "-navbar-button").removeClass("active")
        $("."+ this.historyState + "-navbar-button").removeClass("active")
        $("."+ this.createAccountState + "-navbar-button").removeClass("active")


        if (override) {
            $("." + override + "-navbar-button").addClass("active")
        } else {
            $("." + this.state.activePage + "-navbar-button").addClass("active")
        }
    }

    changeActivePage(activePageState){
        this.setState({activePage: activePageState})
        this.setActivePage();
    }

    bindNavButtons() {
        $("."+ this.homeState + "-navbar-button").click(function () {
            this.insertSummaryController(this.insertLocation);
            this.changeActivePage(this.homeState);
        }.bind(this));
        $(".user-navbar-button").click(function () {
            this.insertSummaryController(this.insertLocation);
            this.changeActivePage(this.homeState);
        }.bind(this));
        $("."+ this.depositState + "-navbar-button").click(function () {
            this.insertDepositController(this.insertLocation);
            this.changeActivePage(this.depositState);
        }.bind(this));
        $("."+ this.withdrawState + "-navbar-button").click(function () {
            this.insertWithdrawController(this.insertLocation);
            this.changeActivePage(this.withdrawState);
        }.bind(this));
        $("."+ this.transferState + "-navbar-button").click(function () {
            this.insertTransferController(this.insertLocation);
            this.changeActivePage(this.transferState);
        }.bind(this));
        $("."+ this.historyState + "-navbar-button").click(function () {
            this.insertHistoryController(this.insertLocation);
            this.changeActivePage(this.historyState);
        }.bind(this));
        $("."+ this.createAccountState + "-navbar-button").click(function () {
            this.insertCreateAccountController(this.insertLocation);
            this.changeActivePage(this.createAccountState);
        }.bind(this));
    };

    insertSummaryController(locationId) {
        ReactDOM.render(<SummaryController userId={this.userId} />, document.getElementById(locationId))
    };

    insertHistoryController(locationId) {
        ReactDOM.render(<HistoryController userId={this.userId} />, document.getElementById(locationId))
    };

    insertCheckBalanceController(locationId) {
        ReactDOM.render(<CheckBalanceController />, document.getElementById(locationId))
    };

    insertDepositController(locationId) {
        ReactDOM.render(<DepositController />, document.getElementById(locationId))
    };

    insertWithdrawController(locationId) {
        ReactDOM.render(<WithdrawController />, document.getElementById(locationId))
    };

    insertTransferController(locationId) {
        ReactDOM.render(<TransferController />, document.getElementById(locationId))
    };

    insertCreateAccountController(locationId) {
        ReactDOM.render(<CreateAccountController userId={this.userId} />, document.getElementById(locationId))
    };
}

// ReactDOM.render(<Main />, document.getElementById("root"));