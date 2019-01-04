import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Ts from 'Trans';
import Table from '../../components/ui/Table';
import RateLabel from '../../components/ui/RateLabel';
import Chart from '../../components/Chart';
import { Grid, Row, Col } from 'react-bootstrap';
import {
  getCurrency,
  second2Relative,
  abbreviateNumber,
  abbreviateNumber_zh,
  abbreviateNumber_en
} from 'utils';
import Overview from './section/Overview';
import RewardChart from './section/RewardChart';
import Introduction from './section/Introduction';

import './index.scss';

@withRouter //必须放在最前面
@inject('store')
@observer
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.homeStore;
    this.appsStore = this.props.store.appStore;
    this.state = {
      intervalId: null
    };
  }

  componentWillMount() {
    this.store.getAll();
  }
  componentDidMount() {
    let intervalId = setInterval(this.loopQuery.bind(this), 20000);
    this.setState({
      intervalId: intervalId
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  loopQuery = () => {
    this.store.getInstantData();
  };

  render() {
    const { lang } = this.appsStore;
    const {
      forkInfo,
      isForked,
      isFinishedQuery,
      statsInfo,
      bchBlockList,
      bsvBlockList,
      transactionXAxisChartData_zh,
      transactionXAxisChartData_en,
      transactionChartData_BCH,
      transactionChartData_BSV,
      blockRewardXAxisChartData_zh,
      blockRewardXAxisChartData_en,
      blockRewardChartData_BCH,
      blockRewardChartData_BSV,
      bchSpecialCodeList,
      bsvSpecialCodeList
    } = this.store;

    const bchColumns = [
      {
        title: <Ts transKey="pages.height" />,
        align: 'left',
        render: data => {
          return (
            <a
              className="link"
              href={`https://bch.btc.com/${data.block_hash}`}
              target="_blank"
            >
              {data.height}
            </a>
          );
        }
      },
      {
        title: <Ts transKey="pages.relayedBy" />,
        align: 'left',
        className: 'with-icon-left-header',
        render: data => {
          return (
            <span className="with-icon-left">
              {data.miner}
              {data.icon_url && (
                <i
                  className="cell-icon token-name-icon"
                  style={{ backgroundImage: `url(${data.icon_url})` }}
                />
              )}
            </span>
          );
        }
      },
      {
        title: <Ts transKey="pages.Time" />,
        render: data => {
          return <span>{second2Relative(data.time_in_sec, lang)}</span>;
        }
      }
    ];

    const bsvColumns = [
      {
        title: <Ts transKey="pages.height" />,
        align: 'left',
        render: data => {
          return (
            <a
              className={`link relative ${
                isForked && forkInfo.fork_height <= data.height
                  ? 'bsv-color'
                  : ''
              }`}
              // href={`https://bsv.btc.com/${data.block_hash}`}
              href="javascript:void 0"
              target="_blank"
            >
              {data.height}
              {isForked && forkInfo.fork_height == data.height && (
                <i className="cell-icon forked-icon" />
              )}
            </a>
          );
        }
      },
      {
        title: <Ts transKey="pages.relayedBy" />,
        align: 'left',
        className: 'with-icon-left-header',
        render: data => {
          return (
            <span
              className={`with-icon-left ${
                isForked && forkInfo.fork_height <= data.height
                  ? 'bsv-color'
                  : ''
              }`}
            >
              {data.miner}
              {data.icon_url && (
                <i
                  className="cell-icon token-name-icon"
                  style={{ backgroundImage: `url(${data.icon_url})` }}
                />
              )}
            </span>
          );
        }
      },
      {
        title: <Ts transKey="pages.Time" />,
        render: data => {
          return (
            <span
              className={`${
                isForked && forkInfo.fork_height <= data.height
                  ? 'bsv-color'
                  : ''
              }`}
            >
              {second2Relative(data.time_in_sec, lang)}
            </span>
          );
        }
      }
    ];

    return (
      <div className="view-width relative" style={{ marginBottom: 100 }}>
        <Overview
          forkInfo={forkInfo}
          isForked={isForked}
          isFinishedQuery={isFinishedQuery}
        />
        <Grid>
          <Row>
            <Col xs={12} sm={12} md={6}>
              <RewardChart />
            </Col>
            <Col xs={12} sm={12} md={6}>
              <RewardChart />
            </Col>
          </Row>
          <Row className="margin-top-lg ">
            <Col xs={12} sm={12} md={12}>
              <RewardChart />
            </Col>
          </Row>
          <Row className="margin-top-lg ">
            <Col xs={12} sm={12} md={12}>
              <Introduction />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
