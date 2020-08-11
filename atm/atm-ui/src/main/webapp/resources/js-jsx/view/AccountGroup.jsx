class AccountGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCardId: "1"
        }
        this.setActiveCard = this.setActiveCard.bind(this);
    }

    getInitialState() {
        return {selectedCardId: "1"}
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

        if (this.accounts) {
            this.accounts.forEach(function(e, i) {
                accountCards.push(<Account key={i} accountNumber={e.accountNumber} balance={e.balance} isActive={AccGroup.isActive(e.accountNumber)} onActiveCard={AccGroup.setActiveCard.bind(AccGroup, e.accountNumber)} onClick={() => AccGroup.props.updateSelectedAccount(e.accountNumber)}/>);
            })
        }

        return (<div onClick={this.props.onClick}>
            {accountCards}
        </div>);
    }
}
