function LoginForm(props) {
    return (
        <div class="hrow ">
            <div id="login-card" class=" col-md-4 form-group card bank-function-card">
                <h3>SMBC ATM Login</h3>
                <label for="userId">User ID:</label>
                <input type="text" id="login-form" class="form-control" name="userId" onChange={props.onChange} value={props.userId} />
                <br></br>
                <div >
                    <button class="btn btn-success" onClick={props.onClick}>Login</button>
                </div>
            </div>


        </div>


    )
}