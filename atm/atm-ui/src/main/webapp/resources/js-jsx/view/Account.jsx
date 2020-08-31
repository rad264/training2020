class Account extends React.Component {

    render() {
        const {
            isActive,
            accountType,
            accountNumber,
            balance,
            onClick,
            onActiveCard,
        } = this.props;

        return (
            <div
                className={
                    isActive
                        ? "card mb-3 accountCard"
                        : "card mb-3 inactive-bg accountCard"
                }
                onClick={() => {
                    onClick();
                    onActiveCard();
                }}
            >
                <div
                    className={
                        isActive
                            ? "smbc-color-primary card-header"
                            : "bg-transparent card-header"
                    }
                ></div>
                <div class="card-body text-success">
                    <h3 class="card-title smbc-color1">{accountType}</h3>
                    <div class="d-flex justify-content-between">
                        <h4 class="card-title smbc-color2">{accountNumber}</h4>
                        <h1>${Number.parseFloat(balance).toFixed(2)}</h1>
                    </div>
                    <div class="float-right">
                        <p class="card-subtitle text-muted ml-4">
                            Available Balance
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
