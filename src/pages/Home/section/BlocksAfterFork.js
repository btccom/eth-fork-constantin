import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Ts from 'Trans';
import { Grid, Row, Col } from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { formatNumber } from 'utils';
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
    const {
      isForked,
      isFinishedQuery,
      forkStatusInfo,
      historyBlockList,
      latestBlockList
    } = this.store;

    const latestColumns = [
      {
        dataIndex: 'id',
        key: 'id',
        className: 'smpadding-sides',
        render: (id, data) => {
          if (data.block_height === this.store.forkStatusInfo.fork_height) {
            return (
              <div>
                <i
                  className="cell-icon check-mark-icon sm"
                  style={{ marginLeft: 2 }}
                />
              </div>
            );
          } else {
            return null;
          }
        }
      },
      {
        title: <Ts transKey="pages.height" />,
        dataIndex: 'block_height',
        key: 'block_height',
        className: 'nopadding-left',
        width: 110,
        align: 'left',
        render: (block_height, data, index) => {
          return this.animationHoc(index, block_height, block_height);
        }
      },

      {
        title: <Ts transKey="pages.miner" />,
        align: 'left',
        dataIndex: 'miner_hash',
        key: 'miner_hash',
        render: (miner_hash, data, index) => {
          return this.animationHoc(
            index,
            data.block_height,
            <span className="cell-text-ellipsis" style={{ width: 110 }}>
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
        className: 'em-cell-primary',
        render: (block_reward, data, index) =>
          this.animationHoc(
            index,
            data.block_height,
            block_reward == '......' || !block_reward
              ? block_reward
              : formatNumber(block_reward, 5) + ' ETH'
          )
      }
    ];

    const historyColumns = [
      {
        dataIndex: 'id',
        key: 'id',
        className: 'smpadding-sides',
        render: (id, data) => {
          return (
            <div>
              <i
                className="cell-icon check-mark-icon sm place-holder"
                style={{ marginLeft: 2 }}
              />
            </div>
          );
        }
      },
      {
        title: <Ts transKey="pages.height" />,
        dataIndex: 'block_height',
        key: 'block_height',
        className: 'nopadding-left',
        width: 110,
        align: 'left',
        render: (block_height, data) => block_height
      },
      {
        title: <Ts transKey="pages.miner" />,
        align: 'left',
        dataIndex: 'miner_hash',
        key: 'miner_hash',
        render: (miner_hash, data) => {
          return (
            <span className="cell-text-ellipsis" style={{ width: 110 }}>
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
        className: 'em-cell-secondary',

        render: (block_reward, data) => formatNumber(block_reward, 5) + ' ETH'
      }
    ];

    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12} sm={12} md={6}>
              <RCTable
                rowKey="id"
                columns={latestColumns}
                dataSource={latestBlockList.toJS()}
                style={{ width: '100%' }}
              />
            </Col>
            <Col xs={12} sm={12} md={6} className="history-list-container">
              <RCTable
                rowKey="id"
                columns={historyColumns}
                dataSource={historyBlockList.toJS()}
                style={{ width: '100%' }}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
