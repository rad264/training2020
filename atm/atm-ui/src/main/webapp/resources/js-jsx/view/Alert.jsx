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
            case 400:
                if (this.props.action == "Register User")
                    alert = <AlertFail error={"User Already Exists."}/>;
                else if (this.props.action == "Create Account")
                    alert = <AlertFail error={"Account Already Exists."}/>;
                else
                    alert = <AlertFail error={"Negative Amount Invalid."}/>;
                break;
            case 403:
                alert = <AlertFail error={"Insufficient Funds."}/>;
                break;
            case 404:
                if (this.props.action == "Login")
                    alert = <AlertFail error={"User Not Found."}/>;
                else
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
