import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Ts from 'Trans';
import LineChart from '../../components/Chart/LineChart';
@withRouter //必须放在最前面
@inject('store')
@observer
export default class RewardChart extends Component {
  constructor(props) {
    super(props);
    this.appStore = this.props.store.appStore;
    this.store = this.props.store.homeStore;
    console.log(this.store.blockRewardChartData.price_axis);
  }

  componentWillMount() {}

  render() {
    const { lang } = this.appStore;
    const { blockRewardChartData, forkStatusInfo } = this.store;
    const { onClickZoom, isSimple } = this.props;

    return (
      <div>
        <LineChart
          chartType="line"
          title={<Ts transKey="pages.rewardChartTitle" />}
          isFixed={true}
          isForked={true}
          chartHeight={380}
          showMarkLine={!!forkStatusInfo.fork_timestamp}
          markLinePoint={
            forkStatusInfo.fork_timestamp
              ? new Date(forkStatusInfo.fork_timestamp * 1000).format(
                  'yyyy-MM-dd HH:mm'
                )
              : null
          }
          yAxisName={
            lang === 'zh-CN'
              ? '每小时新以太币产生'
              : 'New Ether Supply Per Hour'
          }
          xAxisData={blockRewardChartData.time_axis}
          seriesDataList={[
            {
              data: blockRewardChartData.reward_axis,
              name: 'BSV'
            }
          ]}
          isSimple={isSimple}
          onClickZoom={onClickZoom}
        />
      </div>
    );
  }
}
