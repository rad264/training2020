class AccountSummary extends React.Component {

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
                alert = <AlertFail error={"Account Not Found."}/>;
                break;
            default:
                alert = <AlertFail error={"Unexpected Error."}/>;
                break;
        }

        return (<div class="card border-success mb-3">
            <div class="smbc-color-primary card-header border-success"></div>
            <div class="card-body text-success">
                <h1 class="card-title smbc-color1">{this.props.accountType}</h1>
                    <div class="d-flex justify-content-between">
                        <h2 class="card-title smbc-color2">{this.props.accountNumber}</h2>
                        <h1 class="display-4">${Number.parseFloat(this.props.balance).toFixed(2)}</h1>
                    </div>
                <div class="float-right">
                    <p class="card-subtitle text-muted">Available Balance</p>
                </div>
            </div>
            {alert}
        </div>);
    }

}
