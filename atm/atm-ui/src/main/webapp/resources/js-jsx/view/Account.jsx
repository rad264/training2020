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
                <h3 class="card-title smbc-color1">{this.props.accountType}</h3>
                <div class="d-flex justify-content-between">
                    <h4 class="card-title smbc-color2">{this.props.accountNumber}</h4>
                    <h1>${Number.parseFloat(this.props.balance).toFixed(2)}</h1>
                </div>
                <div class="float-right">
                    <p class="card-subtitle text-muted ml-4">Available Balance</p>
                </div>
            </div>
        </div>);
    }

}
