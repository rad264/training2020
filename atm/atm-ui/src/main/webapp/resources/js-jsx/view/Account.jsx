class Account extends React.Component {

    render() {

        return (<div class="card border-success mb-3" onClick={() => {
                this.props.onClick();
                this.props.onActiveCard();
            }}>
            <div className={this.props.isActive
                    ? 'smbc-color-secondary card-header border-success'
                    : 'bg-transparent card-header border-success'}></div>
            <div class="card-body text-success">
                <h3>{this.props.accountNumber}</h3>
                <h5 class="card-title float-right">${this.props.balance}</h5>
            </div>
            <div class="card-footer bg-transparent border-success">Available Balance</div>
        </div>);
    }

}
