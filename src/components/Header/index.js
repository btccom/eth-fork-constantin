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
      intervalId: null,
      currentSecond: Math.floor(new Date().getTime() / 1000),
      relativeTime: '',
      intlTitle: this.appStore.lang === 'zh-CN' ? '中文' : 'English'
    };
  }

  componentDidMount() {
    let intervalId = setInterval(this.loopRelative.bind(this), 1000);
    this.setState({
      intervalId: intervalId
    });
  }

  componentWillReceiveProps(nextProps) {
    if (getCurrentTimestamp() >= nextProps.fork_time) {
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  loopRelative = () => {
    this.setState({
      currentSecond: this.state.currentSecond + 1
    });
  };

  handleChangeLuange = (key, text) => {
    this.setState({ intlTitle: text });
    this.appStore.setLocaleLang(key);
  };

  getUpgradeProgress = (forkInfo, isForked) => {
    return forkInfo.fork_percent;
    // if (isForked) {
    //   return '100%';
    // }
    // //let fork_time = forkInfo.fork_time;
    // let fork_time = 1553200000;
    // let current = Math.round(new Date().getTime() / 1000);
    // console.log(current);
    // if (!fork_time) {
    //   return 0;
    // } else {
    //   let percent = current / fork_time;
    //   if (percent > 0.9999 && current !== fork_time) {
    //     return 99.99 + '%';
    //   } else if (current === fork_time) {
    //     return '100%';
    //   }
    //   return ((current / fork_time) * 100).toFixed(2) + '%';
    // }
  };

  render() {
    const { lang } = this.appStore;
    const { forkInfo, isForked, isFinishedQuery } = this.props;

    return (
      <div className="header">
        <div className="header-left" />
        <div className="view-width header-center relative">
          <a href="https://bch.btc.com" target="_blank" className="logo" />
          {!isForked ? (
            <div className="count-down-container">
              <p className="fork-text-tip">
                <Ts transKey="pages.upgradedTipBefore" />
              </p>
              <div className="fork-time">
                {getCountdownTime(
                  forkInfo.fork_time,
                  this.state.currentSecond,
                  lang
                ).map(item => {
                  return (
                    <span style={{ marginRight: 10 }} key={item}>
                      {item}
                    </span>
                  );
                })}
              </div>
              {isFinishedQuery && (
                <div className="countdown-progress">
                  <p>
                    <span
                      className="relative"
                      style={{
                        width: this.getUpgradeProgress(forkInfo, isForked)
                      }}
                    >
                      <i>{this.getUpgradeProgress(forkInfo, isForked)}</i>
                    </span>
                  </p>
                </div>
              )}

              <p style={{ textAlign: 'center', marginTop: 30, fontSize: 12 }}>
                * <Ts transKey="pages.countDownTip" />
              </p>
            </div>
          ) : (
            <div className="count-down-container">
              <div className="fork-text-tip" style={{ marginTop: 80 }}>
                <Ts
                  transKey="pages.upgradedTipAfter"
                  values={{
                    block: forkInfo.fork_height
                  }}
                />
                <p className="fork-utc-time">
                  {forkInfo.fork_time
                    ? timestamp2UTC(forkInfo.fork_time * 1000)
                    : '--'}
                </p>
              </div>
            </div>
          )}
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
        <div className="header-right" />
      </div>
    );
  }
}

export default Header;
