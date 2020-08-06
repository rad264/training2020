class Account extends React.Component {

    render() {
        return (<div class="card border-success mb-3">
        <div class="card-header bg-transparent border-success">{this.props.accountNumber}</div>
        <div class="card-body text-success">
        <h5 class="card-title">${this.props.balance}</h5>
        </div>
        <div class="card-footer bg-transparent border-success">Available Balance</div>
        </div>);
    }

}
