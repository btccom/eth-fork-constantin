import React, { Component } from 'react';
import Ts from 'Trans';
import './index.scss';

class ChartMarkButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'remove'
    };
  }

  handleClick = () => {
    this.setState(
      { type: this.state.type === 'add' ? 'remove' : 'add' },
      () => {
        this.props.onClick(this.state.type === 'add' ? 'remove' : 'add');
      }
    );
  };
  render() {
    return (
      <div
        className={`chartmark-button`}
        href="javascript:void 0"
        onClick={this.handleClick}
      >
        <i className={`mark-icon ${this.state.type}-icon`} />
        <Ts transKey="pages.chartForkRemarkText" />
      </div>
    );
  }
}

export default ChartMarkButton;
