class TransferCard extends React.Component {

    render() {
        return (<div class="card border-success mb-3">
            <div class="card-header bg-transparent border-success"></div>
            <div class="card-body text-success">
                <form class="form-inline">
                    <div>
                        <div class="form-group mb-2">
                            <label for="fromAccountNumber">From Account Number:</label>
                        </div>
                        <div class="form-group mx-sm-3 mb-2">
                            <input type="text" class="form-control" id="fromAccountNumber" name="fromAccountNumber" onChange={this.props.onChange} value={this.props.fromAccountNumber}></input>
                        </div>
                    </div>
                    <div>
                        <div class="form-group mb-2">
                            <label for="toAccountNumber">To Account Number:</label>
                        </div>

                        <div class="form-group mx-sm-3 mb-2">
                            <input type="text" class="form-control" id="toAccountNumber" name="toAccountNumber" onChange={this.props.onChange} value={this.props.toAccountNumber}></input>
                        </div>
                    </div>

                    <div>
                        <div class="form-group mb-2">
                            <label for="transferAmount">Amount:</label>
                        </div>

                        <div class="form-group mx-sm-3 mb-2">
                            <input type="number" class="form-control" id="transferAmount" name="transferAmount" onChange={this.props.onChange} value={this.props.transferAmount}></input>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary mb-2" onClick={this.props.onClick}>Transfer</button>
                </form>
            </div>
            <div class="card-footer bg-transparent border-success">
                New Balance
            </div>
        </div>);
    }

}
