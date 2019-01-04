import { observable, action, runInAction, computed, reaction } from 'mobx';
import ajax from 'ajax';
import { getCurrentTimestamp, dateLocaleFormat } from 'utils';

class HomeStore {
  @observable
  loading;

  @observable
  forkInfo;

  @observable
  statsInfo;

  @observable
  bchBlockList;

  @observable
  bsvBlockList;

  @observable
  transactionXAxisChartData;
  @observable
  transactionChartData_BCH;
  @observable
  transactionChartData_BSV;
  @observable
  blockRewardXAxisChartData;
  @observable
  blockRewardChartData_BCH_rmb;
  @observable
  blockRewardChartData_BCH_usd;

  @observable
  blockRewardChartData_BSV_rmb;
  @observable
  blockRewardChartData_BSV_usd;

  @observable
  bchSpecialCodeList;
  @observable
  bsvSpecialCodeList;

  @observable
  isFinishedQuery;

  constructor() {
    this.loading = false;
    this.forkInfo = {};
    this.statsInfo = {};
    this.bchBlockList = [];
    this.bsvBlockList = [];
    this.transactionXAxisChartData = [];
    this.transactionChartData_BCH = [];
    this.transactionChartData_BSV = [];
    this.blockRewardXAxisChartData = [];
    this.blockRewardChartData_BCH = [];
    this.blockRewardChartData_BSV = [];
    this.bchSpecialCodeList = [];
    this.bsvSpecialCodeList = [];

    this.isFinishedQuery = false;
  }

  @action
  getAll = () => {
    runInAction(() => {
      this.getForkInfo();
      this.getStatsInfo();
      this.getBCHBlockList();
      this.getBSVBlockList();
      this.getForkChartData();
      // this.getBCHSpecialCodeList();
      // this.getBSVSpecialCodeList();
    });
  };

  @action
  getInstantData = () => {
    runInAction(() => {
      this.getForkInfo();
      this.getStatsInfo();
      this.getBCHBlockList();
      this.getBSVBlockList();
      // this.getBCHSpecialCodeList();
      // this.getBSVSpecialCodeList();
    });
  };

  @action
  getForkInfo = async () => {
    // const res = await ajax.get(`/fork-time`);
    // if (res && res.data) {
    //   runInAction(() => {
    //     this.forkInfo = res.data;
    //     this.isFinishedQuery = true;
    //   });
    // }
  };

  @computed
  get isForked() {
    if (this.forkInfo.fork_time) {
      // getCurrentTimestamp() >= this.forkInfo.fork_time * 1000 &&
      if (this.forkInfo.fork_height) {
        return true;
      }
    }
    return false;
  }

  @action
  getStatsInfo = async () => {
    // const res = await ajax.get(`/fork-stats`);
    // if (res && res.data) {
    //   runInAction(() => {
    //     this.statsInfo = res.data;
    //   });
    // }
  };

  @action
  getBCHBlockList = async () => {
    // const res = await ajax.get(`/bch/block/list`);
    // if (res && res.data) {
    //   runInAction(() => {
    //     this.bchBlockList = res.data.block_list;
    //   });
    // }
  };

  @action
  getBSVBlockList = async () => {
    // const res = await ajax.get(`/bsv/block/list`);
    // if (res && res.data) {
    //   runInAction(() => {
    //     this.bsvBlockList = res.data.block_list;
    //   });
    // }
  };

  @action
  getBCHSpecialCodeList = async () => {
    // const res = await ajax.get(`/bch/code/list`);
    // if (res && res.data) {
    //   runInAction(() => {
    //     this.bchSpecialCodeList = res.data.list;
    //   });
    // }
  };

  @action
  getBSVSpecialCodeList = async () => {
    // const res = await ajax.get(`/bsv/code/list`);
    // if (res && res.data) {
    //   runInAction(() => {
    //     this.bsvSpecialCodeList = res.data.list;
    //   });
    // }
  };

  @action
  getForkChartData = async () => {
    // const res = await ajax.get(`/fork-chart`);
    // if (res && res.data) {
    //   runInAction(() => {
    //     if (res.data.transaction_count) {
    //       let transactionData = res.data.transaction_count;
    //       this.transactionXAxisChartData_zh = transactionData.timestamp.map(
    //         item => dateLocaleFormat(item, 'zh-CN')
    //       );
    //       this.transactionXAxisChartData_en = transactionData.timestamp.map(
    //         item => dateLocaleFormat(item, 'en-US')
    //       );
    //       this.transactionChartData_BCH = transactionData.bch;
    //       this.transactionChartData_BSV = transactionData.bsv;
    //     }
    //     if (res.data.block_reward) {
    //       let blockRewardData = res.data.block_reward;
    //       this.blockRewardXAxisChartData_en = blockRewardData.timestamp.map(
    //         item => dateLocaleFormat(item, 'en-US')
    //       );
    //       this.blockRewardXAxisChartData_zh = blockRewardData.timestamp.map(
    //         item => dateLocaleFormat(item, 'zh-CN')
    //       );
    //       this.blockRewardChartData_BCH = blockRewardData.bch;
    //       this.blockRewardChartData_BSV = blockRewardData.bsv;
    //     }
    //   });
    // }
  };
}

const homeStore = new HomeStore();

export { homeStore };
