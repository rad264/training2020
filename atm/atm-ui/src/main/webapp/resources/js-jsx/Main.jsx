class Main extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
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
        $(".home-navbar-button").removeClass("active")
        $(".deposit-navbar-button").removeClass("active")
        $(".withdraw-navbar-button").removeClass("active")
        $(".transfer-navbar-button").removeClass("active")
        $(".check-balance-navbar-button").removeClass("active")
        $(".history-navbar-button").removeClass("active")
        $(".create-account-navbar-button").removeClass("active")


        if (override) {
            $("." + override + "-navbar-button").addClass("active")
        } else {
            $("." + this.state.activePage + "-navbar-button").addClass("active")
        }
    }

    bindNavButtons() {
        $(".home-navbar-button").click(function () {
            this.insertSummaryController(this.insertLocation);
            this.setState({ activePage: this.homeState });
            this.setActivePage();
        }.bind(this));
        $(".user-navbar-button").click(function () {
            this.insertSummaryController(this.insertLocation);
            this.setState({ activePage: this.homeState });
            this.setActivePage();
        }.bind(this));
        $(".deposit-navbar-button").click(function () {
            this.insertDepositController(this.insertLocation);
            this.setState({ activePage: this.depositState });
            this.setActivePage();
        }.bind(this));
        $(".withdraw-navbar-button").click(function () {
            this.insertWithdrawController(this.insertLocation);
            this.setState({ activePage: this.withdrawState });
            this.setActivePage();
        }.bind(this));
        $(".transfer-navbar-button").click(function () {
            this.insertTransferController(this.insertLocation);
            this.setState({ activePage: this.transferState });
            this.setActivePage();
        }.bind(this));
        $(".history-navbar-button").click(function () {
            this.insertHistoryController(this.insertLocation);
            this.setState({ activePage: this.historyState });
            this.setActivePage();
        }.bind(this));
        $(".create-account-navbar-button").click(function () {
            this.insertCreateAccountController(this.insertLocation);
            this.setState({ activePage: this.createAccountState });
            this.setActivePage();
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