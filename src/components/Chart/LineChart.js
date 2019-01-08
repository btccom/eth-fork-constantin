import React, { Component } from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import './index.scss';
import ChartMarkButton from '../ui/ChartMarkButton';
import { abbreviateNumber_zh, abbreviateNumber_en } from 'utils';

export default class LineChart extends Component {
  constructor(props) {
    super(props);
  }

  getOption = () => {
    let {
      chartType = 'line',
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
      type: chartType,
      markLine: {
        //show: item.data === 901,
        data: [
          {
            // 起点和终点的项会共用一个 name
            name: '最小值到最大值',
            type: 'min'
          },
          {
            type: 'max'
          }
        ]
      }
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
          fontWeight: 400,
          rotate: 90,
          fontFamily: 'Arial',
          verticalAlign: 'middle',
          rich: {
            x: {
              fontSize: 18,
              fontFamily: 'Droid Sans Mono',
              borderColor: '#449933',
              borderRadius: 4
            }
          }
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
        bottom: 110,
        left: 65
      },
      tooltip: {
        show: true,
        extraCssText:
          'background-color: rgba(0,0,0,0.75);box-shadow:0px 2px 8px 0px rgba(0,0,0,0.15);border-radius:4px'
      },
      series: seriesDataList
    };
    return option;
  };

  handleToggleMark = type => {
    console.log(type);
    //this.props.onMarkToggle();
  };

  render() {
    const { title, onClickZoom, chartHeight } = this.props;
    return (
      <div className="chart-container">
        <div className="chart-title">
          <h2>
            {title}
            <i
              className="cell-icon zoom-icon pull-right"
              onClick={onClickZoom}
            />
          </h2>
        </div>
        <ReactEchartsCore
          echarts={echarts}
          option={this.getOption()}
          style={{ height: chartHeight }}
        />
        <div className="pull-right">
          <ChartMarkButton
            onClick={type => {
              this.handleToggleMark(type);
            }}
          />
        </div>
      </div>
    );
  }
}
