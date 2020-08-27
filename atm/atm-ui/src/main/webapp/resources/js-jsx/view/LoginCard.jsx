class LoginCard extends React.Component {

    render() {

        return (<div class="bg-login">

            <div class="container pt-5 loginCard">

                <div class="jumbotron">

                    <h1 class="text-center">Login</h1>
                    <hr class="my-4"></hr>

                    <form autocomplete="off">
                        <label for="userId">Username</label>
                        <div class="form-group row">
                            <div class="col-12 input-group input-group-lg">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">
                                        <i class="fas fa-user"></i>
                                    </span>
                                </div>
                                <input type="text" class="form-control" placeholder="username" name="userId" onChange={this.props.onChange} value={this.props.userId} required="required"></input>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-6">
                                <Alert statusCode={this.props.statusCode} action={"Login"}></Alert>
                            </div>
                            <div class="col-6">
                                <input
                                    type="submit"
                                    class="btn btn-smbc btn-lg btn-block login_btn"
                                    disabled={this.props.isLoading}
                                    onClick={!this.props.isLoading ? this.props.onClick : null}
                                    value={this.props.isLoading ? 'Loading…' : "Login"}
                                    ></input>
                            </div>
                        </div>
                    </form>

                    <hr class="my-4"></hr>
                    <div>
                        <a href="#collapseExample" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseExample">Register User</a>
                    </div>
                    <div class="collapse" id="collapseExample">
                        <PostCreateUserController></PostCreateUserController>
                    </div>

                </div>
            </div>
        </div>);
    }
}

// <input type="submit" value="Login" class="btn btn-smbc btn-lg btn-block login_btn" onClick={this.props.onClick}></input>
