import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Ts from 'Trans';
import LineChart from '../../components/Chart/LineChart';
@withRouter //必须放在最前面
@inject('store')
@observer
export default class AvgGasChart extends Component {
  constructor(props) {
    super(props);
    this.appStore = this.props.store.appStore;
    this.store = this.props.store.homeStore;
  }

  render() {
    const { lang } = this.appStore;
    const { avgGasChartData } = this.store;
    const { onClickZoom } = this.props;

    const datasource = [820, 932, 901, 934, 1290, 1330, 1320];
    const xaxisData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return (
      <div>
        <LineChart
          chartType="bar"
          title={<Ts transKey="pages.gasUsedChartTitle" />}
          isFixed={true}
          isForked={true}
          chartHeight={380}
          yAxisName={
            lang === 'zh-CN'
              ? '每笔交易平均Gas使用量'
              : 'Average Gas Used Per Transaction'
          }
          xAxisData={avgGasChartData.time_axis}
          seriesDataList={[{ data: avgGasChartData.price_axis, name: 'BSV' }]}
          onClickZoom={onClickZoom}
        />
      </div>
    );
  }
}
