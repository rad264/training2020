function SummaryForm(props) {
    let summaries;
    if (props.summary) {
        summaries = props.summary.split("\n").map((summary) => {
            if (summary) {
                return (
                    <div>
                        <div class="card account-summary col-md-4">
                            <div class="card-body">
                                <h5 class="card-title">{summary.substring(7)}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">{summary.substring(0, 6)}</h6>
                                <a role="button" class="card-link deposit-navbar-button">Deposit</a>
                                <a role="button" class="card-link withdraw-navbar-button">Withdraw</a>
                            </div>
                        </div>
                    </div>

                )
            }
        });

    }

    return (
        <div>
            <br></br>
            <div class="col-md-6">
                <h3 class="card-title">Account overview</h3>
            </div>

            <div>
                {summaries}
            </div>
        </div>
    )
}