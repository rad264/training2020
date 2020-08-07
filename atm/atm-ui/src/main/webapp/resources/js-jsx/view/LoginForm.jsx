function LoginForm(props) {
    return (
        <div class="h-100 row align-items-center">
            <div id="login-card" class=" col-md-6 form-group card bank-function-card">
                <h3>SMBC ATM</h3>
                <label for="userId">User ID:</label>
                <input type="text" class="form-control" name="userId" onChange={props.onChange} value={props.userId} />
                <div >
                    <button class="btn btn-success" onClick={props.onClick}>Login</button>
                </div>
            </div>


        </div>


    )
}