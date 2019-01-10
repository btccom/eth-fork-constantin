import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Ts from 'Trans';
import {
  formatNumber,
  second2Relative,
  timestamp2Relative,
  getCurrentTimestamp,
  timestamp2UTC,
  handlerToByte
} from 'utils';
import RCTable from '../../../components/ui/RCTable';
import '../index.scss';
@withRouter //必须放在最前面
@inject('store')
@observer
export default class Overview extends Component {
  constructor(props) {
    super(props);
    this.appStore = this.props.store.appStore;
    this.store = this.props.store.homeStore;
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

  getUpgradeProgress = (forkStatusInfo, isForked) => {
    if (isForked) {
      return '100%';
    }
    let progressStartHeight = 6840000;
    return (
      formatNumber(
        ((forkStatusInfo.latest_height - progressStartHeight) /
          (this.store.forkTargetHeight - progressStartHeight)) *
          100,
        2
      ) + '%'
    );
  };

  getBlockSpan = () => {
    return (
      this.store.forkTargetHeight - this.store.forkStatusInfo.latest_height
    );
  };

  render() {
    const { lang } = this.appStore;
    const {
      isForked,
      isFinishedQuery,
      forkStatusInfo,
      forkTargetHeight
    } = this.store;

    return (
      <div className="countdown-container">
        <h1>
          <Ts transKey="pages.upgradedTip" />
        </h1>
        <p className="block-upgrade">
          <span className="current-block">{forkStatusInfo.latest_height}</span>
          <span className="target-block"> / {forkTargetHeight}</span>
          {` `}
          <span className="md-font">
            <Ts transKey="pages.block" />
          </span>
        </p>
        {isFinishedQuery && !isForked && (
          <div className="countdown-progress">
            <p>
              <span
                className="relative"
                style={{
                  width: this.getUpgradeProgress(forkStatusInfo)
                }}
              />
            </p>
            <span className="progress-text">
              {this.getUpgradeProgress(forkStatusInfo)}
            </span>
          </div>
        )}

        <div className="countdown-info">
          <ul>
            <li className={`${isForked ? 'text-center' : ''}`}>
              <span className="em-text">
                {timestamp2Relative(
                  forkStatusInfo.latest_height_timestamp,
                  lang,
                  false
                )}{' '}
              </span>
              <Ts transKey="pages.sinceLastBlock" />
            </li>
            {!isForked && (
              <li>
                <span className="em-text">{this.getBlockSpan()} </span>
                <Ts transKey="pages.blockstoGo" />
              </li>
            )}
          </ul>
          <p>
            {isForked && <i className="cell-icon check-mark-icon" />}
            {isForked ? (
              <Ts
                transKey="pages.forkedAt"
                values={{
                  block: this.store.forkTargetHeight,
                  time: timestamp2UTC(
                    this.store.forkStatusInfo.fork_timestamp * 1000
                  )
                }}
              />
            ) : (
              <Ts
                transKey="pages.activeAt"
                values={{
                  block: this.store.forkTargetHeight,
                  time: '2019-01-16 UTC'
                }}
              />
            )}
          </p>
          <p className="fork-remark">
            <Ts transKey="pages.forkRemark" />{' '}
            <a className="link" href="#introduction">
              <Ts transKey="pages.viewMore" />
            </a>
          </p>
        </div>
      </div>
    );
  }
}
