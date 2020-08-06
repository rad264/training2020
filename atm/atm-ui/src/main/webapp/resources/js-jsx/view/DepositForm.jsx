function DepositForm(props) {
    return (
        <div class="col-md-4 card bank-function-card">
            <div class="form-group">
                <h3 class="card-title" >Deposit</h3>
                <label for="accountNumber">Account number:</label>
                <input class="form-control" placeholder="e.g. 123456" type="text" name="accountNumber" onChange={props.onChange} value={props.accountNumber} ></input>
                <br></br>
                <label for="depositAmount">Deposit amount:</label>
                <input class="form-control" placeholder="e.g. 10.50" type="text" name="depositAmount" onChange={props.onChange} value={props.depositAmount} ></input>

            </div>
            <div class="">
                <button class="btn btn-primary" onClick={props.onClick}>Deposit</button>

            </div>
        </div>

    )
}