import React from 'react';
import Board from './board.component';
import calculateWinner from './calculate-winner.service';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      position: [
        {
          col: null,
          row: null
        }
      ],
      stepNumber: 0,
      isXNext: true
    };
  }

  getPosition(i) {
    if (i >= 0 && i < 3) {
      return { row: 1, col: i + 1 };
    } else if (i >= 3 && i < 6) {
      return { row: 2, col: i - 2 };
    } else {
      return { row: 3, col: i - 5 };
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const currentPosition = this.state.position.slice(0, this.state.stepNumber + 1);
    const playedPosition = this.getPosition(i);

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.isXNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{ squares }]),
      position: currentPosition.concat(playedPosition),
      stepNumber: history.length,
      isXNext: !this.state.isXNext
    });
  }

  jumpTo(stepNumber) {
    this.setState({
      stepNumber,
      isXNext: stepNumber % 2 === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      const position = this.state.position[move];
      const currentPosition = position.col
        ? 'Col - ' + position.col + ', Row - ' + position.row
        : '';

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {desc}: {currentPosition}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner is ' + winner;
    } else {
      status = 'Next player: ' + (this.state.isXNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
