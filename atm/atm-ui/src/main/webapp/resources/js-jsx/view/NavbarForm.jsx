function NavbarForm() {
    return (
        <div>

            <nav class="navbar navbar-expand-lg navbar-dark bg-success">
                <a class="navbar-brand home-navbar-button" role="button">SMBC ATM</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active" >
                            <a class="nav-link home-navbar-button" role="button">Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="deposit-navbar-button" role="button">Deposit</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="withdraw-navbar-button" role="button">Withdraw</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="transfer-navbar-button" role="button">Transfer</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="check-balance-navbar-button" role="button">Balance</a>
                        </li>
                    </ul>

                </div>
            </nav>
        </div>

    )
}