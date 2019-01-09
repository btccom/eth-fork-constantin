import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Ts from 'Trans';
import LineChart from '../../components/Chart/LineChart';
import { abbreviateNumber_zh, abbreviateNumber_en } from 'utils';
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
          isSimple={isSimple}
          onClickZoom={onClickZoom}
        />
      </div>
    );
  }
}
