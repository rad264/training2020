class DepositCard extends React.Component {


// <div class="form-group row">
//             <label for="accountNumber" class="col-5 col-form-label">Account Number</label>
//             <div class="col-7">
//                 <select class="form-control" id="accountNumber" name="accountNumber">
//                     <option>1</option>
//                     <option>2</option>
//                     <option>3</option>
//                     <option>4</option>
//                     <option>5</option>
//                 </select>
//             </div>
//         </div>

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
                        <div class="col-7 input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">$</span>
                            </div>
                            <input type="number" class="form-control" id="amount" name="depositAmount" onChange={this.props.onChange} value={this.props.depositAmount}></input>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-smbc mb-2 float-right" onClick={this.props.onClick}>Deposit</button>
                </form>
            </div>
        </div>);
    }

}
