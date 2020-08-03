class Square extends React.Component {
    render() {
        return (
            <button
                className="square"
                onClick={() => { this.props.onClick() }}
            >
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        let boardSquares = [];
        for (let i = 0; i < 3; i++) {
            let boardRow = [];
            for (let j = 0; j < 3; j++) {
                boardRow.push(<span>{this.renderSquare(i + (j * 3))}</span>);
            }
            boardSquares.push(<div className="board-row">{boardRow}</div>)
        }
        return (

            <div>
                {boardSquares}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            renderMovesAscending: true,
        }
    }

    handleClick(i) {
        const locations = [
            [1, 1],
            [2, 1],
            [3, 1],
            [1, 2],
            [2, 2],
            [3, 2],
            [1, 3],
            [2, 3],
            [3, 3]
        ];
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                location: locations[i],
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        })
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        let moves;
        if (this.state.renderMovesAscending) {
            moves = history.map((step, move) => {
                const desc = move ?
                    'Go to move #' + move + " (" + history[move].location + ")"
                    :
                    'Go to game start';

                return (
                    <li key={move}>
                        <button onClick={() => this.jumpTo(move)}>{move === this.state.stepNumber ? <b>{desc}</b> : desc}
                        </button>
                    </li>
                )
            });
        } else {
            moves = history.slice(0).reverse().map((step, move) => {
                const desc = move ?
                    'Go to move #' + [history.length - move] + " (" + history.slice(0).reverse()[move].location + ")"
                    :
                    'Go to game start';

                return (
                    <li key={move}>
                        <button onClick={() => this.jumpTo(history.length - move)}>{history.length - move === this.state.stepNumber ? <b>{desc}</b> : desc}
                        </button>
                    </li>
                )
            });
        }


        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                    <div><button onClick={() =>
                        this.state.renderMovesAscending = !this.state.renderMovesAscending
                    }
                    >
                        Invert history order
                    </button>
                    </div>
                </div>
            </div>
        );
    }
}
// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;

}