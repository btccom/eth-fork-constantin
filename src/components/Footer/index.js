import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import LocaleSelect from '../LocaleSelect';
import './index.scss';
//const Option = Select.Option;

@inject('store')
@observer
export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.appStore;
  }

  handleLocaleChange = value => {
    this.props.onLocaleChange(value);
  };

  render() {
    const { lang, currentYear } = this.store;
    return (
      <div className="view-width">
        <div className="footer relative" id="footerContainer">
          <div className="footer-left">
            <a
              href="https://btc.com/"
              target="_blank"
              className="footer-logo"
            />

            <div className="footer-copyright">
              @ Copyright BTC.com {currentYear}. All Rights Reserved.
            </div>
          </div>
          <div className="footer-middle">
            <ul className="footer-contact">
              <li>
                <a
                  className="email"
                  href="mailto:support.explorer@btc.com?subject=Mail from Our Site"
                  target="_blank"
                />
              </li>
              <li>
                <a
                  className="twitter"
                  href="https://twitter.com/btccom_official"
                  target="_blank"
                />
              </li>
              <li>
                <a
                  className="weibo"
                  href="https://weibo.com/u/5995599784?is_hot=1"
                  target="_blank"
                />
              </li>
              <li>
                <a
                  className="telegram"
                  href="https://t.me/eth_explorer"
                  target="_blank"
                />
              </li>
            </ul>
          </div>
          <div className="footer-right">
            <LocaleSelect
              onLocaleChange={this.handleLocaleChange}
              lang={lang}
            />
          </div>
        </div>
      </div>
    );
  }
}
