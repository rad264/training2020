function CreateAccountForm(props) {

    return (
        <div class="col-md-4 card bank-function-card">
            <div >
                <h3 class="card-title">Open a new account</h3>
                <h6 class="card-subtitle mb-2 text-muted">{"Account will be added to user: " + props.userId}</h6>

            </div>
            <div>
                <button class="btn btn-primary" onClick={props.onClick}>Open account</button>

            </div>
        </div>
    )
}



{/* <div class="col-md-4 card bank-function-card">
<div class="form-group">
    <h3 class="card-title" >Deposit</h3>
    <label for="accountNumber">Account number:</label>
    <input class="form-control" placeholder="e.g. 123456" type="text" name="accountNumber" onChange={props.onChange} value={props.accountNumber} ></input>
    <br></br>
    <label for="depositAmount">Deposit amount:</label>
    <input class="form-control" placeholder="e.g. 10.50" type="text" name="depositAmount" onChange={props.onChange} value={props.depositAmount} ></input>

</div>
<div >
    <button class="btn btn-primary" onClick={props.onClick}>Deposit</button>

</div>
</div> */}