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

        let alert;
        switch (this.props.statusCode) {
            case(null):
                alert = null;
                break;
            case 200:
                alert = null;
                break;
            case 404:
                alert = <AlertFail error={"User Not Found."}/>;
                break;
            default:
                alert = <AlertFail error={"Unexpected Error."}/>;
                break;
        }

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

        totalBalance = totalBalance.toFixed(2);

        return (<div>
            {accountCards}
            <div class="d-flex justify-content-between">
                <span>Total Balance:</span>
                <span>${totalBalance}</span>
            </div>
            {alert}
        </div>);
    }
}
