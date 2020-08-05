function TransferForm(props) {
    return (
        <div>
            <h3>Transfer</h3>
            <label for="toTransferFrom">Transfer from account:</label>
            <input type="text" name="toTransferFrom" onChange={props.onChange} value={props.toTransferFrom} ></input>
            <br></br>
            <label for="toTransferTo">Transfer to account:</label>
            <input type="text" name="toTransferTo" onChange={props.onChange} value={props.toTransferTo} ></input>
            <br></br>
            <label for="amount">Amount:</label>
            <input type="text" name="amount" onChange={props.onChange} value={props.amount} ></input>
            <button onClick={props.onClick}>Transfer</button>

        </div>

    )
}