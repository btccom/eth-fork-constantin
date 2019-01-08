import { observable, action, runInAction, computed, reaction } from 'mobx';
import ajax from 'ajax';
import { getCurrentTimestamp, dateLocaleFormat } from 'utils';
import io from 'socket.io-client';
import { socketIOURL } from 'constants';

class HomeStore {
  @observable
  loading;

  @observable
  forkStatusInfo;

  @observable
  forkBlockInfo;

  @observable
  latestBlockList;

  @observable
  historyBlockList;

  @observable
  blockRewardChartData;
  @observable
  avgGasChartData;
  @observable
  pricesChartData;

  @observable
  isFinishedQuery;

  constructor() {
    this.loading = false;
    this.isFinishedQuery = false;
    this.forkTargetHeight = 7080000;
    this.forkStatusInfo = {};
    this.forkBlockInfo = {};
    this.latestBlockList = [];
    this.historyBlockList = [];
    this.blockRewardChartData = {};
    this.avgGasChartData = {};
    this.pricesChartData = {};
  }

  startSocket = () => {
    try {
      this.socket = io.connect(
        socketIOURL,
        { transports: ['websocket', 'polling', 'flashsocket'] }
      );
      setTimeout(() => {
        this.getLatestBlockList_io();
      }, 5000);
    } catch (error) {}
  };

  closeSocket = () => {
    this.socket.close();
  };

  @action
  getAll = () => {
    runInAction(() => {
      this.getForkInfo();
      // this.getBSVSpecialCodeList();
    });
  };

  @action
  getInstantData = () => {
    runInAction(() => {
      // this.getBSVSpecialCodeList();
    });
  };

  @action
  getForkInfo = async () => {
    this.isFinishedQuery = false;

    this.forkStatusInfo = {
      fork_height: 7080000,
      fork_timestamp: 1547649000,
      latest_height: 7050300, //7050300,
      latest_height_timestamp: 1546843540
    };
    // const res = await ajax.get(`/fork/status`);
    this.isFinishedQuery = true;
    // if (res && res.data) {
    //   runInAction(() => {
    //     this.forkStatusInfo = res.data;
    //   });
    // }
  };

  @computed
  get isForked() {
    return this.forkStatusInfo.fork_height <= this.forkStatusInfo.latest_height;
  }

  @action
  getLatestBlockList = async () => {
    const res = await ajax.get(`/block/list`, {
      params: {
        page: 1,
        size: 10
      }
    });
    if (res && res.data) {
      runInAction(() => {
        if (this.isForked) {
          let tempList = res.data.list;
          if (
            res.data.list[10].block_height > this.forkBlockInfo.block_height
          ) {
            tempList.splice(-1, 1, this.forkBlockInfo);
          }
          this.latestBlockList = tempList;
        } else {
          this.latestBlockList = res.data.list;
        }
      });
    }
  };

  @action
  getLatestBlockList_io = () => {
    this.socket.on('newblocks', latestBlocks => {
      if (!latestBlocks) {
        return;
      }
      let result = JSON.parse(latestBlocks);
      let oldList = this.latestBlockList.slice();
      let isExist = false;
      oldList.forEach(element => {
        if (element.block_height == result.block_height) {
          isExist = true;
        }
      });
      if (!isExist) {
        for (let key in result) {
          oldList.push(result[key]);
        }
        let {
          fork_height,
          fork_timestamp,
          latest_height,
          latest_height_timestamp
        } = this.forkStatusInfo;
        latest_height = result[0].block_height;
        latest_height_timestamp = result[0].created_ts;
        this.forkStatusInfo = {
          fork_height,
          fork_timestamp,
          latest_height,
          latest_height_timestamp
        };

        this.summary.total_blocks = result[0].block_height;
        this.latestBlockList = oldList.slice(-10);
      }
    });
  };

  @action
  getHistoryBlockList = async () => {
    const res = await ajax.get(`/block/list`, {
      params: {
        start: this.forkStatusInfo.fork_height - 11,
        end: this.forkStatusInfo.fork_height
      }
    });
    if (res && res.data) {
      runInAction(() => {
        let historyList = res.data.list;
        this.forkBlockInfo = historyList[0];
        this.historyBlockList = historyList.slice(1, 10);
      });
    }
  };

  @action
  getBlockRewardChartData = async () => {
    this.blockRewardChartData = {};
    const res = await ajax.get(`/fork/chart/block-reward`);
    if (res && res.data) {
      runInAction(() => {
        this.blockRewardChartData = res.data;
      });
    }
  };

  @action
  getAvgGasChartData = async (start, freq) => {
    this.avgGasChartData = {};
    const res = await ajax.get(`/fork/chart/average-gas`, {
      params: {
        start,
        freq
      }
    });
    if (res && res.data) {
      runInAction(() => {
        let { fork_timestamp, time_axis, price_axis } = res.data;
        time_axis = time_axis.map(item => item.substr(0, 16));
        this.avgGasChartData = { fork_timestamp, time_axis, price_axis };
      });
    }
  };

  @action
  getPricesChartData = async () => {
    this.pricesChartData = {};
    const res = await ajax.get(`/fork/chart/price`);
    if (res && res.data) {
      runInAction(() => {
        this.pricesChartData = res.data;
      });
    }
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
