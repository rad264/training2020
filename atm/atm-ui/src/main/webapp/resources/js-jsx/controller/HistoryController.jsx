class HistoryController extends React.Component {
    constructor(props) {
        super(props);
        this.state = new SummaryModel("", "l");
        // this.onChange = this.onChange.bind(this);
        // this.getSummary = this.getSummary.bind(this);

    };

    render() {
        return(
            <HistoryForm history={this.state.history} />
        )
    }
}