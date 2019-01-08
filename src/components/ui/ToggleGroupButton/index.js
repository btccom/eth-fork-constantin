import React, { Component } from 'react';
import Ts from 'Trans';
import {
  ToggleButtonGroup,
  ButtonToolbar,
  ToggleButton
} from 'react-bootstrap';
import './index.scss';
export default class ToggleGroupButton extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: 1
    };
  }

  handleChange(value) {
    this.setState({ value }, () => {
      this.props.onChange(value);
    });
  }

  render() {
    return (
      <div className="group-button-radio">
        <ul>
          <li
            className={`${this.state.value == '1' ? 'active' : ''}`}
            onClick={() => {
              this.handleChange(1);
            }}
          >
            {' '}
            <Ts transKey="pages.perHour" />
          </li>
          <li
            className={`${this.state.value == '2' ? 'active' : ''}`}
            onClick={() => {
              this.handleChange(2);
            }}
          >
            {' '}
            <Ts transKey="pages.perDay" />
          </li>
        </ul>

        {/* <ButtonToolbar>
          <ToggleButtonGroup
            type="radio"
            name="o"
            style={{ backgroundColor: '#fff' }}
            value={this.state.value}
            onChange={this.handleChange}
          >
            <ToggleButton value={1}>
              <Ts transKey="pages.perHour" />
            </ToggleButton>
            <ToggleButton value={2}>
              <Ts transKey="pages.perDay" />
            </ToggleButton>
          </ToggleButtonGroup>
        </ButtonToolbar> */}
      </div>
    );
  }
}
