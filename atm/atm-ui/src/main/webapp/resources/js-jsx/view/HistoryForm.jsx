function HistoryForm(props) {
    
    let histories;

    if(props.history){
        histories = props.history.split("\n").reverse().map((history) =>{
            console.log(history);
            if(history) {
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
            <p>History works</p>
            <p>{histories}</p>
            <div >
                <button class="btn btn-primary" onClick={props.onClick}>Get history</button>

            </div>
        </div>
    )
}
