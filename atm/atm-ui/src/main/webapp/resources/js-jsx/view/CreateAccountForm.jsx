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
            <br />
            <div>
                <h6 class="card-subtitle mb-2 text-muted">{props.newAccountNumber}</h6>
            </div>
        </div>
    )
}