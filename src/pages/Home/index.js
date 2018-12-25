import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Ts from 'Trans';
import Header from '../../components/Header';
import Table from '../../components/ui/Table';
import RateLabel from '../../components/ui/RateLabel';
import Chart from '../../components/Chart';
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
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.homeStore;
    this.appsStore = this.props.store.appStore;
    this.state = {
      intervalId: null
    };
  }

  componentWillMount() {
    this.store.getAll();
  }
  componentDidMount() {
    let intervalId = setInterval(this.loopQuery.bind(this), 20000);
    this.setState({
      intervalId: intervalId
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  loopQuery = () => {
    this.store.getInstantData();
  };

  render() {
    const { lang } = this.appsStore;
    const {
      forkInfo,
      isForked,
      isFinishedQuery,
      statsInfo,
      bchBlockList,
      bsvBlockList,
      transactionXAxisChartData_zh,
      transactionXAxisChartData_en,
      transactionChartData_BCH,
      transactionChartData_BSV,
      blockRewardXAxisChartData_zh,
      blockRewardXAxisChartData_en,
      blockRewardChartData_BCH,
      blockRewardChartData_BSV,
      bchSpecialCodeList,
      bsvSpecialCodeList
    } = this.store;

    const bchColumns = [
      {
        title: <Ts transKey="pages.height" />,
        align: 'left',
        render: data => {
          return (
            <a
              className="link"
              href={`https://bch.btc.com/${data.block_hash}`}
              target="_blank"
            >
              {data.height}
            </a>
          );
        }
      },
      {
        title: <Ts transKey="pages.relayedBy" />,
        align: 'left',
        className: 'with-icon-left-header',
        render: data => {
          return (
            <span className="with-icon-left">
              {data.miner}
              {data.icon_url && (
                <i
                  className="cell-icon token-name-icon"
                  style={{ backgroundImage: `url(${data.icon_url})` }}
                />
              )}
            </span>
          );
        }
      },
      {
        title: <Ts transKey="pages.Time" />,
        render: data => {
          return <span>{second2Relative(data.time_in_sec, lang)}</span>;
        }
      }
    ];

    const bsvColumns = [
      {
        title: <Ts transKey="pages.height" />,
        align: 'left',
        render: data => {
          return (
            <a
              className={`link relative ${
                isForked && forkInfo.fork_height <= data.height
                  ? 'bsv-color'
                  : ''
              }`}
              // href={`https://bsv.btc.com/${data.block_hash}`}
              href="javascript:void 0"
              target="_blank"
            >
              {data.height}
              {isForked && forkInfo.fork_height == data.height && (
                <i className="cell-icon forked-icon" />
              )}
            </a>
          );
        }
      },
      {
        title: <Ts transKey="pages.relayedBy" />,
        align: 'left',
        className: 'with-icon-left-header',
        render: data => {
          return (
            <span
              className={`with-icon-left ${
                isForked && forkInfo.fork_height <= data.height
                  ? 'bsv-color'
                  : ''
              }`}
            >
              {data.miner}
              {data.icon_url && (
                <i
                  className="cell-icon token-name-icon"
                  style={{ backgroundImage: `url(${data.icon_url})` }}
                />
              )}
            </span>
          );
        }
      },
      {
        title: <Ts transKey="pages.Time" />,
        render: data => {
          return (
            <span
              className={`${
                isForked && forkInfo.fork_height <= data.height
                  ? 'bsv-color'
                  : ''
              }`}
            >
              {second2Relative(data.time_in_sec, lang)}
            </span>
          );
        }
      }
    ];

    const bchOpCodeColumns = [
      {
        title: 'txHash',
        width: '50%',
        align: 'left',
        render: data => {
          return (
            <a
              className="link cell-text-ellipsis"
              href={`https://bch.btc.com/${data.tx_hash}`}
              target="_blank"
              style={{ width: 170, textAlign: 'left' }}
            >
              Tx{` ${data.tx_hash}`}
            </a>
          );
        }
      },
      {
        title: 'opCode_count',
        render: data => {
          return (
            <Ts
              transKey="pages.bchOpCode"
              values={{ count: data.opcode_count }}
            />
          );
        }
      }
    ];

    const bsvOpCodeColumns = [
      {
        title: 'txHash',
        width: '50%',
        align: 'left',
        render: data => {
          return (
            <a
              className="link cell-text-ellipsis bsv-color"
              href={`https://bsv.btc.com/${data.tx_hash}`}
              target="_blank"
              style={{ width: 170, textAlign: 'left' }}
            >
              Tx{` ${data.tx_hash}`}
            </a>
          );
        }
      },
      {
        title: 'opCode_count',
        render: data => {
          return (
            <Ts
              transKey="pages.bsvOpCode"
              values={{ count: data.opcode_count }}
            />
          );
        }
      }
    ];

    // let bchDataSource = [
    //   {
    //     txHash:
    //       '0xfd4389434334340xfd4389434334340xfd4389434334340xfd438943433434',
    //     opCode_count: 3
    //   },
    //   {
    //     txHash:
    //       '0xfd4389434334340xfd4389434334340xfd4389434334340xfd438943433434',
    //     opCode_count: 5
    //   }
    // ];
    // let bsvDataSource = bchDataSource;
    // let bsvOpCodeDataSource = bchDataSource;
    // let bchOpCodeDataSource = bchDataSource;

    return (
      <div style={{ marginBottom: 100 }}>
        <Header
          forkInfo={forkInfo}
          isForked={isForked}
          isFinishedQuery={isFinishedQuery}
        />
        <div className="block-container">
          <div className="view-width">
            <Grid>
              <Row>
                <Col xs={12} sm={12} md={6}>
                  <div className="card block-card bch-block-card">
                    <div className="card-header">
                      <p>
                        <i className="coin-icon bch-icon" />
                        <span className="coin-name">BCH</span>
                        <span className="coin-value">
                          {statsInfo.bch_price_usd && (
                            <span>
                              {lang === 'zh-CN'
                                ? `￥ ${statsInfo.bch_price_rmb}`
                                : `$ ${statsInfo.bch_price_usd}`}
                            </span>
                          )}
                          {/* <Ts
                            type="currency"
                            currency={getCurrency(lang)}
                            values={
                              lang === 'zh-CN'
                                ? statsInfo.bch_price_rmb
                                : statsInfo.bch_price_usd
                            }
                            decimal={2}
                          /> */}
                        </span>
                        <span className="coin-rate">
                          {statsInfo.bch_price_change_24h && (
                            <RateLabel
                              changeRate={statsInfo.bch_price_change_24h}
                            />
                          )}
                        </span>
                      </p>
                    </div>
                    <div className="card-body">
                      <Table
                        columns={bchColumns}
                        dataSource={bchBlockList}
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                </Col>
                <Col xs={12} sm={12} md={6}>
                  <div className="card block-card">
                    <div className="card-header">
                      <p>
                        <i className="coin-icon bsv-icon" />
                        <span className="coin-name">BSV</span>
                        {isForked ? (
                          <span>
                            <span className="coin-value">
                              {statsInfo.bsv_price_usd
                                ? // <Ts
                                  //   type="currency"
                                  //   currency={getCurrency(lang)}
                                  //   values={
                                  //     lang === 'zh-CN'
                                  //       ? statsInfo.bsv_price_rmb
                                  //       : statsInfo.bsv_price_usd
                                  //   }
                                  //   decimal={2}
                                  // />
                                  lang === 'zh-CN'
                                  ? `￥ ${statsInfo.bsv_price_rmb}`
                                  : `$ ${statsInfo.bsv_price_usd}`
                                : '--'}
                            </span>
                            <span className="coin-rate">
                              {statsInfo.bsv_price_change_24h ? (
                                <RateLabel
                                  changeRate={statsInfo.bsv_price_change_24h}
                                />
                              ) : (
                                '--'
                              )}
                            </span>
                          </span>
                        ) : (
                          <Ts transKey="pages.notForked" />
                        )}
                      </p>
                    </div>
                    <div className="card-body">
                      <Table
                        columns={bsvColumns}
                        isForked={isForked}
                        forkedBlock={forkInfo.fork_height}
                        dataSource={bsvBlockList}
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              {false && (
                <Row>
                  <Col xs={12} sm={12} md={6}>
                    <div className="card op-code-card">
                      <div className="card-body">
                        <h2>
                          BCH <Ts transKey="pages.specialOPCode" />
                        </h2>
                        <Table
                          columns={bchOpCodeColumns}
                          dataSource={bchSpecialCodeList}
                          style={{ width: '100%' }}
                          showHeader={false}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={6}>
                    <div className="card op-code-card">
                      <div className="card-body">
                        <h2>
                          BSV <Ts transKey="pages.specialOPCode" />
                        </h2>
                        <Table
                          columns={bsvOpCodeColumns}
                          dataSource={bsvSpecialCodeList}
                          style={{ width: '100%' }}
                          showHeader={false}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              )}
            </Grid>
          </div>
        </div>
        <div className="view-width">
          <Chart
            title={<Ts transKey="pages.blockRewardTitle" />}
            subTitle={<Ts transKey="pages.coinbaseFees" />}
            legendNames={['BCH', 'BSV']}
            isFixed={true}
            isForked={isForked}
            yAxisName={
              lang === 'zh-CN'
                ? '区块奖励（BCH 或 BSV）'
                : 'Block Reward in BCH or BSV'
            }
            xAxisData={
              lang === 'zh-CN'
                ? blockRewardXAxisChartData_zh
                : blockRewardXAxisChartData_en
            }
            seriesDataList={[
              { data: blockRewardChartData_BSV, name: 'BSV' },
              { data: blockRewardChartData_BCH, name: 'BCH' }
            ]}
          />
          <Chart
            title={<Ts transKey="pages.transactionVsTitle" />}
            subTitle=""
            legendNames={['BCH', 'BSV']}
            isForked={isForked}
            abbreviateFunc={
              lang === 'zh-CN' ? abbreviateNumber_zh : abbreviateNumber_en
            }
            yAxisName={lang === 'zh-CN' ? '每日交易数' : 'Transactions Per Day'}
            xAxisData={
              lang === 'zh-CN'
                ? transactionXAxisChartData_zh
                : transactionXAxisChartData_en
            }
            seriesDataList={[
              { data: transactionChartData_BSV, name: 'BSV' },
              { data: transactionChartData_BCH, name: 'BCH' }
            ]}
          />
        </div>
      </div>
    );
  }
}
