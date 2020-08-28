class SelectAccountTypes extends React.Component {

    render() {
        var accountTypes = [
            'Checkings',
            'Savings',
            'Money Market',
            'Certificates of Deposit',
            'Retirement'
        ]

        var accountTypeOptions = [<option selected disabled>Select Account Type</option>
            ];

        accountTypes.forEach(function(n, i) {
            accountTypeOptions.push(<option>{n}</option>)
        })

        return (<div class="form-group row">
            <label for="accountType" class="col-5 col-form-label">{this.props.label} Account Type</label>
            <div class="col-7">
                <select class="form-control" name={this.props.nameAlt ? this.props.nameAlt : "accountType"} onChange={this.props.onChange} value={this.props.accountType}>
                    {accountTypeOptions}
                </select>
            </div>
        </div>);
    }

}
