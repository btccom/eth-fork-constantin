import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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
export default class BlockList extends Component {
  constructor(props) {
    super(props);
    this.appStore = this.props.store.appStore;
    this.store = this.props.store.homeStore;
  }

  componen;

  animationHoc = (index, key, targetEle) => {
    if (index === 0) {
      return (
        <div>
          <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={1000}
            transitionEnterTimeout={1000}
            transitionEnter={true}
            transitionLeave={false}
          >
            <span key={key}> {targetEle}</span>
          </ReactCSSTransitionGroup>
        </div>
      );
    } else {
      return targetEle;
    }
  };

  render() {
    const { lang } = this.appStore;
    const { latestBlockList } = this.store;

    const columns = [
      {
        title: <Ts transKey="pages.height" />,
        dataIndex: 'block_height',
        key: 'block_height',
        width: 110,
        align: 'left',
        fixed: 'left',
        render: (block_height, data, index) => {
          return this.animationHoc(index, block_height, block_height);
        },
        isShowAfterForked: true
      },
      {
        title: <Ts transKey="pages.age" />,
        dataIndex: 'time_in_sec',
        key: 'time_in_sec',
        align: 'left',
        render: (time_in_sec, data, index) =>
          this.animationHoc(
            index,
            data.block_height,
            second2Relative(data.time_in_sec, lang)
          )
      },
      {
        title: <Ts transKey="pages.miner" />,
        width: '5%',
        align: 'left',
        dataIndex: 'miner_hash',
        key: 'miner_hash',
        render: (miner_hash, data, index) => {
          return this.animationHoc(
            index,
            data.block_height,
            <span className="cell-text-ellipsis" style={{ width: 130 }}>
              {' '}
              {data.miner_name ? data.miner_name : miner_hash}
            </span>
          );
        },
        isShowAfterForked: true
      },
      {
        title: <Ts transKey="pages.reward" />,
        dataIndex: 'block_reward',
        key: 'block_reward',
        render: (block_reward, data, index) =>
          this.animationHoc(
            index,
            data.block_height,
            formatNumber(block_reward, 5) + ' ETH'
          ),

        isShowAfterForked: true
      },
      {
        title: <Ts transKey="pages.blockTime" />,
        dataIndex: 'block_time_in_sec',
        key: 'block_time_in_sec',
        render: (block_time_in_sec, data, index) =>
          this.animationHoc(
            index,
            data.block_height,
            formatNumber(block_time_in_sec, 0) + ' s'
          )
      },
      {
        title: <Ts transKey="pages.txns" />,
        dataIndex: 'total_tx',
        key: 'total_tx',
        render: (total_tx, data, index) =>
          this.animationHoc(index, data.block_height, total_tx)
      },
      {
        title: <Ts transKey="pages.size" />,
        dataIndex: 'block_size',
        key: 'block_size',
        render: (block_size, data, index) =>
          this.animationHoc(index, data.block_height, handlerToByte(block_size))
      }
    ];

    return (
      <div>
        <RCTable
          hasFixedColumn={true}
          columns={columns}
          dataSource={latestBlockList.toJS()}
          style={{ width: '100%' }}
        />
      </div>
    );
  }
}
