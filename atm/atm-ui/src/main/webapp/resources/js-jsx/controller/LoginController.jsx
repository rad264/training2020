class LoginController extends React.Component {

    constructor(props) {
        super(props);
        this.state = new GetUserModel();
        this.onChange = this.onChange.bind(this);
        this.getUser = this.getUser.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(event) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }
    onSubmit() {
        this.props.onUserIdChange(this.state.userId);
    }
    getUser(e) {
        e.preventDefault();
        var _this = this;
        const userId = this.state.userId;
        let handleResponse = (status, accountNumbers) => this.setState({responseStatus: status, accountNumbers: accountNumbers});
        handleResponse = handleResponse.bind(this);
        $.ajax({
            url: "/atm-api/users/" + userId,
            type: "GET",
            contentType: "application/json",
            success: function(response) {
                handleResponse(200, response);
                var nextPath = '/dashboard';
                browserHistory.push({
                    pathname: nextPath,
                    state: {
                        userId: userId,
                        initialAccountNumber: response[0]
                    }
                });
            },
            error: function(xhr, status, error) {
                handleResponse(xhr.status);
            }
        });
    }
    render() {
        return (<LoginCard userId={this.state.userId} onChange={this.onChange} onClick={this.getUser} statusCode={this.state.responseStatus}/>);
    }
}
