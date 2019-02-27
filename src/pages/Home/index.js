import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Grid, Row, Col } from 'react-bootstrap';
import { chartStartTimeRangeMap } from 'config';
import Overview from './section/Overview';
import Postponed from './section/Postponed';
import RewardChart from '../Common/RewardChart';
import AvgGasChart from '../Common/AvgGasChart';
import EtherPriceChart from '../Common/EtherPriceChart';
import Introduction from './section/Introduction';
import BlocksBeforeFork from './section/BlocksBeforeFork';
import BlocksAfterFork from './section/BlocksAfterFork';
import { FormattedHTMLMessage } from 'react-intl';

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
    this.store.getForkInfo(isForked => {
      if (isForked) {
        this.store.getHistoryBlockList();
      } else {
        this.store.getLatestBlockList();
      }
      //this.store.startSocket();
    });
    let timeRangeType = '1';

    this.store.getAvgGasChartData(
      chartStartTimeRangeMap[timeRangeType],
      timeRangeType
    );
    this.store.getPricesChartData(
      chartStartTimeRangeMap[timeRangeType],
      timeRangeType
    );
    this.store.getBlockRewardChartData(
      chartStartTimeRangeMap[timeRangeType],
      timeRangeType
    );
  }
  componentDidMount() {
    let intervalId = setInterval(this.loopQuery.bind(this), 5000);
    this.setState({
      intervalId: intervalId
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  getBigChartUrl = chartType => {
    let url = window.location.href.split('/')[0];
    return `${url}/chartdetail/${chartType}/`;
  };

  loopQuery = () => {
    this.store.getForkInfo(isForked => {
      if (isForked) {
        this.store.getHistoryBlockList();
      } else {
        this.store.getLatestBlockList();
      }
      //this.store.startSocket();
    });
  };

  handleClickLink = event => {
    if (window.ga) {
      console.log('ga event');
      ga('send', 'event', {
        eventCategory: 'Outbound Link',
        eventAction: 'click',
        eventLabel: event.target.href,
        transport: 'beacon'
      });
    }
  };

  render() {
    const { isForked } = this.store;
    const { lang } = this.appsStore;
    let linkZH =
      'https://pool.btc.com/?utm_source=ethfork&utm_medium=text&utm_campaign=Chinese';
    let linkEN =
      'https://pool.btc.com/?utm_source=ethfork&utm_medium=text&utm_campaign=English';
    return (
      <div className="view-width relative" style={{ marginBottom: 20 }}>
        <a
          className="link exchange-link"
          href={`${lang === 'zh-CN' ? linkZH : linkEN}`}
          target="_blank"
          onClick={this.handleClickLink}
        >
          <FormattedHTMLMessage id="pages.linkText" />
        </a>
        <Grid>
          <Row>
            <Col xs={12} sm={12} md={12}>
              <Overview />
              {false && <Postponed />}
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12}>
              {!isForked && <BlocksBeforeFork />}
            </Col>
          </Row>
        </Grid>
        {isForked && <BlocksAfterFork />}

        <Grid className="margin-top-lg">
          <Row>
            <Col xs={12} sm={12} md={6} className="relative">
              <div className="card hightlight" style={{ height: 500 }}>
                <RewardChart
                  isSimple={true}
                  onClickZoom={() => {
                    window.open(this.getBigChartUrl('reward'), '_blank');
                  }}
                  timerangeType="1"
                />
              </div>
            </Col>
            <Col xs={12} sm={12} md={6}>
              <div
                className="card hightlight avggas-chart-container"
                style={{ height: 500 }}
              >
                {/* <AvgGasChart
                  isSimple={true}
                  timerangeType="1"
                  onClickZoom={() => {
                    window.open(this.getBigChartUrl('avgGasPrice'), '_blank');
                  }}
                /> */}
                <EtherPriceChart
                  isSimple={true}
                  timerangeType="1"
                  onClickZoom={() => {
                    window.open(this.getBigChartUrl('etherPrice'), '_blank');
                  }}
                />
              </div>
            </Col>
          </Row>
          {/* <Row className="margin-top-lg ">
            <Col xs={12} sm={12} md={12}>
              <div className="card hightlight" style={{ height: 500 }}>
                <EtherPriceChart
                  isSimple={true}
                  timerangeType="1"
                  onClickZoom={() => {
                    window.open(this.getBigChartUrl('etherPrice'), '_blank');
                  }}
                />
              </div>
            </Col>
          </Row> */}
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
