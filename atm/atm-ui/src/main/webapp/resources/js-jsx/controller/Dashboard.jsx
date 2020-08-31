const AvailableAccounts = ({
    userId,
    accountNumber,
    updateSelectedAccount,
    updateDashboard,
}) => (
    <div class="container pt-5">
        <div class="row">
            <div class="col-4">
                <h3>Accounts</h3>

                <GetAccountsController
                    userId={userId}
                    updateSelectedAccount={updateSelectedAccount}
                />

                <div class="card-header smbc-color-primary border-success mt-5">
                    Create Account
                </div>
                <PostCreateAccountController
                    userId={userId}
                    updateDashboard={updateDashboard}
                    updateSelectedAccount={updateSelectedAccount}
                />
            </div>
            <div class="col-8">
                <h3>&nbsp;</h3>
                <GetSummaryController
                    userId={userId}
                    accountNumber={accountNumber}
                />
                <AccountActions
                    userId={userId}
                    accountNumber={accountNumber}
                    updateDashboard={updateDashboard}
                />
                <GetTransactionsController
                    userId={userId}
                    accountNumber={accountNumber}
                />
            </div>
        </div>
    </div>
);

const NoAvailableAccounts = ({
    userId,
    updateSelectedAccount,
    updateDashboard,
}) => (
    <div class="container pt-5">
        <div class="row">
            <div class="col-12">
                <div class="card-header smbc-color-primary border-success">
                    Create Account
                </div>
                <PostCreateAccountController
                    userId={userId}
                    updateDashboard={updateDashboard}
                    updateSelectedAccount={updateSelectedAccount}
                />
            </div>
        </div>
    </div>
);

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        const { userId, initialAccountNumber } = props.location.state;
        this.state = new DashboardModel(
            userId,
            initialAccountNumber ? initialAccountNumber : null
        );
    }

    updateSelectedAccount = (accountNumber) => {
        this.setState({ accountNumber: accountNumber });
    };

    updateSelectedUserId = (userId) => {
        this.setState({ userId: userId });
    };

    updateDashboard = () => {
        this.setState((prevState) => ({ state: prevState }));
        // this.setState({state: this.state});
    };

    render() {
        const { userId, accountNumber } = this.state;

        return (
            <div class="app-bg">
                <NavBarDashboard
                    userId={userId}
                    location={this.props.location}
                />{" "}
                {this.state.accountNumber ? (
                    <AvailableAccounts
                        userId={userId}
                        accountNumber={accountNumber}
                        updateDashboard={this.updateDashboard}
                        updateSelectedAccount={this.updateSelectedAccount}
                    />
                ) : (
                    <NoAvailableAccounts
                        userId={userId}
                        updateDashboard={this.updateDashboard}
                        updateSelectedAccount={this.updateSelectedAccount}
                    />
                )}
                <footer class="footer text-center">
                    <div class="container">
                        <span>© James Wong 2020</span>
                    </div>
                </footer>
            </div>
        );
    }
}
