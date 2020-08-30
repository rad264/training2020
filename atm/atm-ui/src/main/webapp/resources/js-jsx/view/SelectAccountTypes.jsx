class SelectAccountTypes extends React.Component {

    render() {

        const {label, nameAlt, onChange, accountType} = this.props;

        var accountTypes = ['Checking', 'Saving', 'Money Market', 'Certificate of Deposit', 'Individual Retirement']

        var accountTypeOptions = [<option selected="selected" disabled="disabled">Select Account Type</option>
            ];

        accountTypes.forEach(function(n, i) {
            accountTypeOptions.push(<option>{n}</option>)
        })

        return (<div class="form-group row">
            <label for="accountType" class="col-5 col-form-label">{label}
                Account Type</label>
            <div class="col-7">
                <select class="form-control" name={nameAlt
                        ? nameAlt
                        : "accountType"} onChange={onChange} value={accountType}>
                    {accountTypeOptions}
                </select>
            </div>
        </div>);
    }

}
