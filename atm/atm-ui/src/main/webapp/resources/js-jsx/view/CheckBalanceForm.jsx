function CheckBalanceForm(props) {
    return (
        <form>
            <br></br>
            <div class="form-group col-md-6">
                <h3 class="card-title">Check Balance</h3>
                <label for="accountNumber">Account Number:</label>
                <input placeholder="e.g. 123456" type="text" class="form-control" name="accountNumber" onChange={props.onChange} value={props.accountNumber} />
            </div>
            <div class="col-md-6">
                <button class="btn btn-primary" onClick={props.onClick}>Check Balance</button>

            </div>


        </form>

    );
}