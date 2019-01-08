import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Ts from 'Trans';
import RateLabel from '../../components/ui/RateLabel';
import { Grid, Row, Col } from 'react-bootstrap';
import {
  getCurrency,
  second2Relative,
  abbreviateNumber,
  abbreviateNumber_zh,
  abbreviateNumber_en
} from 'utils';

import './index.scss';

@withRouter //必须放在最前面
@inject('store')
@observer
export default class ChartDetail extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.homeStore;
    this.appsStore = this.props.store.appStore;
    console.log(window.location.href);
  }

  componentWillMount() {}
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { lang } = this.appsStore;
    const { forkInfo, isForked, isFinishedQuery } = this.store;

    return <div className="view-width relative">reward</div>;
  }
}
