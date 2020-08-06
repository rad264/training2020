function CheckBalanceForm(props) {
    return (
        <form>
            <div class="form-group col-md-6">
                <h3 class="card-title">Check Balance</h3>
                <label for="accountNumber">AccountNumber:</label>
                <input placeholder="e.g. 123456" type="text" class="form-control" name="accountNumber" onChange={props.onChange} value={props.accountNumber} />
                <button onClick={props.onClick}>Check Balance</button>


            </div>
        </form>

    );
}


{/* <div>
<h3>Check Balance</h3>
<label for="accountNumber">AccountNumber:</label>
<input type="text" name="accountNumber" onChange={props.onChange} value={props.accountNumber} />
<button onClick={props.onClick}>Check Balance</button>


</div> */}