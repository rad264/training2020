class NavBarDashboard extends React.Component {

    render() {
        return (<div>
            <header class="App-header">
                <nav class="navbar navbar-expand-lg navbar-dark smbc-color-navbar">
                    <a class="navbar-brand" href="#">
                        <img src="resources/images/logo_group.png" alt=""></img>
                        </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto">
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
                        <ul class="nav navbar-nav navbar-right">
                            <li class="dropdown">
                                <a href='#' class="dropdown-toggle smbc-color-primary" data-toggle="dropdown">
                                    <i class="fa fa-fw fa-user"></i>
                                    <strong>{this.props.userId}</strong>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-right">
                                    <li>
                                        <a class="dropdown-item" href="/#/dashboard">Account</a>
                                        <a class="dropdown-item" href="#" onClick={() => {
                                                hashHistory.goBack()
                                            }}>Logout</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </div>);
    }
}
