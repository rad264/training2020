function HistoryForm(props) {

    let histories;

    if (props.history) {
        histories = props.history.split("\n").reverse().map((history) => {
            console.log(history);
            if (history) {
                console.log(history)
                return (
                    <div>
                        <div class="card account-summary col-md-4">
                            <div class="card-body">
                                <h5 class="card-title">{history.split("at:")[0]}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">{history.split("at:")[1]}</h6>
                            </div>
                        </div>
                    </div>
                )
            }
        })
    }

    return (

        <div>
            <br></br>
            <div class="col-md-6">
                <h3 class="card-title">Account history <button class="btn btn-secondary btn-small" onClick={props.onClick}><span class="material-icons">refresh</span></button>
                </h3>

            </div>

            <div>
                {histories}

            </div>
        </div>

    )
}
