class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <NavbarController/>
            
                <button onClick={this.insertDepositController.bind(this)}>Insert depo controller</button>

                <div id="deposit-container">

                </div>

                <CheckBalanceController />
                <DepositController />
                <WithdrawController />
                <TransferController />
            </div>
        )
    };


    insertDepositController() {
        ReactDOM.render(<DepositController />, document.getElementById("deposit-container"))
    }

    insertController(Controller, id){
        // ReactDOM.render(Controller, document.getElementById(id));
    }
}

ReactDOM.render(<Main />, document.getElementById("root"));