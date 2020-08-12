function TransferForm(props) {
    return (
        <div class="col-md-4 card bank-function-card">
            <div class="form-group">
                <h3 class="card-title">Transfer</h3>
                <label for="toTransferFrom">Transfer from account:</label>
                <input id="account-input" class="form-control" placeholder="e.g. 123456" type="text" name="toTransferFrom" onChange={props.onChange} value={props.toTransferFrom} ></input>
                <br></br>
                <label for="toTransferTo">Transfer to account:</label>
                <input class="form-control" placeholder="e.g. 654321" type="text" name="toTransferTo" onChange={props.onChange} value={props.toTransferTo} ></input>
                <br></br>
                <label for="amount">Amount:</label>
                <input class="form-control" placeholder="e.g. 10.50" type="text" name="amount" onChange={props.onChange} value={props.amount} ></input>

            </div>
            <div>
                <button class="btn btn-primary" onClick={props.onClick}>Transfer</button>

            </div>

        </div>

    )
}