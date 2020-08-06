function SummaryForm(props) {
    let summaries;
    if (props.summary) {
        console.log(props.summary.split("\n"))

        summaries = props.summary.split("\n").map((summary) => {
            if (summary) {
                console.log(summary)
                return (
                    <div>
                        <p>{summary}</p>
                    </div>
                )
            }
        });

    }

    return (
        <div>
            {/* <div>{summaries}</div> */}
            <p>Summary works</p>
            <p> {summaries}</p>
        </div>

    )
}