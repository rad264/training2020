class CreateAccountCard extends React.Component {

    render() {
        return (<div class="card border-success mb-3">
            <div class="card-header bg-transparent border-success">
                Create New Account:
            </div>
            <div class="card-body text-success">
                <form class="form-inline">
                    <div class="form-group mb-2">
                        <label for="accountNumber">Account Number:</label>
                    </div>
                    <div class="form-group mx-sm-3 mb-2">
                        <input type="text" class="form-control" id="accountNumber" name="accountNumber" onChange={this.props.onChange} value={this.props.accountNumber}></input>
                    </div>
                    <button type="submit" class="btn btn-primary mb-2" onClick={this.props.onClick}>Create Account</button>
                </form>
            </div>
            <div class="card-footer bg-transparent border-success">

            </div>
        </div>);
    }

}
