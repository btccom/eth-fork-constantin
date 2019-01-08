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
  }

  render() {
    const { lang } = this.appStore;
    const { onClickZoom } = this.props;

    const datasource = [820, 932, 901, 934, 1290, 1330, 1320];
    const xaxisData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return (
      <div>
        <LineChart
          title={<Ts transKey="pages.rewardChartTitle" />}
          isFixed={true}
          isForked={true}
          yAxisName={
            lang === 'zh-CN'
              ? '每小时新以太币产生'
              : 'New Ether Supply Per Hour'
          }
          xAxisData={lang === 'zh-CN' ? xaxisData : xaxisData}
          seriesDataList={[{ data: datasource, name: 'BSV' }]}
          onClickZoom={onClickZoom}
        />
      </div>
    );
  }
}
