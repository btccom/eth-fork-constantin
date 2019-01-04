import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Ts from 'Trans';
import Card from '../../../components/ui/Card';
import LineChart from '../../../components/Chart/LineChart';
import '../index.scss';
@withRouter //必须放在最前面
@inject('store')
@observer
export default class RewardChart extends Component {
  constructor(props) {
    super(props);
    this.appStore = this.props.store.appStore;
  }

  render() {
    const { lang } = this.appStore;
    const {} = this.props;

    const datasource = [820, 932, 901, 934, 1290, 1330, 1320];
    const xaxisData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return (
      <Card style={{ height: 500 }} showHighlight={true}>
        <LineChart
          title={<Ts transKey="pages.rewardChartTitle" />}
          isFixed={true}
          isForked={true}
          yAxisName={
            lang === 'zh-CN'
              ? '区块奖励（BCH 或 BSV）'
              : 'Block Reward in BCH or BSV'
          }
          xAxisData={lang === 'zh-CN' ? xaxisData : xaxisData}
          seriesDataList={[{ data: datasource, name: 'BSV' }]}
        />
      </Card>
    );
  }
}
