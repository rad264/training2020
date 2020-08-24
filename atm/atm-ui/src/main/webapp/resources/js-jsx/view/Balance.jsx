function Balance(props) {
    let error;
    if (props.statusCode && props.statusCode !== 200)
        error = props.statusCode === 404
            ? "Account Not Found"
            : "Unexpected Error";
    let balance = error ? (<div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>{error}</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>) : props.balance;
    return (<div>

        <p>Balance:
            <span style={{
                    color: error
                        ? "red"
                        : "green"
                }}>{balance}</span>
        </p>
    </div>);
}
