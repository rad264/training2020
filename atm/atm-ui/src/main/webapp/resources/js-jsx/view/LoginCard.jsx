class LoginCard extends React.Component {

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
                            <input type="text" class="form-control" placeholder="username" name="userId" onChange={this.props.onChange} value={this.props.userId} required="required"></input>
                        </div>
                        <div class="form-group">
                            <input type="submit" value="Login" class="btn btn-smbc btn-lg btn-block login_btn" onClick={this.props.onClick}></input>
                        </div>
                    </form>
                    <Alert statusCode={this.props.statusCode} action={"Login"}></Alert>
                </div>
            </div>

        </div>);
    }
}
