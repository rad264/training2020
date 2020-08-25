class Alert extends React.Component {

    render() {

        let alert;
        switch (this.props.statusCode) {
            case(null):
                alert = null;
                break;
            case 200:
                alert = <AlertSuccess msg={this.props.action + " Success."}/>;
                break;
            case 404:
                alert = <AlertFail error={"Account Not Found."}/>;
                break;
            case "Same Account":
                alert = <AlertFail error={"Same Account Selected."}/>;
                break;
            default:
                alert = <AlertFail error={"Unexpected Error."}/>;
                break;
        }

        return (<div>
            {alert}
        </div>);
    }

}
