class HistoryController extends React.Component {
    constructor(props) {
        super(props);
        this.state = new HistoryModel("","123456");
        this.getHistory = this.getHistory.bind(this);

    };

    getHistory(){
        const accountNumber = this.state.accountNumber;
        let handleResponse = (status, content) => this.setState({ responseStatus: status, history: content});
        handleResponse = handleResponse.bind(this);
        $.ajax({
            url: "/atm-api/history/" + accountNumber,
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
            <HistoryForm history={this.state.history} onClick={this.getHistory}/>
        )
    }
}