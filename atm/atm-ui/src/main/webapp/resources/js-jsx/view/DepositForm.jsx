function DepositForm(props) {
    return (
        <div>
            <h3>Deposits</h3>
            <label for="accountNumber">Account number:</label>
            <input type="text" name="accountNumber" onChange={props.onChange} value={props.accountNumber} ></input>
            <br></br>
            <label for="depositAmount">Deposit amount:</label>
            <input type="text" name="depositAmount" onChange={props.onChange} value={props.depositAmount} ></input>
            <button onClick={props.onClick}>Deposit</button>

        </div>

    )
}