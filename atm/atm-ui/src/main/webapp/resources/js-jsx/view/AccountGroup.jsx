class AccountGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedAccount: 0
        }
        this.setActiveCard = this.setActiveCard.bind(this);
    }

    isActive(id) {
        return this.state.selectedAccount === id;
    }

    setActiveCard(selectedAccount) {
        this.setState({selectedAccount});
    }

    render() {

        const AccGroup = this;

        this.accounts = this.props.accounts;
        var accountCards = [];
        var totalBalance = 0;

        if (this.accounts) {

            this.accounts.forEach(function(e, i) {
                accountCards.push(<Account key={i} accountNumber={e.accountNumber} balance={e.balance} isActive={AccGroup.isActive(i)} onActiveCard={AccGroup.setActiveCard.bind(AccGroup, i)} onClick={() => AccGroup.props.updateSelectedAccount(e.accountNumber)}/>);
                totalBalance += e.balance;
            })
        }

        return (<div>
            {accountCards}
            <div class="d-flex justify-content-between">
                <span>Total Balance:</span>
                <span>${totalBalance}</span>
            </div>
        </div>);
    }
}
