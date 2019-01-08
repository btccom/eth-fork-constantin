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
    return (
      formatNumber(
        ((forkStatusInfo.latest_height - 6840000) /
          (this.store.forkTargetHeight - 6840000)) *
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
      latestBlockList
    } = this.store;

    const columns = [
      {
        title: <Ts transKey="pages.height" />,
        dataIndex: 'block_height',
        key: 'block_height',
        width: 140,
        align: 'left',
        fixed: 'left',
        render: (block_height, data) => block_height
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
        align: 'left',
        dataIndex: 'miner_hash',
        key: 'miner_hash',
        render: (miner_hash, data) => {
          return (
            <span className="cell-text-ellipsis" style={{ width: 130 }}>
              {' '}
              {data.miner_name ? data.miner_name : miner_hash}
            </span>
          );
        }
      },
      {
        title: <Ts transKey="pages.reward" />,
        dataIndex: 'block_reward',
        key: 'block_reward',
        render: (block_reward, data) => formatNumber(block_reward, 5) + ' ETH'
      },
      {
        title: <Ts transKey="pages.blockTime" />,
        dataIndex: 'block_time_in_sec',
        key: 'block_time_in_sec',
        render: (block_time_in_sec, data) =>
          formatNumber(block_time_in_sec, 0) + ' s'
      },
      {
        title: <Ts transKey="pages.txns" />,
        dataIndex: 'total_tx',
        key: 'total_tx',
        render: (total_tx, data) => total_tx
      },
      {
        title: <Ts transKey="pages.size" />,
        dataIndex: 'block_size',
        key: 'block_size',
        render: (block_size, data) => handlerToByte(block_size)
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
                  lang,
                  false
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
                time: isForked
                  ? timestamp2UTC(
                      this.store.forkStatusInfo.fork_timestamp * 1000
                    )
                  : '2019-01-16'
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
          dataSource={latestBlockList.toJS()}
          style={{ width: '100%' }}
        />
      </div>
    );
  }
}
