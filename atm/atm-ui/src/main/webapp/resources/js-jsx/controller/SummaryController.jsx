class SummaryController extends React.Component {
    constructor(props) {
        super(props);
        this.state = new SummaryModel("", "l");
        // this.onChange = this.onChange.bind(this);
        this.getSummary = this.getSummary.bind(this);

    };

    // onChange(event) {
    //     console.log("changin")
    //     this.setState(new SummaryModel(event.target.value));
    // };

    componentDidMount(){
        this.getSummary();
    }

    getSummary() {
        const userId = this.state.userId;
        let handleResponse = (status, content) => this.setState({ responseStatus: status, summary: content});
        handleResponse = handleResponse.bind(this);
        $.ajax({
            url: "/atm-api/summary/" + userId,
            type: "GET",
            success: function (response) {
                handleResponse(200, response.content);
            }.bind(this),
            error: function (xhr, status, error) {
                console.log("error")
                handleResponse(xhr.status);
            }
        });

    }

    render() {
        return(
            <SummaryForm summary={this.state.summary} />
        )
    }
}