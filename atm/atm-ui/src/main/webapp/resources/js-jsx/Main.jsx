class Main extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.insertLocation = "current-container";
    }

    onChange(event){
        this.bindNavButtons()
    }

    render() {

        return (
            <div>
                <NavbarController/>
                <div id="current-container">

                </div>
            </div>

        )
    };

    componentDidMount(){
        this.bindNavButtons()
        this.insertSummaryController(this.insertLocation)
    }

    bindNavButtons() {
        $(".home-navbar-button").click(function () {
            this.insertSummaryController(this.insertLocation);
        }.bind(this));     
        $(".deposit-navbar-button").click(function () {
            this.insertDepositController(this.insertLocation);
        }.bind(this));
        $(".withdraw-navbar-button").click(function () {
            this.insertWithdrawController(this.insertLocation);
        }.bind(this));

        $("#transfer-navbar-button").click(function () {
            this.insertTransferController(this.insertLocation);
        }.bind(this));

        $("#check-balance-navbar-button").click(function () {
            this.insertCheckBalanceController(this.insertLocation);
        }.bind(this));
    };

    insertSummaryController(locationId) {
        ReactDOM.render(<SummaryController />, document.getElementById(locationId))
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
}

ReactDOM.render(<Main />, document.getElementById("root"));