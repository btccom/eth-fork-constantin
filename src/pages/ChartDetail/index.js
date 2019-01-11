import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Grid, Row, Col } from 'react-bootstrap';
import Ts from 'Trans';
import { chartStartTimeRangeMap } from 'config';
import debounce from 'lodash.debounce';
import ToggleGroupButton from '../../components/ui/ToggleGroupButton';
import RewardChart from '../Common/RewardChart';
import AvgGasChart from '../Common/AvgGasChart';
import EtherPriceChart from '../Common/EtherPriceChart';
import './index.scss';

@withRouter //必须放在最前面
@inject('store')
@observer
export default class ChartDetail extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.homeStore;
    this.appsStore = this.props.store.appStore;
    this.state = {
      timerangeType: '1' // per hour
    };
    console.log(this.props);
  }

  componentWillMount() {
    this.store.getForkInfo();
    let timeRangeType = '1';
    let startTime = chartStartTimeRangeMap[timeRangeType];
    this.store.getAvgGasChartData(startTime, timeRangeType);
    this.store.getPricesChartData(startTime, timeRangeType);
    this.store.getBlockRewardChartData(startTime, timeRangeType);
  }
  componentDidMount() {}

  componentWillUnmount() {}

  getTimeRangeButton = () => {
    return [
      {
        text: <Ts transKey="common.previous" />,
        onClick: debounce(this.handleClickPrevious, 500)
      },
      {
        text: <Ts transKey="common.next" />,
        onClick: debounce(this.handleClickNext, 500)
      }
    ];
  };

  handleTimeRangeChange = timerangeType => {
    this.setState({ timerangeType });
    let chartType = this.props.match.params.type;
    let startTime = chartStartTimeRangeMap[timerangeType];
    if (chartType === 'reward') {
      this.store.getBlockRewardChartData(startTime, timerangeType);
    } else if (chartType === 'avgGasPrice') {
      this.store.getAvgGasChartData(startTime, timerangeType);
    } else if (chartType === 'etherPrice') {
      this.store.getPricesChartData(startTime, timerangeType);
    }
  };

  render() {
    let chartType = this.props.match.params.type;

    return (
      <div className="view-width relative margin-top-lg">
        <Grid>
          <Row>
            <Col xs={12} sm={12} md={12} className="relative">
              <div className="card hightlight" style={{ height: 800 }}>
                <div className="">
                  <ToggleGroupButton onChange={this.handleTimeRangeChange} />
                </div>
                {chartType === 'reward' && (
                  <RewardChart
                    isSimple={false}
                    timerangeType={this.state.timerangeType}
                  />
                )}
                {chartType === 'avgGasPrice' && (
                  <AvgGasChart
                    isSimple={false}
                    timerangeType={this.state.timerangeType}
                  />
                )}
                {chartType === 'etherPrice' && (
                  <EtherPriceChart
                    isSimple={false}
                    timerangeType={this.state.timerangeType}
                  />
                )}
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
