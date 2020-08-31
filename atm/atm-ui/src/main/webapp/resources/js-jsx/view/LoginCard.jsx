class LoginCard extends React.Component {
    render() {
        const { onChange, userId, statusCode, isLoading, onClick } = this.props;

        return (
            <div class="bg-login">
                <div class="container pt-5 loginCard">
                    <div class="jumbotron bg-opacity">
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
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="username"
                                        name="userId"
                                        onChange={onChange}
                                        value={userId}
                                        required="required"
                                    ></input>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-6">
                                    <Alert
                                        statusCode={statusCode}
                                        action={"Login"}
                                    ></Alert>
                                </div>
                                <div class="col-6">
                                    <button
                                        type="submit"
                                        class="btn btn-smbc btn-lg btn-block"
                                        disabled={isLoading}
                                        onClick={!isLoading ? onClick : null}
                                    >
                                        {isLoading ? (
                                            <span>
                                                <span
                                                    class="spinner-border spinner-border-sm mb-1"
                                                    role="status"
                                                    aria-hidden="true"
                                                ></span>
                                                &nbsp;&nbsp;
                                                <span>Loading...</span>
                                            </span>
                                        ) : (
                                            "Login"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>

                        <hr class="my-4"></hr>
                        <div class="text-center">
                            <span>Not a user?</span>&nbsp;
                            <a
                                href="#collapseExample"
                                class="registerHere"
                                data-toggle="collapse"
                                role="button"
                                aria-expanded="false"
                                aria-controls="collapseExample"
                            >
                                Register Here
                            </a>
                        </div>
                        <div class="collapse" id="collapseExample">
                            <PostCreateUserController></PostCreateUserController>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
