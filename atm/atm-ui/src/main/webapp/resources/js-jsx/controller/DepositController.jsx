class DepositController extends React.Component {
    constructor(props) {
        console.log("here")

        super(props);
        this.state = new DepositModel();
        // this.onChange = this.onChange.bind(this);
        // this.deposit = this.deposit.bind(this);
    }

    // onChange(event) {
    //     this.setState(new DepositModel(event.target.value));
    // }

    // deposit() {
    //     const accountNumber = this.state.accountNumber;
    //     const depositAmount = this.state.depositAmount;

    //     let handleResponse = (status) => this.setState({ responseStatus: status })
    //     handleResponse = handleResponse.bind(this);

    //     $.ajax({
    //         url: "/atm-api/accounts/" + accountNumber + "/deposit/" + depositAmount + "/",
    //         type: "POST",
    //         success: function (response) {
    //             handleResponse(200, response);
    //         },
    //         error: function (xhr, status, error) {
    //             handleResponse(xhr.status);
    //         }
    //     });
    // }

    render() {
        return (
            <div id="deposit-form"></div>
        )
    }
    // render() {
    //     return (
    //         <div>
    //             <DepositController accountNumber={this.state.accountNumber} depositAmount={this.state.accountNumber} onChange={this.onChange} onClick={this.deposit}></DepositController>
    //             <Balance statusCode={this.state.responseStatus}></Balance>
    //         </div>
    //     );
    // }

}

ReactDOM.render(<DepositController />, document.getElementById("deposit-box"))