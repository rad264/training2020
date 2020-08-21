class TransferCard extends React.Component {

    render() {
        return (<div class="card mb-3">
            <div class="card-body text-success">
                <form autocomplete="off">
                    <div class="form-group row">
                        <label for="fromAccountNumber" class="col-5 col-form-label">From Account Number</label>

                        <div class="col-7">
                            <input type="text" class="form-control" id="fromAccountNumber" name="fromAccountNumber" onChange={this.props.onChange} value={this.props.fromAccountNumber}></input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="toAccountNumber" class="col-5 col-form-label">To Account Number</label>

                        <div class="col-7">
                            <input type="text" class="form-control" id="toAccountNumber" name="toAccountNumber" onChange={this.props.onChange} value={this.props.toAccountNumber}></input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="transferAmount" class="col-5 col-form-label">Amount</label>

                        <div class="col-7 input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">$</span>
                            </div>
                            <input type="number" class="form-control" id="transferAmount" name="transferAmount" onChange={this.props.onChange} value={this.props.transferAmount}></input>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-smbc mb-2 float-right" onClick={this.props.onClick}>Transfer</button>
                </form>
            </div>
        </div>);
    }

}
