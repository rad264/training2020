class LoginController extends React.Component {
    constructor(props) {
        super(props);
        this.state = new LoginModel();
        this.onChange = this.onChange.bind(this);
        this.login = this.login.bind(this);
    };
    onChange(event) {
        this.setState(new LoginModel(event.target.value));
    }
    login() {

        const userId = this.state.userId;
        let handleResponse = (status, userId, accounts) => this.setState({ responseStatus: status, userId: userId, accounts: accounts }, () => {if(this.state.responseStatus === 200) {this.renderMain()}});
        $.ajax({
            
            url: "/atm-api/users/" + userId,
            type: "GET",
            success: function (response) {
                handleResponse(200, response.userId, response.accounts);
            },
            error: function (xhr, status, error) {
                handleResponse(xhr.status, "");
            }
        });
    }

    componentDidMount(){
        $("#login-form").focus()
    }

    renderMain(){
        ReactDOM.render(<Main userId={this.state.userId} accounts={this.state.accounts}/>, document.getElementById("root"));
    }

    render() {
        return(
            <LoginForm userId={this.state.userId} accounts={this.state.accounts} onChange={this.onChange} onClick={this.login} />
            
        )
    }
}

ReactDOM.render(<Main userId={"lbritton"} accounts={["123456","654321","567890"]}/>, document.getElementById("root"));
// ReactDOM.render(<LoginController/>, document.getElementById("root"));