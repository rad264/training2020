class Account extends React.Component {

    render() {

        return (<div className={this.props.isActive
                ? 'card mb-3'
                : 'card mb-3 inactive-bg'} onClick={() => {
                this.props.onClick();
                this.props.onActiveCard();
            }}>
            <div className={this.props.isActive
                    ? 'smbc-color-primary card-header'
                    : 'bg-transparent card-header'}></div>
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
