class LoginController extends React.Component {
    state = new GetUserModel();

    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        });
    };
    onSubmit = () => {
        this.props.onUserIdChange(this.state.userId);
    };
    getUser = (e) => {
        if (!this.state.userId) return false;
        e.preventDefault();
        var _this = this;
        const userId = this.state.userId;
        let handleResponse = (status, accountNumbers) =>
            this.setState({
                responseStatus: status,
                accountNumbers: accountNumbers,
                isLoading: false,
            });
        handleResponse = handleResponse.bind(this);
        this.setState({ isLoading: true });
        $.ajax({
            url: "/atm-api/users/" + userId,
            type: "GET",
            contentType: "application/json",
            success: function (response) {
                handleResponse(200, response.accounts);
                hashHistory.push({
                    pathname: "/dashboard",
                    state: {
                        userId: userId,
                        initialAccountNumber: response.accounts.length
                            ? response.accounts[0]
                            : null,
                    },
                });
            },
            error: function (xhr, status, error) {
                handleResponse(xhr.status);
            },
        });
    };
    render() {
        return (
            <LoginCard
                userId={this.state.userId}
                onChange={this.onChange}
                onClick={this.getUser}
                statusCode={this.state.responseStatus}
                isLoading={this.state.isLoading}
            />
        );
    }
}
