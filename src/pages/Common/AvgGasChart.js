import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Ts from 'Trans';
import LineChart from '../../components/Chart/LineChart';
import {
  abbreviateNumber_zh,
  abbreviateNumber_en,
  formatNumber,
  timestamp2UTC
} from 'utils';
@withRouter //必须放在最前面
@inject('store')
@observer
export default class AvgGasChart extends Component {
  constructor(props) {
    super(props);
    this.appStore = this.props.store.appStore;
    this.store = this.props.store.homeStore;
  }

  getChartTooltipFormatterFunc = () => {
    const { lang } = this.appStore;
    let totalTitle = {
      'zh-CN': '单笔平均Gas使用量：',
      'en-US': 'Avg Gas Used Per Txn: '
    };
    return function(params) {
      let result = params.name + ' UTC';
      result =
        result +
        `</br> <div><span style="padding-right:5px;color:#2A69CF">${
          totalTitle[lang]
        }</span><span style="font-weight:500">${formatNumber(
          params.value,
          1
        )}<span></div>`;

      return result;
    };
  };

  render() {
    const { lang } = this.appStore;
    const { avgGasChartData, forkStatusInfo, isForked } = this.store;
    const { onClickZoom, isSimple, timerangeType } = this.props;

    let forkTimeStr = timestamp2UTC(forkStatusInfo.fork_timestamp * 1000);
    let markPoint = '';
    if (timerangeType === '1') {
      markPoint =
        timestamp2UTC(
          forkStatusInfo.fork_timestamp * 1000,
          'yyyy-MM-dd hh',
          false
        ) + ':00';
    } else {
      markPoint = timestamp2UTC(
        forkStatusInfo.fork_timestamp * 1000,
        'yyyy-MM-dd',
        false
      );
    }

    let isShowMarkLine = false;
    if (avgGasChartData.time_axis) {
      let markIndex = avgGasChartData.time_axis.indexOf(markPoint);
      isShowMarkLine =
        markIndex >= 0 &&
        ((timerangeType == '1' &&
          markIndex < avgGasChartData.time_axis.length - 6) ||
          (timerangeType == '2' &&
            markIndex < avgGasChartData.time_axis.length - 1)) &&
        isForked;
    }

    return (
      <div>
        <LineChart
          chartType="bar"
          title={<Ts transKey="pages.gasUsedChartTitle" />}
          isFixed={true}
          isForked={true}
          chartHeight={380}
          abbreviateFunc={
            lang === 'zh-CN' ? abbreviateNumber_zh : abbreviateNumber_en
          }
          showMarkLine={isShowMarkLine}
          markLinePoint={forkStatusInfo.fork_timestamp ? markPoint : null}
          markLinePointName={
            lang === 'zh-CN'
              ? `${forkTimeStr}\n君士坦丁堡分叉`
              : `${forkTimeStr}\nConstantinople Fork`
          }
          yAxisName={
            lang === 'zh-CN'
              ? '每笔交易平均Gas使用量'
              : 'Average Gas Used Per Transaction'
          }
          key={isSimple ? 0 : new Date().getTime()} //解决zoom后，改变查询时间粒度图表不刷新
          xAxisData={avgGasChartData.time_axis}
          seriesDataList={[{ data: avgGasChartData.price_axis, name: 'BSV' }]}
          tooltipFunc={this.getChartTooltipFormatterFunc()}
          isSimple={isSimple}
          onClickZoom={onClickZoom}
        />
      </div>
    );
  }
}
