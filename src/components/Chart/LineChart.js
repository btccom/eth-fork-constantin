import React, { Component } from 'react';
//import ReactEcharts from 'echarts-for-react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/dataZoom';
import './index.scss';
import ChartMarkButton from '../ui/ChartMarkButton';
import { abbreviateNumber_zh, abbreviateNumber_en } from 'utils';

export default class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleMarkLine: false
    };
  }

  getOption = toggleMarkLine => {
    let {
      chartType = 'line',
      xAxisData,
      seriesDataList,
      yAxisName,
      abbreviateFunc,
      markLinePoint,
      markLinePointName,
      isSimple,
      tooltipFunc,
      isFixed,
      isForked
    } = this.props;
    seriesDataList = seriesDataList.map(item => ({
      data: item.data,
      additionData: item.additionData,
      //name: item.name,
      type: chartType,
      itemStyle: {
        opacity: 0.4
      },
      markLine: !toggleMarkLine
        ? null
        : {
            lineStyle: {
              color: '#F5A623',
              type: 'solid'
            },

            data: [
              [
                {
                  name: markLinePointName,
                  coord: [markLinePoint, 500]
                },
                {
                  symbol: 'none',
                  coord: [markLinePoint, 500],
                  y: '8%'
                }
              ]
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
          interval: function(index, value) {
            console.log(index);
            return false;
          },
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
                return abbreviateFunc(value, 0);
              }
            }
            return value;
          }
          //showMinLabel: false,
          //showMaxLabel: false
        }
        // min: function(value) {
        //   return 200;
        // }

        // max:
        //   chartType === 'line'
        //     ? function(value) {
        //         return Math.floor(value.max + value.max * 0.35);
        //       }
        //     : null
        // showMinLabel: false,
        // showMaxLabel: false
      },
      grid: {
        top: 30,
        right: 20,
        bottom: 110,
        left: 65
      },
      tooltip: {
        show: true,
        formatter: tooltipFunc,
        // formatter: function(params) {
        //   console.log(params);
        //   let result = params.name;
        //   result =
        //     result + `</br> <span style="padding-right:120px;">${params.value}`;

        //   // //${item.marker}
        //   // seriesDataList[0].additionData.forEach(item => {

        //   //   result =
        //   //     result +
        //   //     `</br> <span style="padding-right:120px;">${
        //   //       item.name
        //   //     }</span> <span style="position:absolute;right:0;padding-right:10px">${
        //   //       isFormat2Percent
        //   //         ? formatNumber(item.value[params[0].dataIndex] * 100, 2) + '%'
        //   //         : item.value[params[0].dataIndex]
        //   //     }</span>`;
        //   // });
        //   return result;
        // },
        textStyle: {
          color: 'rgba(0,0,0,0.65)'
        },
        extraCssText:
          'background-color: #F5FAFF;box-shadow:0px 0px 4px 0px rgba(0,0,0,0.16);border-radius:4px;color:color:rgba(0,0,0,0.65);'
      },
      toolbox: {
        show: !isSimple,
        showTitle: false,
        feature: {
          restore: {},
          saveAsImage: {},
          dataView: {
            show: false
          },
          dataZoom: {
            show: true,
            title: {
              zoom: ' ',
              back: ' '
            }
          },
          x: 'left'
        }
      },
      series: seriesDataList
      // dataZoom: [
      //   {
      //     type: 'inside',
      //     zoomOnMouseWheel: true
      //   }
      // ]
    };
    return option;
  };

  handleToggleMark = type => {
    this.setState({ toggleMarkLine: type === 'add' });
    //this.props.onMarkToggle();
  };

  render() {
    const {
      title,
      onClickZoom,
      isSimple,
      chartHeight,
      showMarkLine
    } = this.props;
    const { toggleMarkLine } = this.state;
    return (
      <div className="chart-container">
        <div className="chart-title">
          <h3 className="relative">
            {title}
            {isSimple && (
              <i className="cell-icon zoom-icon" onClick={onClickZoom} />
            )}
          </h3>
        </div>
        <ReactEchartsCore
          echarts={echarts}
          option={this.getOption(toggleMarkLine)}
          style={{ height: chartHeight }}
        />
        {/* <ReactEcharts
          option={this.getOption(showMarkLine)}
          style={{ height: chartHeight }}
        /> */}

        {showMarkLine && (
          <div className="pull-right">
            <ChartMarkButton
              onClick={type => {
                this.handleToggleMark(type);
              }}
            />
          </div>
        )}
      </div>
    );
  }
}
