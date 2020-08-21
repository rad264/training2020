class LoginCard extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = new DashboardModel("123456");
    //     this.updateSelectedAccount = this.updateSelectedAccount.bind(this);
    // }
    //
    // updateSelectedAccount(accountNumber) {
    //     this.setState(new DashboardModel(accountNumber));
    // }

    render() {
        return (<div class="bg-login">

            <div class="container pt-5 loginCard">

                <div class="jumbotron">
                    <h1 class="text-center">Login</h1>
                    <hr class="my-4"></hr>
                    <form autocomplete="off">
                        <label for="userId">Username</label>
                        <div class="input-group form-group input-group-lg">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="fas fa-user"></i>
                                </span>
                            </div>
                            <input type="text" class="form-control" placeholder="username" name="userId" onChange={this.props.onChange} value={this.props.userId}></input>
                        </div>
                        <div class="form-group">
                            <input type="submit" value="Login" class="btn btn-primary btn-lg btn-block login_btn" onClick={this.props.onClick}></input>
                        </div>
                    </form>
                </div>
            </div>

        </div>);
    }
}
