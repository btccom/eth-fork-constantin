import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import './index.scss';
import { abbreviateNumber_zh, abbreviateNumber_en } from 'utils';

class Chart extends Component {
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
      color: ['#4A90E2', '#149718'],
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

        min: function(value) {
          return Math.floor(value.min - value.min * 0.2);
        },
        max: function(value) {
          return Math.floor(value.max + value.max * 0.2);
        },
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
        //confine: true,
        trigger: 'axis',
        show: true,
        axisPointer: {
          type: 'none'
        },
        backgroundColor: 'rgba(0,0,0,0.75);',
        formatter: function(params, index) {
          var result = `${params[0].name}
          <br>
          ${params[1].marker} ${params[1].seriesName}    : ${
            isFixed ? params[1].value.toFixed(2) : params[1].value
          }
          `;
          if (isForked) {
            result =
              result +
              `<br>
          ${params[0].marker}   ${params[0].seriesName} : ${
                isFixed ? params[0].value.toFixed(2) : params[0].value
              }`;
          }
          return result;
        }
      },
      series: seriesDataList
    };
    return option;
  };

  getLegend = (legendNames = []) => {
    if (legendNames.length > 0) {
      return (
        <ul>
          {legendNames.map(item => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      );
    } else {
      return null;
    }
  };

  render() {
    const { title, subTitle, legendNames } = this.props;
    return (
      <div className="chart-container">
        <div className="chart-title">
          <h2>{title}</h2>
          <p className="sub-title">{subTitle}</p>
        </div>
        <ReactEcharts option={this.getOption()} />
        <div className="chart-legend">{this.getLegend(legendNames)}</div>
      </div>
    );
  }
}

export default Chart;
