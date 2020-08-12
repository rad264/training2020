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

        this.controllerToInsert;

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
        this.controllerToInsert = ( <SummaryController userId={this.userId} /> );
        this.changeActivePage(this.homeState, this.controllerToInsert, this.insertLocation);
        this.setActivePage("home");
    }

    setActivePage(override) {
        $("." + this.homeState + "-navbar-button").removeClass("active")
        $("." + this.depositState + "-navbar-button").removeClass("active")
        $("." + this.withdrawState + "-navbar-button").removeClass("active")
        $("." + this.transferState + "-navbar-button").removeClass("active")
        $("." + this.balanaceState + "-navbar-button").removeClass("active")
        $("." + this.historyState + "-navbar-button").removeClass("active")
        $("." + this.createAccountState + "-navbar-button").removeClass("active")


        if (override) {
            $("." + override + "-navbar-button").addClass("active")
        } else {
            $("." + this.state.activePage + "-navbar-button").addClass("active")
        }
    }

    changeActivePage(activePageState, controller, insertLocation) {
        if (controller) {
            this.insertController(controller, insertLocation)
        }
        this.setState({ activePage: activePageState })
        this.setActivePage();
    }

    bindNavButtons() {
        $("." + this.homeState + "-navbar-button").click(function () {
            this.controllerToInsert = ( <SummaryController userId={this.userId} /> );
            this.changeActivePage(this.homeState, this.controllerToInsert, this.insertLocation);
        }.bind(this));
        $(".user-navbar-button").click(function () {
            this.controllerToInsert = ( <SummaryController userId={this.userId} /> );
            this.changeActivePage(this.homeState, this.controllerToInsert, this.insertLocation);
        }.bind(this));
        $("." + this.depositState + "-navbar-button").click(function () {
            this.controllerToInsert = ( <DepositController />);
            this.changeActivePage(this.depositState, this.controllerToInsert, this.insertLocation);
        }.bind(this));
        $("." + this.withdrawState + "-navbar-button").click(function () {
            this.controllerToInsert = ( <WithdrawController />);
            this.changeActivePage(this.withdrawState, this.controllerToInsert, this.insertLocation);
        }.bind(this));
        $("." + this.transferState + "-navbar-button").click(function () {
            this.controllerToInsert = ( <TransferController />);
            this.changeActivePage(this.transferState, this.controllerToInsert, this.insertLocation);
        }.bind(this));
        $("." + this.historyState + "-navbar-button").click(function () {
            this.controllerToInsert = ( <HistoryController userId={this.userId} />);
            this.changeActivePage(this.historyState, this.controllerToInsert, this.insertLocation);
        }.bind(this));
        $("." + this.createAccountState + "-navbar-button").click(function () {
            this.controllerToInsert = ( <CreateAccountController userId={this.userId} />);
            this.changeActivePage(this.createAccountState, this.controllerToInsert, this.insertLocation);
        }.bind(this));
    };

    insertController(controller, locationId) {
        ReactDOM.render(controller, document.getElementById(locationId))
    }

}

// ReactDOM.render(<Main />, document.getElementById("root"));