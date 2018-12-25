import flatten from 'flat';
const pageMesage = {
  pages: {
    upgradedTipBefore: '比特币现金网络升级倒计时',
    upgradedTipAfter: '比特币现金网络在{block}块高度成功升级',
    height: '高度',
    relayedBy: '播报方',
    Time: '时间',
    notForked: '（尚未分叉）',
    blockRewardTitle: 'BCH vs BSV 平均区块奖励',
    coinbaseFees: '出块+手续费（BCH 或 BSV）',
    blockReward: '区块奖励',
    transactionVsTitle: 'BCH vs BSV 交易数量',
    transactionPerDay: '每日交易数',
    specialOPCode: '特殊操作码',
    bchOpCode: '{count} 新操作码',
    bsvOpCode: '{count} 旧操作码',
    countDownTip: '倒计时随区块时间动态调整'
  }
};
const pageMesageFlatten = flatten(pageMesage);
export default pageMesageFlatten;
