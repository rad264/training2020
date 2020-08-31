class AccountGroup extends React.Component {
    state = {
        selectedAccount: 0,
    };

    isActive(id) {
        return this.state.selectedAccount === id;
    }

    setActiveCard = (selectedAccount) => {
        this.setState({ selectedAccount });
    };

    render() {
        const { statusCode, accounts } = this.props;

        let alert;
        switch (statusCode) {
            case null:
                alert = null;
                break;
            case 200:
                alert = null;
                break;
            case 404:
                alert = <AlertFail error={"User Not Found."} />;
                break;
            default:
                alert = <AlertFail error={"Unexpected Error."} />;
                break;
        }

        const _this = this;

        var accountCards = [];
        var totalBalance = 0;

        if (accounts) {
            accountCards = accounts.map((account, i) => (
                <Account
                    key={i}
                    accountNumber={account.accountNumber}
                    accountType={account.accountType}
                    balance={account.balance}
                    isActive={_this.isActive(i)}
                    onActiveCard={_this.setActiveCard.bind(_this, i)}
                    onClick={() =>
                        _this.props.updateSelectedAccount(account.accountNumber)
                    }
                ></Account>
            ));

            totalBalance = accounts.reduce((a, b) => a + b.balance, 0);
        }

        totalBalance = totalBalance.toFixed(2);

        return (
            <div>
                {accountCards}
                <div class="d-flex justify-content-between">
                    <h5>Total Balance:</h5>
                    <h5 class="smbc-color1">${totalBalance}</h5>
                </div>
                {alert}
            </div>
        );
    }
}
