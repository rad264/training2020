class LoadingButton extends React.Component {
    render() {
        const { isLoading, onClick, value } = this.props;

        return (
            <input
                type="submit"
                class="btn btn-smbc float-right"
                disabled={isLoading}
                onClick={!isLoading ? onClick : null}
                value={isLoading ? "Loading…" : value}
            ></input>
        );
    }
}
