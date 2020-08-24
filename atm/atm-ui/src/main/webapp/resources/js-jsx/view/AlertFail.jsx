class AlertFail extends React.Component {

    render() {
        return (<div class="alert alert-danger" role="alert">
            <strong>{this.props.error}</strong>
        </div>);
    }

}
