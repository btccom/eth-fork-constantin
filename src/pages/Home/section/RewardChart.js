import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Card from '../../../components/ui/Card';
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

    return <Card style={{ height: 300 }}>fddf</Card>;
  }
}
