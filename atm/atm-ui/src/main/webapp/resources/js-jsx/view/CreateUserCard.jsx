class CreateUserCard extends React.Component {

    render() {
        const {onChange, newUserId, statusCode, onClick} = this.props;

        return (<div class="card mb-3 bg-transparent">
            <div class="card-body">

                <form autocomplete="off">
                    <div class="form-group input-group-lg row">
                        <label for="username" class="col-5 col-form-label">Username</label>

                        <div class="col-7">
                            <input type="text" class="form-control" name="userId" onChange={onChange} value={newUserId} required="required"></input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-6">
                            <Alert statusCode={statusCode} action={"Register User"}></Alert>
                        </div>
                        <div class="col-6">
                            <button type="submit" class="btn btn-smbc btn-lg btn-block mb-2 float-right" onClick={onClick}>Register</button>
                        </div>
                    </div>
                </form>

            </div>
        </div>);
    }

}
