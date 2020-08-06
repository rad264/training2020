class NavbarController extends React.Component {
    constructor(props) {
        super(props);
        this.state = new NavbarModel();
        this.onChange = this.onChange.bind(this);
    };

    onChange(event) {
        this.setState(new CheckBalanceModel(event.target.value));
    };

    render() {
        return (
            <NavbarForm />

        )
    };


}
