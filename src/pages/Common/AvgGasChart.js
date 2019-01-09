import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Ts from 'Trans';
import LineChart from '../../components/Chart/LineChart';
import { abbreviateNumber_zh, abbreviateNumber_en, formatNumber } from 'utils';
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
      console.log(params);
      let result = params.name;
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
    const { onClickZoom, isSimple } = this.props;

    let forkTimeStr = new Date(forkStatusInfo.fork_timestamp * 1000).format(
      'yyyy-MM-dd hh:mm'
    );
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
          showMarkLine={isForked}
          markLinePoint={forkStatusInfo.fork_timestamp ? forkTimeStr : null}
          markLinePointName={
            lang === 'zh-CN'
              ? `${forkTimeStr} Constantinople Fork`
              : `${forkTimeStr} 君士坦丁堡分叉`
          }
          yAxisName={
            lang === 'zh-CN'
              ? '每笔交易平均Gas使用量'
              : 'Average Gas Used Per Transaction'
          }
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
