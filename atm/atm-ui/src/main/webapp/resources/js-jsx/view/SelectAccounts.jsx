class SelectAccounts extends React.Component {

    constructor(props) {
        super(props);
        this.state = new GetAccountNumbersModel(props.userId);
        this.getAccountNumbers = this.getAccountNumbers.bind(this);
    }

    componentDidMount() {
        this.getAccountNumbers();
    }

    componentWillReceiveProps(nextProps) {
        this.setState(new GetAccountNumbersModel(nextProps.userId), () => {
            this.getAccountNumbers();
        });
    }

    getAccountNumbers() {
        const userId = this.state.userId;
        let handleResponse = (status, accountNumbers) => this.setState({responseStatus: status, accountNumbers: accountNumbers});
        handleResponse = handleResponse.bind(this);
        $.ajax({
            url: "/atm-api/users/" + userId,
            type: "GET",
            contentType: "application/json",
            success: function(response) {
                handleResponse(200, response.accounts);
            },
            error: function(xhr, status, error) {
                handleResponse(xhr.status);
            }
        });
    }

    render() {

        var accountNumbersOptions = [<option selected disabled>Select Account</option>
            ];
        if (this.state.accountNumbers) {
            this.state.accountNumbers.forEach(function(n, i) {
                accountNumbersOptions.push(<option>{n}</option>)
            })
        }

        return (<div class="form-group row">
            <label for="accountNumber" class="col-5 col-form-label">{this.props.label} Account Number</label>
            <div class="col-7">
                <select class="form-control" name={this.props.nameAlt ? this.props.nameAlt : "accountNumber"} onChange={this.props.onChange} value={this.props.accountNumber}>
                    {accountNumbersOptions}
                </select>
            </div>
        </div>);
    }

}
