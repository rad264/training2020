class Main extends React.Component {
    constructor(props) {
        super(props);
        this.insertLocation = "current-container";
    }


    render() {

        return (
            <div>
                <NavbarController/>
                {/* <button onClick={this.insertDepositController.bind(this)}>Insert depo controller</button> */}
                <div id="current-container">

                </div>


                {/* <CheckBalanceController />
                <DepositController />
                <WithdrawController />
                <TransferController /> */}
            </div>

        )
    };

    componentDidMount(){
        this.bindNavButtons()
        this.insertCheckBalanceController(this.insertLocation)
    }

    bindNavButtons() {
        $("#home-navbar-button").click(function () {
            this.insertCheckBalanceController(this.insertLocation);
        }.bind(this));     
        $("#deposit-navbar-button").click(function () {
            this.insertDepositController(this.insertLocation);
        }.bind(this));
        $("#withdraw-navbar-button").click(function () {
            this.insertWithdrawController(this.insertLocation);
        }.bind(this));

        $("#transfer-navbar-button").click(function () {
            this.insertTransferController(this.insertLocation);
        }.bind(this));
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