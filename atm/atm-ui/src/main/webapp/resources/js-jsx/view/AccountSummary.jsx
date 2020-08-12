class AccountSummary extends React.Component {

    render() {
        return (<div class="card border-success mb-3">
            <div class="smbc-color-primary card-header border-success"></div>
            <div class="card-body text-success">
                <h4 class="card-title">{this.props.accountNumber}</h4>
                <div class="float-right">
                    <h1 class="card-text">${this.props.balance}</h1>
                    <p class="card-subtitle text-muted">Available Balance</p>
                </div>
            </div>
        </div>);
    }

}
