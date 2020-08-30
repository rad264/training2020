class PostCreateUserController extends React.Component {

    state = new PostCreateUserModel();

    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }
    postCreateUser = (e) => {
        if (!this.state.userId)
            return false;
        e.preventDefault();
        const userId = this.state.userId;
        let handleResponse = (status, createdUserId) => {
            this.setState({responseStatus: status, createdUserId: createdUserId});
        }
        handleResponse = handleResponse.bind(this);
        $.ajax({
            url: "/atm-api/users/",
            type: "POST",
            contentType: "application/json",
            data: userId,
            success: function(response) {
                handleResponse(200, response.createdUserId);
            },
            error: function(xhr, status, error) {
                handleResponse(xhr.status);
            }
        });
    }
    render() {
        return (<CreateUserCard userId={this.state.userId} onChange={this.onChange} onClick={this.postCreateUser} statusCode={this.state.responseStatus}/>);
    }
}
