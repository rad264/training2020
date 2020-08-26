class Account extends React.Component {

    render() {

        return (<div className={this.props.isActive
                ? 'card mb-3 accountCard'
                : 'card mb-3 inactive-bg accountCard'} onClick={() => {
                this.props.onClick();
                this.props.onActiveCard();
            }}>
            <div className={this.props.isActive
                    ? 'smbc-color-primary card-header'
                    : 'bg-transparent card-header'}></div>
            <div class="card-body text-success">
                <h4 class="card-title smbc-color1">{this.props.accountNumber}</h4>
                <div class="float-right">
                    <h1 class="card-text">${Number.parseFloat(this.props.balance).toFixed(2)}</h1>
                    <p class="card-subtitle text-muted ml-4">Available Balance</p>
                </div>
            </div>
        </div>);
    }

}
