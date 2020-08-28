class CreateAccountCard extends React.Component {

    render() {

        return (<div class="card mb-3">
            <div class="card-body text-success">
                <form autocomplete="off">
                    <SelectAccountTypes userId={this.props.userId} onChange={this.props.onChange} accountType={this.props.accountType}></SelectAccountTypes>
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
