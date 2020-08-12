class CreateAccountController extends React.Component {
    constructor(props) {
        super(props);
        this.state = new CreateAccountModel(props.userId);
        this.createAccount = this.createAccount.bind(this);
        this.toast;
    }

    createAccount() {
        const userId = this.state.userId;
        let handleResponse = (status, newAccountNumber) => this.setState({ responseStatus: status, newAccountNumber: newAccountNumber });
        handleResponse = handleResponse.bind(this);

        $.ajax({
            url: "/atm-api/users/create-account/" + userId,
            type: "GET",
            success: function (response) {
                handleResponse(200, response.accounts[(response.accounts.length - 1)]);
            },
            error: function (xhr, status, error) {
                handleResponse(xhr.status);
            }
        });

    }

    render() {
        let newAccountMessage;
        if(this.state.newAccountNumber){
            newAccountMessage = "New account " + this.state.newAccountNumber + " created.";
        }
        return (
            <div>
                <CreateAccountForm userId={this.state.userId} onClick={this.createAccount} newAccountNumber={newAccountMessage} />
            </div>
        )
    }
}