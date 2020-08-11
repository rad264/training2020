class NavBarDashboard extends React.Component {

    render() {
        return (<div>
            <header class="App-header">
                <nav class="navbar navbar-expand-lg navbar-dark smbc-color-primary">
                    <a class="navbar-brand" href="#">SMBC</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                                <a class="nav-link" href="#">Home
                                    <span class="sr-only">(current)</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/#/dashboard">Dashboard</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Account
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="#">Deposit</a>
                                    <a class="dropdown-item" href="#">Withdraw</a>
                                    <a class="dropdown-item" href="#">Transfer</a>
                                </div>
                            </li>
                        </ul>
                        <span class="mr-sm-5 navbar-text">Signed in as:
                            <a href="#login">
                                 {this.props.userId}</a>
                        </span>
                        <div>
                            <button class="btn btn-success my-2 my-sm-0" type="submit" onClick={() => {
                                    hashHistory.goBack()
                                }}>
                                Logout</button>
                        </div>
                    </div>
                </nav>
            </header>
        </div>);
    }
}
