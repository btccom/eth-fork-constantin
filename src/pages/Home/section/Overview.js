import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Ts from 'Trans';
import { second2Relative, getCurrentTimestamp, timestamp2UTC } from 'utils';
import Table from '../../../components/ui/Table';
import '../index.scss';
@withRouter //必须放在最前面
@inject('store')
@observer
export default class Overview extends Component {
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
    return '88.88%';
  };

  render() {
    const { lang } = this.appStore;
    const {} = this.props;

    const columns = [
      {
        title: <Ts transKey="pages.height" />,
        align: 'left',
        render: data => data.height
      },
      {
        title: <Ts transKey="pages.age" />,
        render: data => second2Relative(data.time_in_sec, lang)
      },
      {
        title: <Ts transKey="pages.miner" />,
        width: '5%',
        render: data => {
          return <span className="cell-text-ellipsis">{data.miner}</span>;
        }
      },
      {
        title: <Ts transKey="pages.reward" />,
        render: data => data.reward
      },
      {
        title: <Ts transKey="pages.blockTime" />,
        render: data => data.block_time
      },
      {
        title: <Ts transKey="pages.txns" />,
        render: data => data.txns_count
      },
      {
        title: <Ts transKey="pages.size" />,
        render: data => data.size
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
          <span className="current-block">3232</span>
          <span className="target-block"> / {123324}</span>
          {` `}
          <span className="md-font">
            <Ts transKey="pages.block" />
          </span>
        </p>
        <div className="countdown-progress">
          <p>
            <span
              className="relative"
              style={{
                width: this.getUpgradeProgress()
              }}
            />
          </p>
          <span className="progress-text">{this.getUpgradeProgress()}</span>
        </div>
        <div className="countdown-info">
          <ul>
            <li>
              <span className="em-text">{'00:13'} </span>
              <Ts transKey="pages.sinceLastBlock" />
            </li>
            <li>
              <span className="em-text">{'00:13'} </span>
              <Ts transKey="pages.sinceLastBlock" />
            </li>
          </ul>
          <p>
            <Ts transKey="pages.activeAt" />
          </p>
          <p className="fork-remark">
            <Ts transKey="pages.forkRemark" />{' '}
            <a className="link" href="">
              <Ts transKey="pages.viewMore" />
            </a>
          </p>
        </div>
        <Table columns={columns} dataSource={list} style={{ width: '100%' }} />
      </div>
    );
  }
}
