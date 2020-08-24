class DepositCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = new GetAccountNumbersModel(props.userId);
        this.getAccountNumbers = this.getAccountNumbers.bind(this);
    }

    componentDidMount() {
        this.getAccountNumbers();
    }

    componentWillReceiveProps(nextProps) {
        this.setState(new GetAccountNumbersModel(nextProps.userId), () => {
            this.getAccountNumbers();
        });
    }

    getAccountNumbers() {
        const userId = this.state.userId;
        let handleResponse = (status, accountNumbers) => this.setState({responseStatus: status, accountNumbers: accountNumbers});
        handleResponse = handleResponse.bind(this);
        $.ajax({
            url: "/atm-api/users/" + userId,
            type: "GET",
            contentType: "application/json",
            success: function(response) {
                handleResponse(200, response);
            },
            error: function(xhr, status, error) {
                handleResponse(xhr.status);
            }
        });
    }

    render() {

        let alert;
        switch (this.props.statusCode) {
            case 200:
                alert = <AlertSuccess msg={"Deposit Success."}/>;
                break;
            case 404:
                alert = <AlertFail error={"Account Not Found."}/>;
                break;
            default:
                break;
        }

        var accountNumbersOptions = [<option>Select Account</option>
            ];
        if (this.state.accountNumbers) {
            this.state.accountNumbers.forEach(function(n, i) {
                accountNumbersOptions.push(<option>{n}</option>)
            })
        }

        return (<div class="card mb-3">
            <div class="card-body text-success">
                <form autocomplete="off">
                    <div class="form-group row">
                        <label for="accountNumber" class="col-5 col-form-label">Account Number</label>
                        <div class="col-7">
                            <select class="form-control" name="accountNumber" onChange={this.props.onChange} value={this.props.accountNumber}>
                                {accountNumbersOptions}
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="accountNumber" class="col-5 col-form-label">Account Number</label>

                        <div class="col-7">
                            <input type="text" class="form-control" name="accountNumber" onChange={this.props.onChange} value={this.props.accountNumber}></input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="depositAmount" class="col-5 col-form-label">Amount</label>
                        <div class="col-7 input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">$</span>
                            </div>
                            <input type="number" class="form-control" id="depositAmount" name="depositAmount" onChange={this.props.onChange} value={this.props.depositAmount}></input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-8">
                            {alert}
                        </div>
                        <div class="col-4">
                            <button type="submit" class="btn btn-smbc float-right" onClick={this.props.onClick}>Deposit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>);
    }

}
