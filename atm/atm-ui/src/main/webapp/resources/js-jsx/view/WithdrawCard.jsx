class WithdrawCard extends React.Component {

    render() {

        let alert;
        switch (this.props.statusCode) {
            case 200:
                alert = <AlertSuccess msg={"Withdraw Success."}/>;
                break;
            case 404:
                alert = <AlertFail error={"Account Not Found."}/>;
                break;
            default:
                break;
        }

        return (<div class="card mb-3">
            <div class="card-body text-success">
                <form autocomplete="off">
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
                            <input type="number" class="form-control" id="withdrawAmount" name="withdrawAmount" onChange={this.props.onChange} value={this.props.withdrawAmount}></input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-8">
                            {alert}
                        </div>
                        <div class="col-4">
                            <button type="submit" class="btn btn-smbc mb-2 float-right" onClick={this.props.onClick}>Withdraw</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>);
    }

}
