class AccountGroup extends React.Component {

    render() {

        const AccGroup = this;

        this.accounts = this.props.accounts;
        var accountCards = [];

        if (this.accounts) {
            this.accounts.forEach(function(e) {
                accountCards.push(<Account accountNumber={e.accountNumber} balance={e.balance} onClick={() => AccGroup.props.updateSelectedAccount(e.accountNumber)}/>);
            })
        }

        return (<div class="col-4" onClick={this.props.onClick}>
            {accountCards}
        </div>);
    }
}
