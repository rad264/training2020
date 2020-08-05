function WithdrawForm(props) {
    return (
        <div>
            <h3>Withdrawal</h3>
            <label for="accountNumber">Account number:</label>
            <input type="text" name="accountNumber" onChange={props.onChange} value={props.accountNumber} ></input>
            <br></br>
            <label for="withdrawAmount">Withdraw amount:</label>
            <input type="text" name="withdrawAmount" onChange={props.onChange} value={props.withdrawAmount} ></input>
            <button onClick={props.onClick}>Withdraw</button>

        </div>

    )
}