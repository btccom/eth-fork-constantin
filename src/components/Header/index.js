import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Ts from 'Trans';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { getCountdownTime, getCurrentTimestamp, timestamp2UTC } from 'utils';
import './index.scss';
@withRouter //必须放在最前面
@inject('store')
@observer
class Header extends Component {
  constructor(props) {
    super(props);
    this.appStore = this.props.store.appStore;
    this.state = {
      intlTitle: this.appStore.lang === 'zh-CN' ? '中文' : 'English'
    };
  }

  handleChangeLuange = (key, text) => {
    this.setState({ intlTitle: text });
    this.appStore.setLocaleLang(key);
  };

  render() {
    const { lang } = this.appStore;

    return (
      <div className="header">
        <div className="view-width">
          <a href="https://eth.btc.com" target="_blank" className="logo" />
          <Link to="/">
            <div className="app-name">
              <Ts transKey="pages.appName" />
            </div>
          </Link>
          <div className="header-pull-right">
            <div className="intl-select">
              <DropdownButton title={this.state.intlTitle} id="intlSelect">
                <MenuItem
                  eventKey="en-US"
                  onClick={() => {
                    this.handleChangeLuange('en-US', 'English');
                  }}
                >
                  English
                </MenuItem>
                <MenuItem
                  eventKey="zh-CN"
                  onClick={() => {
                    this.handleChangeLuange('zh-CN', '中文');
                  }}
                >
                  中文
                </MenuItem>
              </DropdownButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
