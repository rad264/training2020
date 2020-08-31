class NavBarDashboard extends React.Component {
    render() {
        const { location, userId } = this.props;

        return (
            <div>
                <header class="App-header">
                    <nav class="navbar navbar-expand-lg navbar-dark smbc-color-navbar">
                        <a class="navbar-brand" href="#">
                            <img
                                src="resources/images/logo_group.png"
                                alt=""
                            ></img>
                        </a>
                        <button
                            class="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div
                            class="collapse navbar-collapse"
                            id="navbarSupportedContent"
                        >
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item active">
                                    <a
                                        class="nav-link"
                                        href="/#/dashboard"
                                        onClick={() => {
                                            event.preventDefault();
                                            hashHistory.push(location);
                                        }}
                                    >
                                        Dashboard
                                    </a>
                                </li>
                            </ul>
                            <ul class="nav navbar-nav navbar-right">
                                <li class="dropdown">
                                    <a
                                        href="#"
                                        class="dropdown-toggle smbc-color-primary"
                                        data-toggle="dropdown"
                                    >
                                        <i class="fa fa-fw fa-user"></i>
                                        <strong>{userId}</strong>
                                    </a>
                                    <ul class="dropdown-menu dropdown-menu-right">
                                        <li>
                                            <button
                                                type="button"
                                                class="btn btn-block btn-danger"
                                                href="#"
                                                onClick={() => {
                                                    hashHistory.goBack();
                                                }}
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}
