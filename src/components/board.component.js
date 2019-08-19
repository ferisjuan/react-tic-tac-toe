import React from 'react';

import Square from './square.component';

export default class Board extends React.Component {
  renderSquare(i) {
    return <Square value={this.props.squares[i]} key={i} onClick={() => this.props.onClick(i)} />;
  }

  render() {
    const rows = Array(3).fill(null);
    const cols = Array(3).fill(null);

    return (
      <div>
        {rows.map((row, j) => {
          return (
            <div className="board-row" key={j}>
              {cols.map((col, i) => {
                if (j === 0) {
                  return this.renderSquare(i);
                } else if (j === 1) {
                  return this.renderSquare(i + 3);
                } else {
                  return this.renderSquare(i + 6);
                }
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
