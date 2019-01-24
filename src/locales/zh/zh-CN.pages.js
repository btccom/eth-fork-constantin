import flatten from 'flat';
const pageMesage = {
  pages: {
    appName: '以太坊区块链浏览器',
    upgradedTip: '君士坦丁堡升级',
    block: '区块',
    sinceLastBlock: '自最新区块',
    blockstoGo: '区块倒计',
    activeAt: '君士坦丁堡将在 {block} 区块激活，预计时间约为 {time}。',
    forkRemark:
      '君士坦丁堡分叉升级主要变动为延迟难度炸弹、以太币减产、减少Gas消耗成本等。',
    viewMore: '点此查看更多',
    height: '高度',
    age: '块龄',
    miner: '播报方',
    reward: '奖励',
    blockTime: '播报用时',
    txns: '交易数量',
    size: '容量',
    rewardChartTitle: '以太坊区块奖励统计图',
    forkTime: '{time} 君士坦丁堡分叉',
    rewardChartYaxisTitlePerHour: '每小时新以太币产生',
    rewardChartYaxisTitlePerDay: '每天新以太币产生',
    gasUsedChartTitle: '以太坊每笔交易平均Gas使用统计图',
    gasUsedChartYaxisTitle: '每笔交易平均Gas使用量',
    priceChart: '以太币价格',
    etherPriceCurrency: '以太币价格（CNY）',
    introduction: '君士坦丁堡介绍',
    introPrg1Title: '1.君士坦丁堡硬分叉是什么？',
    introPrg1:
      '君士坦丁堡硬分叉将在区块7280000激活，预计在2019年2月27日左右。君士坦丁堡硬分叉是大都会的第二阶段，主要调整以太坊的经济政策，主要包括延迟难度炸弹，以太币减产以及燃料Gas成本的大幅降低。',
    introPrg2Title: '2.本次硬分叉会实现哪些EIP改进方案？',
    introPrg2: '君士坦丁堡硬分叉包括5项以太坊改进方案',
    introPrg2eip145:
      'EIP 145：EVM中的按位移位指令。提供原生的按位移位，运行成本相同，执行更加快速。',
    introPrg2eip1014: 'EIP 1014：Skinny CREATE2. 状态通道性能显著提高。',
    introPrg2eip1052: 'EIP 1052：EXTCODEHASH操作码， 指定新的操作码。',
    introPrg2eip1283:
      'EIP 1283：使用不同的合约数据存储定价方式，大幅度削减Gas成本。',
    introPrg2eip1234: 'EIP 1234：难度炸弹延迟，区块以太币奖励减产。',
    eipNum: 'EIP {num}',
    eipBrief145: '按位移位',
    eipBrief1014: '状态通道“闪电网络”',
    eipBrief1052: '智能合约哈希',
    eipBrief1283: 'Gas定价变更',
    eipBrief1234: '推迟难度炸弹 区块奖励减产',
    introPrg3Title: '3.扩展信息：以太坊开发路线图',
    introPrg3SubTitle: '以太坊开发路线包括四个阶段：',
    introPrg3Item1: '1.前沿（2015年7月）——以太坊区块链诞生',
    introPrg3Item2: '2.家园（2016年3月）——部署多项改进协议，提升交易速度',
    introPrg3Item3:
      '3.大都会（2017年10月）——扩容提速，提升安全。分解为两个版本：',
    introPrg3Item3Sub1: '（1）拜占庭（2017年10月）',
    introPrg3Item3Sub2: '（2）君士坦丁堡（2019年1月）',
    introPrg3Item4: '4.宁静（时间待定）：采用POS共识即Casper共识算法',
    perHour: '小时线',
    perDay: '日线',
    chartForkRemarkText: '君士坦丁堡分叉',
    reset: '重置',
    zoom: '缩放',
    totalSupplyEther: '新增以太币供应总计：',
    fromBlockRewards: '来自区块播报奖励：',
    fromUncleInclReward: '来自叔块引用奖励：',
    fromUncleReward: '来自叔块播报奖励：',
    avgGasUsedPerTxn: '单笔平均Gas使用量：',
    forkedAt: '君士坦丁堡硬分叉已成功激活于区块 {block}，激活时间为 {time}',
    postponedTip: '延迟',
    seeDetail: '查看详情',
    tbd: '待定',
    postponedTip: '由于发现安全漏洞，君士坦丁堡升级推迟，升级时间待定'
  }
};
const pageMesageFlatten = flatten(pageMesage);
export default pageMesageFlatten;
