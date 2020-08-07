function HistoryForm(props) {
    console.log(props)
    return (
        <div>
            <p>History works</p>
            <p>{props.history}</p>
            <div >
                <button class="btn btn-primary" onClick={props.onClick}>Get history</button>

            </div>
        </div>
    )
}
