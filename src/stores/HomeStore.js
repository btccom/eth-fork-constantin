import { observable, action, runInAction, computed, reaction } from 'mobx';
import ajax from 'ajax';
import io from 'socket.io-client';
import { socketIOURL } from 'constants';

class HomeStore {
  @observable
  loading;

  @observable
  isForked;

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
    this.isForked = false;
    this.forkTargetHeight = 7280000;
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
      this.socket = io.connect(socketIOURL, {
        transports: ['websocket', 'polling', 'flashsocket']
      });
      setTimeout(() => {
        this.getLatestBlockList_io();
      }, 5000);
    } catch (error) {}
  };

  closeSocket = () => {
    this.socket.close();
  };

  @action
  getForkInfo = async callback => {
    //this.isFinishedQuery = false;

    const res = await ajax.get(`/fork/status`);
    this.isFinishedQuery = true;
    if (res && res.data) {
      runInAction(() => {
        this.forkStatusInfo = res.data;

        // let mockHeight = 7062569;
        // this.forkStatusInfo.fork_height = mockHeight;
        // this.forkStatusInfo.fork_timestamp = 1547326680;

        this.isForked =
          this.forkStatusInfo.fork_height <= this.forkStatusInfo.latest_height;
        callback && callback(this.isForked);
      });
    }
  };

  // @computed
  // get isForked() {
  //   return this.forkStatusInfo.fork_height <= this.forkStatusInfo.latest_height;
  // }

  @action
  getLatestBlockList = async () => {
    const res = await ajax.get(`/blocks`, {
      params: {
        page: 1,
        size: 10
      }
    });
    if (res && res.data) {
      runInAction(() => {
        if (this.isForked) {
          let tempList = res.data.list;
          for (let i = 0; i < 10; i++) {
            if (tempList[i].block_height < this.forkStatusInfo.fork_height) {
              tempList[i] = {};
            }
          }
          if (res.data.list[9].block_height > this.forkStatusInfo.fork_height) {
            tempList = tempList.slice(0, 8);
            let s = '......';
            tempList.push({
              id: s,
              block_height: s,
              block_reward: s,
              miner_hash: s,
              miner_name: s
            });
            const {
              id,
              block_height,
              block_reward,
              miner_hash,
              miner_name
            } = this.forkBlockInfo;
            tempList.push({
              id,
              block_height,
              block_reward,
              miner_hash,
              miner_name
            });
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

        let tempList = oldList.slice(-10);
        // DRY 后续优化
        if (tempList[9].block_height > this.forkStatusInfo.fork_height) {
          tempList = tempList.slice(0, 8);
          let s = '......';
          tempList.push({
            id: s,
            block_height: s,
            block_reward: s,
            miner_hash: s,
            miner_name: s
          });
          const {
            id,
            block_height,
            block_reward,
            miner_hash,
            miner_name
          } = this.forkBlockInfo;
          tempList.push({
            id,
            block_height,
            block_reward,
            miner_hash,
            miner_name
          });
        }
        this.latestBlockList = tempList;
      }
    });
  };

  @action
  getHistoryBlockList = async () => {
    const res = await ajax.get(`/blocks`, {
      params: {
        start: this.forkStatusInfo.fork_height - 11,
        end: this.forkStatusInfo.fork_height
      }
    });
    if (res && res.data) {
      runInAction(() => {
        let historyList = res.data.list;
        this.forkBlockInfo = historyList[0];
        this.historyBlockList = historyList.slice(1, 11);

        this.getLatestBlockList();
      });
    }
  };

  @action
  getBlockRewardChartData = async (start, freq) => {
    const res = await ajax.get(`/fork/chart/block-reward`, {
      params: {
        start,
        freq
      }
    });
    if (res && res.data) {
      runInAction(() => {
        let { fork_timestamp, time_axis, reward_axis } = res.data;
        time_axis = time_axis.map(item =>
          freq == '1' ? item.substr(0, 16) : item.substr(0, 10)
        );
        this.blockRewardChartData = {
          fork_timestamp,
          time_axis,
          reward_axis
        };
      });
    }
  };

  @action
  getAvgGasChartData = async (start, freq) => {
    const res = await ajax.get(`/fork/chart/average-gas`, {
      params: {
        start,
        freq
      }
    });
    if (res && res.data) {
      runInAction(() => {
        let { fork_timestamp, time_axis, price_axis } = res.data;
        time_axis = time_axis.map(item =>
          freq == '1' ? item.substr(0, 16) : item.substr(0, 10)
        );
        this.avgGasChartData = { fork_timestamp, time_axis, price_axis };
      });
    }
  };

  @action
  getPricesChartData = async (start, freq) => {
    const res = await ajax.get(`/fork/chart/price`, {
      params: {
        start,
        freq
      }
    });
    if (res && res.data) {
      runInAction(() => {
        let {
          fork_timestamp,
          time_axis,
          price_usd_axis,
          price_cny_axis
        } = res.data;
        time_axis = time_axis.map(item =>
          freq == '1' ? item.substr(0, 16) : item.substr(0, 10)
        );
        this.pricesChartData = {
          fork_timestamp,
          time_axis,
          price_usd_axis,
          price_cny_axis
        };
      });
    }
  };
}

const homeStore = new HomeStore();

export { homeStore };
