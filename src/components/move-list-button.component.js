import React from 'react';

export default class MoveListButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    };
  }

  render() {
    return (
      <li>
        <button
          id={this.props.move}
          className="btn"
          onClick={() => this.props.onClick(this.props.move)}
        >
          {this.props.desc}: {this.props.currentPosition}
        </button>
      </li>
    );
  }
}
