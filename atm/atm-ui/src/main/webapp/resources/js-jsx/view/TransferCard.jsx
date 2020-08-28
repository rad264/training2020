class TransferCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedType: 'internal'
        };
        this.setActiveType = this.setActiveType.bind(this);
    }
    isActive(type) {
        return this.state.selectedType === type;
    }

    setActiveType(e) {
        this.setState({selectedType: e.target.value});
    }

    render() {

        const {userId, onChange, toAccountNumber, fromAccountNumber, transferAmount, statusCode, onClick} = this.props;

        var toAccountInput;
        if (this.state.selectedType == "internal")
            toAccountInput = <SelectAccounts userId={userId} onChange={onChange} accountNumber={toAccountNumber} label={"To"} nameAlt={"toAccountNumber"}></SelectAccounts>
        else
            toAccountInput = <div class="form-group row">
                <label for="accountNumber" class="col-5 col-form-label">To Account Number</label>
                <div class="col-7">
                    <input type="text" class="form-control" name="toAccountNumber" onChange={onChange} value={toAccountNumber} required="required"></input>
                </div>
            </div>

        return (<div class="card mb-3">
            <div class="card-body text-success">
                <form autocomplete="off">
                    <div class="form-group row">
                        <label for="transferType" class="col-5 col-form-label">Transfer Type</label>

                        <div class="col-7 input-group">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="internal" value="internal" checked={this.isActive("internal")} onChange={this.setActiveType}></input>
                                <label class="form-check-label" for="internalTransfer">Internal</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="external" value="external" checked={this.isActive("external")} onChange={this.setActiveType}></input>
                                <label class="form-check-label" for="external">External</label>
                            </div>
                        </div>
                    </div>

                    <SelectAccounts userId={userId} onChange={onChange} accountNumber={fromAccountNumber} label={"From"} nameAlt={"fromAccountNumber"}></SelectAccounts>
                    {toAccountInput}
                    <div class="form-group row">
                        <label for="transferAmount" class="col-5 col-form-label">Amount</label>

                        <div class="col-7 input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">$</span>
                            </div>
                            <input type="number" class="form-control" id="transferAmount" name="transferAmount" onChange={onChange} value={transferAmount} required="required"></input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-8">
                            <Alert statusCode={statusCode} action={"Transfer"}></Alert>
                        </div>
                        <div class="col-4">
                            <button type="submit" class="btn btn-smbc mb-2 float-right" onClick={onClick}>Transfer</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>);
    }
}
