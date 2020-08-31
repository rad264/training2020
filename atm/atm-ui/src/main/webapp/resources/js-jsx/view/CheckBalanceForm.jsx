function CheckBalanceForm(props) {
    return (
        <div>
            <form class="form-inline" autocomplete="off">
                <div class="form-group mb-2">
                    <label for="accountNumber">Account Number:</label>
                </div>
                <div class="form-group mx-sm-3 mb-2">
                    <input
                        type="accountNumber"
                        class="form-control"
                        onChange={props.onChange}
                        value={props.accountNumber}
                    ></input>
                </div>
                <button
                    type="submit"
                    class="btn btn-primary mb-2"
                    onClick={props.onClick}
                >
                    Check Balance
                </button>
            </form>
        </div>
    );
}
