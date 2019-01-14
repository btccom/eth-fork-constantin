import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import {
  formatNumber,
  abbreviateNumber_zh,
  abbreviateNumber_en,
  timestamp2UTC
} from 'utils';
import Ts from 'Trans';

import LineChart from '../../components/Chart/LineChart';
@withRouter //必须放在最前面
@inject('store')
@observer
export default class EtherPriceChart extends Component {
  constructor(props) {
    super(props);
    this.appStore = this.props.store.appStore;
    this.store = this.props.store.homeStore;
  }

  getChartTooltipFormatterFunc = () => {
    const { lang } = this.appStore;
    let totalTitle = {
      'zh-CN': '以太币价格（CNY）：',
      'en-US': 'Ether Price(USD): '
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

  getChartMinValue = lang => {
    const { pricesChartData } = this.store;
    let data =
      lang === 'zh-CN'
        ? pricesChartData.price_cny_axis
        : pricesChartData.price_usd_axis;
    let min = Math.min.apply({}, data);
    if (min <= 100) {
      return 0;
    } else if (min > 100 && min <= 400) {
      return 100;
    } else if (min > 400 && min <= 800) {
      return 400;
    } else if (min > 800 && min <= 1200) {
      return 800;
    } else {
      return 1000;
    }
  };

  render() {
    const { lang } = this.appStore;
    const { pricesChartData, forkStatusInfo, isForked } = this.store;
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
    if (pricesChartData.time_axis) {
      let markIndex = pricesChartData.time_axis.indexOf(markPoint);
      isShowMarkLine =
        markIndex >= 0 &&
        ((timerangeType == '1' &&
          markIndex < pricesChartData.time_axis.length - 6) ||
          timerangeType == '2') &&
        isForked;
    }

    return (
      <div>
        <LineChart
          key={isSimple ? 0 : new Date().getTime()} //解决zoom后，改变查询时间粒度图表不刷新
          chartType="line"
          title={<Ts transKey="pages.priceChart" />}
          isFixed={true}
          isForked={true}
          chartHeight={380}
          showMarkLine={isShowMarkLine}
          abbreviateFunc={
            lang === 'zh-CN' ? abbreviateNumber_zh : abbreviateNumber_en
          }
          markLinePoint={forkStatusInfo.fork_timestamp ? markPoint : null}
          markLinePointName={
            lang === 'zh-CN'
              ? `${forkTimeStr}\n君士坦丁堡分叉`
              : `${forkTimeStr}\nConstantinople Fork`
          }
          yAxisName={
            lang === 'zh-CN' ? '以太币价格（CNY）' : 'Ether Prices（USD）'
          }
          minValue={this.getChartMinValue(lang)}
          xAxisData={pricesChartData.time_axis}
          seriesDataList={[
            {
              data:
                lang === 'zh-CN'
                  ? pricesChartData.price_cny_axis
                  : pricesChartData.price_usd_axis,
              name: 'BSV'
            }
          ]}
          tooltipFunc={this.getChartTooltipFormatterFunc()}
          isSimple={isSimple}
          onClickZoom={onClickZoom}
        />
      </div>
    );
  }
}
