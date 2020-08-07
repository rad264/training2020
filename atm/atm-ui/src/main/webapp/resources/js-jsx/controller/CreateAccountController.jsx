class CreateAccountController extends React.Component {
    constructor(props) {
        super(props);
        this.state = new CreateAccountModel(props.userId);

    }


    render(){
        return (
            <CreateAccountForm />
        )
    }
}