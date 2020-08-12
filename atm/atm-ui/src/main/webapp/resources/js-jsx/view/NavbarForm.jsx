function NavbarForm(props) {
    return (
        <div>

            <nav class="navbar navbar-expand-lg navbar-dark bg-success">
                <a class="navbar-brand home-navbar-button" role="button">SMBC ATM</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item" >
                            <a class="nav-link home-navbar-button active" role="button">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link deposit-navbar-button" role="button">Deposit</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link withdraw-navbar-button" role="button">Withdraw</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link transfer-navbar-button" role="button">Transfer</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link history-navbar-button" role="button">History</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link create-account-navbar-button" role="button">Open</a>
                        </li>
                    </ul>
                    <div id="user-id-display" class="form-inline my-2 my-lg-0 ">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item" >
                            <a class="nav-link user-navbar-button " role="button">{props.currentUser}</a>
                        </li>

                    </ul>                    
                    </div>
                </div>
            </nav>
        </div>

    )
}