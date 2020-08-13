class WithdrawCard extends React.Component {

    render() {
        return (<div class="card mb-3">
            <div class="card-body text-success">
                <form autocomplete="off">
                    <div class="form-group row">
                        <label for="accountNumber" class="col-5 col-form-label">Account Number</label>

                        <div class="col-7">
                            <input type="text" class="form-control" id="accountNumber" name="accountNumber" onChange={this.props.onChange} value={this.props.accountNumber}></input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="depositAmount" class="col-5 col-form-label">Amount</label>

                        <div class="col-7">
                            <input type="number" class="form-control" id="amount" name="withdrawAmount" onChange={this.props.onChange} value={this.props.withdrawAmount}></input>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-smbc mb-2 float-right" onClick={this.props.onClick}>Withdraw</button>
                </form>
            </div>
        </div>);
    }

}
