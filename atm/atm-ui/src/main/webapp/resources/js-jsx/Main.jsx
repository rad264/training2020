class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>ATM</h1>
                <CheckBalanceController />
                <DepositController />
                <WithdrawController />
                <TransferController />
            </div>
        )
    }
}

ReactDOM.render(<Main />, document.getElementById("root"));