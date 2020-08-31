class AccountSummary extends React.Component {
    render() {
        const { statusCode, accountType, accountNumber, balance } = this.props;

        return (
            <div class="card border-success mb-3">
                <div class="smbc-color-primary card-header border-success"></div>
                <div class="card-body text-success">
                    <h1 class="card-title smbc-color1">{accountType}</h1>
                    <div class="d-flex justify-content-between">
                        <h2 class="card-title smbc-color2">{accountNumber}</h2>
                        <h1 class="display-4">
                            ${Number.parseFloat(balance).toFixed(2)}
                        </h1>
                    </div>
                    <div class="float-right">
                        <p class="card-subtitle text-muted">
                            Available Balance
                        </p>
                    </div>
                </div>
                <Alert statusCode={statusCode} action="Account Summary"></Alert>
            </div>
        );
    }
}
