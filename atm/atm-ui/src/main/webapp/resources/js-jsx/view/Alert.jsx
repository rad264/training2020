class Alert extends React.Component {
    render() {
        const AlertSuccess = ({ text }) => (
            <div class="alert alert-success" role="alert">
                <strong>{text}</strong>
            </div>
        );

        const AlertFail = ({ text }) => (
            <div class="alert alert-danger" role="alert">
                <strong>{text}</strong>
            </div>
        );

        const { statusCode, action } = this.props;

        let alert;
        switch (statusCode) {
            case null:
                alert = null;
                break;
            case 200:
                if (
                    action == "Account Group" ||
                    action == "Account Summary" ||
                    action == "Transactions"
                )
                    alert = null;
                else alert = <AlertSuccess text={action + " Success."} />;
                break;
            case 400:
                if (action == "Register User")
                    alert = <AlertFail text={"User Already Exists."} />;
                else if (action == "Create Account")
                    alert = <AlertFail text={"Account Already Exists."} />;
                else alert = <AlertFail text={"Negative Amount Invalid."} />;
                break;
            case 403:
                alert = <AlertFail text={"Insufficient Funds."} />;
                break;
            case 404:
                if (action == "Login" || action == "Account Group")
                    alert = <AlertFail text={"User Not Found."} />;
                else alert = <AlertFail text={"Account Not Found."} />;
                break;
            case 409:
                alert = <AlertFail text={"Create Account Failed."} />;
            case "Same Account":
                alert = <AlertFail text={"Same Account Selected."} />;
                break;
            default:
                alert = <AlertFail text={"Unexpected error."} />;
                break;
        }

        return <div>{alert}</div>;
    }
}
