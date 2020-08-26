class CreateAccountCard extends React.Component {

    render() {

        return (<div class="card mb-3">
            <div class="card-body text-success">
                <form autocomplete="off">
                    <div class="form-group row">
                        <label for="accountNumber" class="col-5 col-form-label">Account Number</label>

                        <div class="col-7">
                            <input type="text" class="form-control" name="accountNumber" onChange={this.props.onChange} value={this.props.accountNumber} required></input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-8">
                            <Alert statusCode={this.props.statusCode} action={"Create Account"}></Alert>
                        </div>
                        <div class="col-4">
                            <button type="submit" class="btn btn-smbc mb-2 float-right" onClick={this.props.onClick}>Create</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>);
    }

}
