class AccountSummary extends React.Component {

    render() {
        return (<div class="card border-success mb-3">
            <div class="smbc-color-secondary card-header border-success"></div>
            <div class="card-body text-success">
                <h3>{this.props.accountNumber}</h3>
                <h5 class="card-title float-right">${this.props.balance}</h5>
            </div>
            <div class="card-footer bg-transparent border-success">Available Balance</div>
        </div>);
    }

}
