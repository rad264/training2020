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

        const {statusCode, accounts} = this.props;

        let alert;
        switch (statusCode) {
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

        const _this = this;

        var accountCards = [];
        var totalBalance = 0;

        if (accounts) {

            accounts.forEach(function(e, i) {
                accountCards.push(<Account key={i} accountNumber={e.accountNumber} accountType={e.accountType} balance={e.balance} isActive={_this.isActive(i)} onActiveCard={_this.setActiveCard.bind(_this, i)} onClick={() => _this.props.updateSelectedAccount(e.accountNumber)}/>);
                totalBalance += e.balance;
            })
        }

        totalBalance = totalBalance.toFixed(2);

        return (<div>
            {accountCards}
            <div class="d-flex justify-content-between">
                <h5>Total Balance:</h5>
                <h5 class="smbc-color1">${totalBalance}</h5>
            </div>
            {alert}
        </div>);
    }
}
