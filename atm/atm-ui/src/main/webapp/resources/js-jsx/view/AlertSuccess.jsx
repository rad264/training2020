class AlertSuccess extends React.Component {
    render() {
        return (
            <div class="alert alert-success" role="alert">
                <strong>{this.props.msg}</strong>
            </div>
        );
    }
}
