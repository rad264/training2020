class AccountActions extends React.Component {

    render() {
        return (<div>
            <nav class="navbar-dark">
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <a class="nav-link active" id="nav-deposit-tab" data-toggle="tab" href="#nav-deposit" role="tab" aria-controls="nav-deposit" aria-selected="false">Deposit</a>
                    <a class="nav-link" id="nav-withdraw-tab" data-toggle="tab" href="#nav-withdraw" role="tab" aria-controls="nav-withdraw" aria-selected="false">Withdraw</a>
                    <a class="nav-link" id="nav-transfer-tab" data-toggle="tab" href="#nav-transfer" role="tab" aria-controls="nav-transfer" aria-selected="false">Transfer</a>
                    <a class="nav-link" id="nav-create-tab" data-toggle="tab" href="#nav-create" role="tab" aria-controls="nav-create" aria-selected="true">Create</a>
                    <a class="nav-link" id="nav-check-tab" data-toggle="tab" href="#nav-check" role="tab" aria-controls="nav-check" aria-selected="true">Check</a>
                </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-deposit" role="tabpanel" aria-labelledby="nav-deposit-tab">
                    <PostDepositController
                        userInfo={this.props.userInfo} accountNumber={this.props.accountNumber} updateDashboard={this.props.updateDashboard}/>
                </div>
                <div class="tab-pane fade" id="nav-withdraw" role="tabpanel" aria-labelledby="nav-withdraw-tab">
                    <PostWithdrawController accountNumber={this.props.accountNumber} updateDashboard={this.props.updateDashboard}/>
                </div>
                <div class="tab-pane fade" id="nav-transfer" role="tabpanel" aria-labelledby="nav-transfer-tab">
                    <PostTransferController fromAccountNumber={this.props.accountNumber} updateDashboard={this.props.updateDashboard}/>
                </div>
                <div class="tab-pane fade" id="nav-create" role="tabpanel" aria-labelledby="nav-create-tab">
                    <PostCreateAccountController userId={this.props.userId} updateDashboard={this.props.updateDashboard}/>
                </div>
                <div class="tab-pane fade" id="nav-check" role="tabpanel" aria-labelledby="nav-check-tab">
                    <div class="card">
                        <CheckBalanceController/>
                    </div>
                </div>
            </div>
        </div>);
    }

}
