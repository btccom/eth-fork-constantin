import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Ts from 'Trans';
import { formatNumber } from 'utils';
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
      'en-US': 'From UcleIncl. Rewards: '
    };
    let ucleRewardTitle = {
      'zh-CN': '来自叔块播报奖励：',
      'en-US': 'From Ucle Rewards: '
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
      console.log(params);
      let result = params.name;
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
        <div><span style="padding-right:5px;">${ucleInclRward}</span><span style="font-weight:500">${formatNumber(
          currentData.uncle_ref_reward,
          2
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
    const { onClickZoom, isSimple } = this.props;

    let forkTimeStr = new Date(forkStatusInfo.fork_timestamp * 1000).format(
      'yyyy-MM-dd hh:mm'
    );
    return (
      <div>
        <LineChart
          chartType="line"
          title={<Ts transKey="pages.rewardChartTitle" />}
          isFixed={true}
          isForked={true}
          chartHeight={380}
          showMarkLine={isForked}
          markLinePoint={
            forkStatusInfo.fork_timestamp
              ? new Date(forkStatusInfo.fork_timestamp * 1000).format(
                  'yyyy-MM-dd hh:mm'
                )
              : null
          }
          markLinePointName={
            lang === 'zh-CN'
              ? `${forkTimeStr} Constantinople Fork`
              : `${forkTimeStr} 君士坦丁堡分叉`
          }
          yAxisName={
            lang === 'zh-CN'
              ? '每小时新以太币产生'
              : 'New Ether Supply Per Hour'
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
