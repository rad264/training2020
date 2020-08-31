class Alert extends React.Component {
    render() {
        const { statusCode, action } = this.props;

        let alert;
        switch (statusCode) {
            case null:
                alert = null;
                break;
            case 200:
                alert = <AlertSuccess msg={action + " Success."} />;
                break;
            case 400:
                if (action == "Register User")
                    alert = <AlertFail error={"User Already Exists."} />;
                else if (action == "Create Account")
                    alert = <AlertFail error={"Account Already Exists."} />;
                else alert = <AlertFail error={"Negative Amount Invalid."} />;
                break;
            case 403:
                alert = <AlertFail error={"Insufficient Funds."} />;
                break;
            case 404:
                if (action == "Login")
                    alert = <AlertFail error={"User Not Found."} />;
                else alert = <AlertFail error={"Account Not Found."} />;
                break;
            case 409:
                alert = <AlertFail error={"Create Account Failed."} />;
            case "Same Account":
                alert = <AlertFail error={"Same Account Selected."} />;
                break;
            default:
                alert = <AlertFail error={"Unexpected Error."} />;
                break;
        }

        return <div>{alert}</div>;
    }
}
