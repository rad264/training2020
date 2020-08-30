class SelectAccounts extends React.Component {

    state = new GetAccountNumbersModel(this.props.userId);

    componentDidMount() {
        this.getAccountNumbers();
    }

    componentWillReceiveProps(nextProps) {
        this.setState(new GetAccountNumbersModel(nextProps.userId), () => {
            this.getAccountNumbers();
        });
    }

    getAccountNumbers = () => {
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

        const {label, nameAlt, onChange, accountNumber} = this.props;

        var accountNumbersOptions = [<option selected="selected" disabled="disabled">Select Account</option>
            ];
        if (this.state.accountNumbers) {
            this.state.accountNumbers.forEach(function(n, i) {
                accountNumbersOptions.push(<option>{n}</option>)
            })
        }

        return (<div class="form-group row">
            <label for="accountNumber" class="col-5 col-form-label">{label}
                Account Number</label>
            <div class="col-7">
                <select class="form-control" name={nameAlt
                        ? nameAlt
                        : "accountNumber"} onChange={onChange} value={accountNumber}>
                    {accountNumbersOptions}
                </select>
            </div>
        </div>);
    }

}
