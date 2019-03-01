import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Ts from 'Trans';
import {
  formatNumber,
  abbreviateNumber_zh,
  abbreviateNumber_en,
  timestamp2UTC
} from 'utils';
import LineChart from '../../components/Chart/LineChart';
@withRouter //必须放在最前面
@inject('store')
@observer
export default class RewardChart extends Component {
  constructor(props) {
    super(props);
    this.appStore = this.props.store.appStore;
    this.store = this.props.store.homeStore;
  }

  componentWillMount() {}

  getRewardSeriesData = allData => {
    if (!allData) {
      return [];
    }
    let data = [];
    let additionData = [];
    allData.forEach(item => {
      const { total_reward, ...others } = item;
      data.push(total_reward);
      additionData.push({ ...others });
    });
    return {
      data,
      additionData
    };
  };

  getChartTooltipFormatterFunc = () => {
    const { lang } = this.appStore;
    let addtionData = this.getRewardSeriesData(
      this.store.blockRewardChartData.reward_axis
    ).additionData;
    let totalTitle = {
      'zh-CN': '新增以太币供应总计：',
      'en-US': 'Total New Supply Ether: '
    };
    let blockRewardTitle = {
      'zh-CN': '来自区块播报奖励：',
      'en-US': 'From Block Rewards: '
    };
    let ucleInclRward = {
      'zh-CN': '来自叔块引用奖励：',
      'en-US': 'From Uncle Reference Rewards: '
    };
    let ucleRewardTitle = {
      'zh-CN': '来自叔块播报奖励：',
      'en-US': 'From Uncle Rewards: '
    };
    let blocksLocale = {
      'zh-CN': '区块',
      'en-US': 'Blocks'
    };

    let uncleLocale = {
      'zh-CN': '叔块',
      'en-US': 'Uncles'
    };
    return function(params) {
      let result = params.name + ' UTC';
      let currentData = addtionData[params.dataIndex];
      result =
        result +
        `</br> <div><span style="padding-right:5px;color:#2A69CF">${
          totalTitle[lang]
        }</span><span style="font-weight:500">${formatNumber(
          params.value,
          5
        )}<span></div>
        <div><span style="padding-right:5px;">${
          blockRewardTitle[lang]
        }</span><span style="font-weight:500">${
          currentData.block_reward
        } ETH  (${currentData.block_found} ${blocksLocale[lang]})<span></div>
        <div><span style="padding-right:5px;">${
          ucleInclRward[lang]
        }</span><span style="font-weight:500">${formatNumber(
          currentData.uncle_ref_reward,
          5
        )} ETH<span></div>
        <div><span style="padding-right:5px;">${
          ucleRewardTitle[lang]
        }</span><span style="font-weight:500">${formatNumber(
          currentData.uncle_reward,
          3
        )} ETH  (${currentData.uncle_found} ${uncleLocale[lang]})<span></div>
        `;

      // //${item.marker}
      // seriesDataList[0].additionData.forEach(item => {

      //   result =
      //     result +
      //     `</br> <span style="padding-right:120px;">${
      //       item.name
      //     }</span> <span style="position:absolute;right:0;padding-right:10px">${
      //       isFormat2Percent
      //         ? formatNumber(item.value[params[0].dataIndex] * 100, 2) + '%'
      //         : item.value[params[0].dataIndex]
      //     }</span>`;
      // });
      return result;
    };
  };

  render() {
    const { lang } = this.appStore;
    const { blockRewardChartData, forkStatusInfo, isForked } = this.store;
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
    if (blockRewardChartData.time_axis) {
      let markIndex = blockRewardChartData.time_axis.indexOf(markPoint);
      isShowMarkLine =
        markIndex >= 0 &&
        ((timerangeType == '1' &&
          markIndex < blockRewardChartData.time_axis.length - 6) ||
          (timerangeType == '2' &&
            markIndex < blockRewardChartData.time_axis.length - 1)) &&
        isForked;
    }

    return (
      <div>
        <LineChart
          key={isSimple ? 0 : new Date().getTime()} //解决zoom后，改变查询时间粒度图表不刷新
          chartType="line"
          title={<Ts transKey="pages.rewardChartTitle" />}
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
              ? `${forkTimeStr}\n君士坦丁堡/圣彼得堡分叉`
              : `${forkTimeStr}\nConstantinople/St.Petersburg Fork`
          }
          yAxisName={
            lang === 'zh-CN'
              ? timerangeType == '1'
                ? '每小时新以太币产生'
                : '每天新以太币产生'
              : timerangeType == '1'
              ? 'New Ether Supply Per Hour'
              : 'New Ether Supply Per Day'
          }
          xAxisData={blockRewardChartData.time_axis}
          seriesDataList={[
            this.getRewardSeriesData(blockRewardChartData.reward_axis)
          ]}
          tooltipFunc={this.getChartTooltipFormatterFunc()}
          isSimple={isSimple}
          onClickZoom={onClickZoom}
        />
      </div>
    );
  }
}
