class PostCreateAccountController extends React.Component {
    constructor(props) {
        super(props);
        this.state = new PostCreateAccountModel();
        this.onChange = this.onChange.bind(this);
        this.postCreateAccount = this.postCreateAccount.bind(this);
    }
    onChange(event) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }
    postCreateAccount(e) {
        e.preventDefault();
        const accountNumber = this.state.accountNumber;
        let handleResponse = (status, createdAccountNumber) => this.setState({responseStatus: status, createdAccountNumber: createdAccountNumber});
        handleResponse = handleResponse.bind(this);
        $.ajax({
            url: "/atm-api/accounts/create/",
            type: "POST",
            contentType: "application/json",
            data: accountNumber,
            success: function(response) {
                handleResponse(200, response.createdAccountNumber);
            },
            error: function(xhr, status, error) {
                handleResponse(xhr.status);
            }
        });
    }
    render() {
        return (<CreateAccountCard accountNumber={this.state.accountNumber} onChange={this.onChange} onClick={this.postCreateAccount} statusCode={this.state.responseStatus}/>);
    }
}
