function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
}

function LoadingButton(props) {
    const [isLoading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (isLoading) {
            simulateNetworkRequest().then(() => {
                setLoading(false);
            });
        }
    }, [isLoading]);

    const handleClick = () => {
        setLoading(true);
    }

    return (
        <input
        type="submit"
        class="btn btn-smbc btn-lg btn-block login_btn"
        disabled={isLoading}
        onClick={!isLoading ? handleClick : null}
        value={isLoading ? 'Loading…' : props.value}
        ></input>
    );
}
