function NavbarForm() {
    return (
        <div>

            <nav class="navbar navbar-expand-lg navbar-dark bg-success">
                <a class="navbar-brand" href="#">SMBC ATM</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active" >
                            <a class="nav-link" role="button">Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" role="button">Deposit</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" role="button">Withdraw</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" role="button">Transfer</a>
                        </li>
                    </ul>

                </div>
            </nav>
        </div>

    )
}