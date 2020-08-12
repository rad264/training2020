class TransferController extends React.Component {
    constructor(props) {
        super(props);
        this.state = new TransferModel();
        this.onChange = this.onChange.bind(this);
        this.transfer = this.transfer.bind(this);
        this.confirmation;
    }

    onChange(event) {
        if (event.target.name === "toTransferFrom") {
            this.setState(new TransferModel(event.target.value, this.state.toTransferTo, this.state.amount));
        }
        if (event.target.name === "toTransferTo") {
            this.setState(new TransferModel(this.state.toTransferFrom, event.target.value, this.state.amount));
        }
        if (event.target.name === "amount") {
            this.setState(new TransferModel(this.state.toTransferFrom, this.state.toTransferTo, event.target.value));
        }

    }

    clearForm(){
        this.setState( { toTransferFrom: "", toTransferTo: "", amount: "" })
        this.initialFocus();
    }

    componentDidMount(){
        this.initialFocus();
    }

    initialFocus(){
        $("#account-input").focus()
    }

    transfer() {
        const toTransferFrom = this.state.toTransferFrom;
        const toTransferTo = this.state.toTransferTo;

        const amount = this.state.amount;

        let handleResponse = (status) => {
            this.setState({ responseStatus: status })
            this.confirmation = (
                <ConfirmationMessage message={"Transfered $" + amount + " from " + toTransferFrom + " to " + toTransferTo} />
            )
            this.clearForm();
        }
        handleResponse = handleResponse.bind(this);
        $.ajax({
            url: "/atm-api/transfer/from/" + toTransferFrom + "/to/" + toTransferTo + "/amount/" + amount + "/",
            type: "POST",
            success: function (response) {
                handleResponse(200, response);
            },
            error: function (xhr, status, error) {
                handleResponse(xhr.status);
            }
        });
    }

    render() {
        return (
            <div class="transfer-form">
                <TransferForm toTransferFrom={this.state.toTransferFrom} toTransferTo={this.state.toTransferTo} amount={this.state.amount} onChange={this.onChange} onClick={this.transfer} />
                {this.confirmation}
            </div>
        );
    }

}

// ReactDOM.render(<TransferController />, document.getElementById("transfer-box"))