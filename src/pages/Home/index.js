import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Ts from 'Trans';
import RateLabel from '../../components/ui/RateLabel';
import { Grid, Row, Col } from 'react-bootstrap';
import {
  getCurrency,
  second2Relative,
  abbreviateNumber,
  abbreviateNumber_zh,
  abbreviateNumber_en
} from 'utils';
import Overview from './section/Overview';
import RewardChart from '../Common/RewardChart';
import AvgGasChart from '../Common/AvgGasChart';
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
    console.log(window.location.href);
    this.state = {
      intervalId: null
    };
  }

  componentWillMount() {
    this.store.getForkInfo();
    this.store.getAvgGasChartData('20190103', 0);
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
        <Grid>
          <Row>
            <Col xs={12} sm={12} md={12}>
              <Overview
                forkInfo={forkInfo}
                isForked={isForked}
                isFinishedQuery={isFinishedQuery}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={6} className="relative">
              <div className="card hightlight" style={{ height: 500 }}>
                <RewardChart
                  onClickZoom={() => {
                    //debugger;
                    // this.props.history.push({
                    //   pathname: `/chartdetail`,
                    //   search: '?sort=name'
                    // });
                    window.open(
                      `${window.location.href}chartdetail/reward/`,
                      '_blank'
                    );
                  }}
                />
              </div>
            </Col>
            <Col xs={12} sm={12} md={6}>
              <div className="card hightlight" style={{ height: 500 }}>
                <AvgGasChart />
              </div>
            </Col>
          </Row>
          <Row className="margin-top-lg ">
            <Col xs={12} sm={12} md={12}>
              <div className="card hightlight" style={{ height: 500 }}>
                <RewardChart />
              </div>
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
