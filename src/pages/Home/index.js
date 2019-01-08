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
import EtherPriceChart from '../Common/EtherPriceChart';
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
    this.store.getForkInfo(isForked => {
      if (isForked) {
        this.getHistoryBlockList();
      }
    });
    this.store.getLatestBlockList();
    this.store.getAvgGasChartData('20190103', 1);
    this.store.getPricesChartData('20190103', 1);
    this.store.getBlockRewardChartData('20190103', 1);
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

  getBigChartUrl = chartType => {
    let url = window.location.href.split('/')[0];
    return `${url}/chartdetail/${chartType}/`;
  };

  loopQuery = () => {
    this.store.getInstantData();
  };

  render() {
    const { lang } = this.appsStore;
    const {
      forkInfo,
      isForked,
      isFinishedQuery,
      forkStatusInfo,
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

    return (
      <div className="view-width relative" style={{ marginBottom: 100 }}>
        <Grid>
          <Row>
            <Col xs={12} sm={12} md={12}>
              <Overview />
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={6} className="relative">
              <div className="card hightlight" style={{ height: 500 }}>
                <RewardChart
                  isSimple={true}
                  onClickZoom={() => {
                    window.open(this.getBigChartUrl('reward'), '_blank');
                  }}
                />
              </div>
            </Col>
            <Col xs={12} sm={12} md={6}>
              <div className="card hightlight" style={{ height: 500 }}>
                <AvgGasChart
                  isSimple={true}
                  onClickZoom={() => {
                    window.open(this.getBigChartUrl('avgGasPrice'), '_blank');
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row className="margin-top-lg ">
            <Col xs={12} sm={12} md={12}>
              <div className="card hightlight" style={{ height: 500 }}>
                <EtherPriceChart
                  isSimple={true}
                  onClickZoom={() => {
                    window.open(this.getBigChartUrl('etherPrice'), '_blank');
                  }}
                />
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
