class Transaction extends React.Component {

    render() {
        return (<tr>
            <th scope="row">{this.props.date}</th>
            <td colspan="2">{this.props.type}</td>
            <td>${this.props.amount}</td>
            <td>${this.props.balance}</td>
        </tr>);
    }

}
