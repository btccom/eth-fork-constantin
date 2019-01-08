import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
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

  render() {
    const { lang } = this.appStore;
    const { pricesChartData, forkStatusInfo } = this.store;
    const { onClickZoom, isSimple } = this.props;

    return (
      <div>
        <LineChart
          chartType="line"
          title={<Ts transKey="pages.priceChart" />}
          isFixed={true}
          isForked={true}
          chartHeight={380}
          showMarkLine={!!forkStatusInfo.fork_timestamp}
          markLinePoint={
            forkStatusInfo.fork_timestamp
              ? new Date(forkStatusInfo.fork_timestamp * 1000).format(
                  'yyyy-MM-dd HH:mm'
                )
              : '2019-01-06 12:00'
          }
          yAxisName={
            lang === 'zh-CN' ? '以太币价格（CNY）' : 'Ether Prices（USD）'
          }
          xAxisData={pricesChartData.time_axis}
          seriesDataList={[
            {
              data:
                lang === 'zh-CN'
                  ? pricesChartData.price_usd_axis
                  : pricesChartData.price_cny_axis,
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
