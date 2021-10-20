import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const game_size = 5;
function Square(props) {
    const className = props.highlight ? 'square highlight' : 'square';
    return (
        <button className={className}
                onClick={props.onClick}>{props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                // Highlight if the square's current pos "i" is in the winSquares returned from Games
                highlight={this.props.winSquares && this.props.winSquares.includes(i)}
            />
        );
    }
    renderRow(startingSlot){
        let rowButtons = [];
        for(let i = 0; i < game_size; ++i){
            rowButtons.push(this.renderSquare(startingSlot + i));
        }
        return (
            <div className="board-row">
                {rowButtons}
            </div>
        );
    }
    render() {
        let arrButtons = [];
        for(let i = 0; i < game_size**2; i += game_size){
            arrButtons.push(this.renderRow(i));
        }
        return (
            /*
            //Hardcode version
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                </div>
                <div className="board-row">
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                </div>
                <div className="board-row">
                    {this.renderSquare(10)}
                    {this.renderSquare(11)}
                    {this.renderSquare(12)}
                    {this.renderSquare(13)}
                    {this.renderSquare(14)}
                </div>
                <div className="board-row">
                    {this.renderSquare(15)}
                    {this.renderSquare(16)}
                    {this.renderSquare(17)}
                    {this.renderSquare(18)}
                    {this.renderSquare(19)}
                </div>
                <div className="board-row">
                    {this.renderSquare(20)}
                    {this.renderSquare(21)}
                    {this.renderSquare(22)}
                    {this.renderSquare(23)}
                    {this.renderSquare(24)}
                </div>
            </div>
            */
            <div>
                {arrButtons}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(game_size**2).fill(null)
                }
            ],
            stepNumber: 0,
            xIsNext: true,
            AscMovelist: true
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares).winner || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([
                {
                    squares: squares,
                    currentMove: i
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }
    /*
    findLatestMove(oldHistory, newHistory){
        console.log(1);
        for (let i = 0; i < newHistory.length; i++) {
            if (newHistory[i] && newHistory[i] !== oldHistory[i])
                return i;
        }
        return -1;
    }
    */

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const gameStatus = calculateWinner(current.squares);
        const winner = gameStatus.winner;

        let moves = history.map((step, move) => {
            const col = step.currentMove % game_size,
                row = ~~(step.currentMove / game_size),
                desc = move ?
                'Go to move #' + move +' [col: ' + col + ' - row: ' + row + ']' :
                'Go to game start';
            return (
                <li key={move}>
                    <button
                        className={move === this.state.stepNumber ? 'currently-selected-move-list' : ''}
                        onClick={() => this.jumpTo(move)}>{desc}
                    </button>
                </li>
            );
        });

        let status = winner ?
            "Winner: " + winner:
            gameStatus.drawResult ?
                "Draw!!":
                "Next player: " + (this.state.xIsNext ? "X" : "O");


        // reverse movelist due to state setting
        if(!this.state.AscMovelist)
            moves.reverse();
        return (
            <div className="game">
                <div id="author">
                    <h1>Tictactoe assignment 01</h1>
                    <p>by Phan Tan Dat - 18127078</p>
                </div>
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                        winSquares={(gameStatus.winSquares)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button
                        onClick={() => this.changSortOrder()}>
                        {this.state.AscMovelist ? 'Descending' : 'Ascending'}
                    </button>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }

    changSortOrder() {
        this.setState(
            {AscMovelist: !this.state.AscMovelist}
        );
    }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],

        [0, 5, 10, 15, 20],
        [1, 6, 11, 16, 21],
        [2, 7, 12, 17, 22],
        [3, 8, 13, 18, 23],
        [4, 9, 14, 19, 24],

        [0, 6, 12, 18, 24],
        [4, 8, 12, 16, 20]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c, d, e] = lines[i];
        if (squares[a]
            && squares[a] === squares[b]
            && squares[a] === squares[c]
            && squares[a] === squares[d]
            && squares[a] === squares[e]) {
            return {
                winner: squares[a],
                drawResult: false,
                winSquares: lines[i]
            };
        }
    }
    // Loop through all squares to check if there any possible move. If not -> Draw game
    for(let i = 0; i < squares.length; i++)
        if(squares[i] === null)
            return {
                winner: null,
                drawResult: false,
                winSquares: null
            };

    return {
        winner: null,
        drawResult: true,
        winSquares: null
    };
}
