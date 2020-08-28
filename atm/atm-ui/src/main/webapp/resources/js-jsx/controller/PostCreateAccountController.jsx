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
        if (!this.state.accountType)
            return false;
        e.preventDefault();
        let _this = this;
        const userId = this.props.userId;
        const accountType = this.state.accountType;
        let handleResponse = (status, createdAccountType) => {
            this.setState({responseStatus: status, createdAccountType: createdAccountType});
            if (status == 200)
                this.props.updateDashboard();
            }
        handleResponse = handleResponse.bind(this);
        $.ajax({
            url: "/atm-api/accounts/",
            type: "POST",
            contentType: "application/json",
            data: accountType,
            data: JSON.stringify({
                userId: userId,
                accountType: accountType
            }),
            success: function(response) {
                handleResponse(200, response.createdAccountType);
                if (response.accountNumber)
                    _this.props.updateSelectedAccount(response.accountNumber)
            },
            error: function(xhr, status, error) {
                handleResponse(xhr.status);
            }
        });
    }
    render() {
        return (<CreateAccountCard accountType={this.state.accountType} onChange={this.onChange} onClick={this.postCreateAccount} statusCode={this.state.responseStatus}/>);
    }
}
