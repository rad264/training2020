class WithdrawCard extends React.Component {
    render() {
        const {
            userId,
            onChange,
            accountNumber,
            withdrawAmount,
            statusCode,
            onClick,
        } = this.props;

        return (
            <div class="card mb-3">
                <div class="card-body text-success">
                    <form autocomplete="off">
                        <SelectAccounts
                            userId={userId}
                            onChange={onChange}
                            accountNumber={accountNumber}
                        ></SelectAccounts>
                        <div class="form-group row">
                            <label
                                for="depositAmount"
                                class="col-5 col-form-label"
                            >
                                Amount
                            </label>

                            <div class="col-7 input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">$</span>
                                </div>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="withdrawAmount"
                                    name="withdrawAmount"
                                    onChange={onChange}
                                    value={withdrawAmount}
                                    required="required"
                                ></input>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-8">
                                <Alert
                                    statusCode={statusCode}
                                    action={"Withdraw"}
                                ></Alert>
                            </div>
                            <div class="col-4">
                                <button
                                    type="submit"
                                    class="btn btn-smbc mb-2 float-right"
                                    onClick={onClick}
                                >
                                    Withdraw
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
