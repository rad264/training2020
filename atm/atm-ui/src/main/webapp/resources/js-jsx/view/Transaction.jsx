class Transaction extends React.Component {

    render() {
        return (<tr>
            <td>{this.props.date}</td>
            <td>{this.props.type}</td>
            <td>${this.props.amount}</td>
            <td>${this.props.balance}</td>
        </tr>);
    }

}
