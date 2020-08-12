class AccountGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCardId: "123456"
        }
        this.setActiveCard = this.setActiveCard.bind(this);
    }

    isActive(id) {
        return this.state.selectedCardId === id;
    }

    setActiveCard(selectedCardId) {
        this.setState({selectedCardId});
    }

    render() {

        const AccGroup = this;

        this.accounts = this.props.accounts;
        var accountCards = [];
        var totalBalance = 0;

        if (this.accounts) {

            this.accounts.forEach(function(e, i) {
                accountCards.push(<Account key={i} accountNumber={e.accountNumber} balance={e.balance} isActive={AccGroup.isActive(e.accountNumber)} onActiveCard={AccGroup.setActiveCard.bind(AccGroup, e.accountNumber)} onClick={() => AccGroup.props.updateSelectedAccount(e.accountNumber)}/>);
                totalBalance += e.balance;
            })
        }

        return (<div onClick={this.props.onClick}>
            {accountCards}
            <div class="d-flex justify-content-between">
                <span>Total Balance:</span>
                <span>${totalBalance}</span>
            </div>
        </div>);
    }
}
