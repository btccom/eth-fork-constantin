import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Ts from 'Trans';
import LocaleSelect from '../LocaleSelect';
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

  handleLocaleChange = value => {
    this.props.onLocaleChange(value);
  };

  handleChangeLuange = (key, text) => {
    this.setState({ intlTitle: text });
    this.appStore.setLocaleLang(key);
  };

  handleLogoClick = () => {
    if (window.ga) {
      window.ga('send', 'event', 'LinkOut', 'diversion', 'EthExplore');
    }
  };

  render() {
    const { lang } = this.appStore;

    return (
      <div className="header">
        <div className="view-width">
          <a
            href="https://btc.com/"
            target="_blank"
            className="logo"
            onClick={this.handleLogoClick}
          />
          <a
            href="https://eth.btc.com"
            target="_blank"
            style={{ display: 'inline-block' }}
          >
            <div className="app-name">
              <Ts transKey="pages.appName" />
            </div>
          </a>
          <div className="header-pull-right">
            <div className="intl-select">
              <LocaleSelect
                onLocaleChange={this.handleLocaleChange}
                lang={lang}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
