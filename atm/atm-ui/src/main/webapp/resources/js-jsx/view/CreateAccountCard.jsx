class CreateAccountCard extends React.Component {
    render() {
        const {
            userId,
            onChange,
            accountType,
            statusCode,
            onClick,
        } = this.props;

        return (
            <div class="card mb-3">
                <div class="card-body text-success">
                    <form autocomplete="off">
                        <SelectAccountTypes
                            userId={userId}
                            onChange={onChange}
                            accountType={accountType}
                        ></SelectAccountTypes>
                        <div class="form-group row">
                            <div class="col-8">
                                <Alert
                                    statusCode={statusCode}
                                    action={"Create Account"}
                                ></Alert>
                            </div>
                            <div class="col-4">
                                <button
                                    type="submit"
                                    class="btn btn-smbc mb-2 float-right"
                                    onClick={onClick}
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
