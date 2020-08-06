function SummaryForm(props) {
    let summaries;
    if (props.summary) {
        console.log(props.summary.split("\n"))

        summaries = props.summary.split("\n").map((summary) => {
            if (summary) {
                console.log(summary)
                return (
                    <div>
                        <div class="card account-summary col-md-6">
                            <div class="card-body">
                                <h5 class="card-title">{summary.substring(7)}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">{summary.substring(0,5)}</h6>
                                <a href="#" class="card-link">Deposit</a>
                                <a href="#" class="card-link">Withdraw</a>
                            </div>
                        </div>
                    </div>

                )
            }
        });

    }

    return (
        <div>
            <p> {summaries}</p>
        </div>

    )
}