import React, { Component } from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/line';
import './index.scss';
import { abbreviateNumber_zh, abbreviateNumber_en } from 'utils';

export default class LineChart extends Component {
  constructor(props) {
    super(props);
  }

  getOption = () => {
    let {
      xAxisData,
      seriesDataList,
      yAxisName,
      abbreviateFunc,
      isFixed,
      isForked
    } = this.props;

    seriesDataList = seriesDataList.map(item => ({
      data: item.data,
      name: item.name,
      type: 'line'
    }));
    let option = {
      color: ['#2A69CF', '#149718'],
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxisData,
        axisLine: {
          lineStyle: {
            color: '#BFBFBF'
          }
        },
        axisLabel: {
          color: '#545454',
          fontWeight: 400
        }
      },
      yAxis: {
        show: true,

        name: yAxisName,
        nameLocation: 'middle',
        nameGap: 50,
        nameTextStyle: {
          color: '#CCCCCC'
        },
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#E9E9E9'
          }
        },
        axisLine: {
          show: false
        },
        axisTick: {
          length: 0
        },
        axisLabel: {
          color: 'rgba(84,84,84,1)',
          formatter: function(value, index) {
            // if (value.toString().indexOf('.') > 0) {
            //   return '';
            // }
            if (value - 0 > 10000) {
              if (abbreviateFunc) {
                if (abbreviateNumber_zh === abbreviateFunc) {
                  return abbreviateFunc(value, 0);
                }
                return abbreviateFunc(value, 1);
              }
            }
            return value;
          },
          showMinLabel: false,
          showMaxLabel: false
        }
      },
      grid: {
        top: 10,
        right: 20,
        bottom: 30,
        left: 65
      },
      tooltip: {
        show: true,
        backgroundColor: '#F5FAFF'
      },
      series: seriesDataList
    };
    return option;
  };

  render() {
    const { title } = this.props;
    return (
      <div className="chart-container">
        <div className="chart-title">
          <h2>{title}</h2>
        </div>
        <ReactEchartsCore echarts={echarts} option={this.getOption()} />
      </div>
    );
  }
}
