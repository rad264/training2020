function DepositForm(props) {
    return (
        <div>
            <h3>Deposit</h3>
            <label for="accountNumber">Account Number:</label>
            <input type="text" name="accountNumber" onChange={props.onChange} value={props.accountNumber} ></input>
            <label for="depositAmount">Deposit amount:</label>
            <input type="text" name="depositAmount" onChange={props.onChange} value={props.depositAmount} ></input>
            <button onClick={props.onClick}>Deposit</button>

        </div>

    )
}