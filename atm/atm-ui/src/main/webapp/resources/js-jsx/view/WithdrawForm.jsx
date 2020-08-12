function WithdrawForm(props) {
    return (
        <div class="col-md-4 card bank-function-card">
            <div class="form-group">
                <h3 class="card-title">Withdrawal</h3>
                <label for="accountNumber">Account number:</label>
                <input id="account-input" class="form-control" placeholder="e.g. 123456" type="text" name="accountNumber" onChange={props.onChange} value={props.accountNumber} ></input>
                <br></br>
                <label for="withdrawAmount">Withdraw amount:</label>
                <input class="form-control" placeholder="e.g. 10.50" type="text" name="withdrawAmount" onChange={props.onChange} value={props.withdrawAmount} ></input>
            </div>
            <div>
            <button class="btn btn-primary" onClick={props.onClick}>Withdraw</button>

            </div>
        </div>


    )
}