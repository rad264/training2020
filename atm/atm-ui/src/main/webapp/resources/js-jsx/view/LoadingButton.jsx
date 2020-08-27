class LoadingButton extends React.Component {
render() {
    return (
        <input
            type="submit"
            class="btn btn-smbc float-right"
            disabled={this.props.isLoading}
            onClick={!this.props.isLoading ? this.props.onClick : null}
            value={this.props.isLoading ? 'Loading…' : this.props.value}
            >
        </input>
    );
}
}
