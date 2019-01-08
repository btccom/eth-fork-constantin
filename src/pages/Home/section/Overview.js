import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Ts from 'Trans';
import {
  formatNumber,
  second2Relative,
  timestamp2Relative,
  getCurrentTimestamp,
  timestamp2UTC
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
    return (
      formatNumber(
        ((forkStatusInfo.latest_height - 6850300) /
          (this.store.forkTargetHeight - 6850300)) *
          100,
        2
      ) + '%'
    );
    // return (
    //   formatNumber(
    //     (forkStatusInfo.latest_height / this.store.forkTargetHeight) * 100,
    //     2
    //   ) + '%'
    // );
  };

  getBlockSpan = () => {
    return (
      this.store.forkTargetHeight - this.store.forkStatusInfo.latest_height
    );
  };

  render() {
    const { lang } = this.appStore;
    const { isForked, isFinishedQuery, forkStatusInfo } = this.store;

    const columns = [
      {
        title: <Ts transKey="pages.height" />,
        dataIndex: 'height',
        key: 'height',
        width: 140,
        align: 'left',
        fixed: 'left',
        render: (height, data) => data.height
      },
      {
        title: <Ts transKey="pages.age" />,
        dataIndex: 'time_in_sec',
        key: 'time_in_sec',
        render: (time_in_sec, data) => second2Relative(data.time_in_sec, lang)
      },
      {
        title: <Ts transKey="pages.miner" />,
        width: '5%',
        dataIndex: 'miner',
        key: 'miner',
        render: (miner, data) => {
          return <span className="cell-text-ellipsis">{data.miner}</span>;
        }
      },
      {
        title: <Ts transKey="pages.reward" />,
        dataIndex: 'reward',
        key: 'reward',
        render: (reward, data) => data.reward
      },
      {
        title: <Ts transKey="pages.blockTime" />,
        dataIndex: 'block_time',
        key: 'block_time',
        render: (block_time, data) => data.block_time
      },
      {
        title: <Ts transKey="pages.txns" />,
        dataIndex: 'txns_count',
        key: 'txns_count',
        render: (txns_count, data) => data.txns_count
      },
      {
        title: <Ts transKey="pages.size" />,
        dataIndex: 'size',
        key: 'size',
        render: (size, data) => data.size
      }
    ];

    let list = [];
    for (let i = 0; i < 10; i++) {
      list.push({
        height: 783982,
        time_in_sec: 235,
        miner: 'Ethermine',
        reward: 234,
        block_time: 21,
        txns_count: 189,
        size: 85939
      });
    }

    return (
      <div className="countdown-container">
        <h1>
          <Ts transKey="pages.upgradedTip" />
        </h1>
        <p className="block-upgrade">
          <span className="current-block">{forkStatusInfo.latest_height}</span>
          <span className="target-block"> / {7080000}</span>
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
            <li>
              <span className="em-text">
                {timestamp2Relative(
                  forkStatusInfo.latest_height_timestamp,
                  lang
                )}{' '}
              </span>
              <Ts transKey="pages.sinceLastBlock" />
            </li>
            <li>
              <span className="em-text">{this.getBlockSpan()} </span>
              <Ts transKey="pages.sinceLastBlock" />
            </li>
          </ul>
          <p>
            {isForked && <i className="cell-icon check-mark-icon" />}
            <Ts
              transKey="pages.activeAt"
              values={{
                block: this.store.forkTargetHeight,
                time: timestamp2UTC(
                  this.store.forkStatusInfo.fork_timestamp * 1000
                )
              }}
            />
          </p>
          <p className="fork-remark">
            <Ts transKey="pages.forkRemark" />{' '}
            <a className="link" href="#introduction">
              <Ts transKey="pages.viewMore" />
            </a>
          </p>
        </div>
        <RCTable
          columns={columns}
          dataSource={list}
          style={{ width: '100%' }}
        />
      </div>
    );
  }
}
