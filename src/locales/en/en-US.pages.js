import flatten from 'flat';
const pageMessage = {
  pages: {
    appName: 'Ethereum Explorer',
    upgradedTip: 'Constantinople Upgrade',
    block: 'Block',
    sinceLastBlock: 'since last block',
    blockstoGo: 'blocks to go',
    activeAt: 'Constantinople will activate on block {block} nearly {time}. ',
    forkRemark:
      'Constantinople fork partly focuses on delaying the difficulty bomb, reducing ETH reward and excessive gas costs.',
    viewMore: 'View more details',
    height: 'Height',
    age: 'Age',
    miner: 'Miner',
    reward: 'Reward',
    blockTime: 'Block Time',
    txns: 'Txns',
    size: 'Size',
    rewardChartTitle: 'Ethereum Block Rewards Chart',
    forkTime: '{time} Constantinople Fork',
    rewardChartYaxisTitle: 'New Ether Supply Per Hour',
    gasUsedChartTitle: 'Ethereum Average Gas Used Per Transaction Chart',
    gasUsedChartYaxisTitle: 'Average Gas Used Per Transaction',
    priceChart: 'Ether Prices Chart',
    etherPriceCurrency: 'Ether Prices（USD）',
    introduction: 'Constantinople Introduction',
    introPrg1Title: '1. What is Constantinople Hard Fork?',
    introPrg1:
      "Constantinople mainnet hard fork scheduled for block #7080000, estimated around the 16th of January, 2019. Constantinople fork is the concluding part of Metropolis phase to make adjustments to Ethereum's economic policy, which partly focuses on delaying the difficulty bomb, reducing ETH reward and excessive gas costs.",
    introPrg2Title: '2. Which EIPs are implemented?',
    introPrg2:
      'The Constantinople hard fork encompasses five separate Ethereum Improvement Proposals (EIPs).',
    introPrg2eip145:
      'EIP 145: Bitwise shifting instructions in EVM. To provide native bitwise shifting with cost on par with other arithmetic operations.',
    introPrg2eip1014:
      'EIP 1014: Skinny CREATE2. Allows for a significant performance increase in state channels.',
    introPrg2eip1052: 'EIP 1052: EXTCODEHASH Opcode. Specifies a new opcode.',
    introPrg2eip1283:
      'EIP 1283: Net gas metering for SSTORE without dirty maps. Enabling new usages for contract storage, and reducing excessive gas costs.',
    introPrg2eip1234:
      'EIP 1234: Constantinople Difficulty Bomb Delay and Block Reward Adjustment. ',
    eipNum: 'EIP {num}',
    eipBrief145: 'Bitwise shift',
    eipBrief1014: 'State shannels "Lighting network"',
    eipBrief1052: 'Hash of smart contracts',
    eipBrief1283: 'Gas metering change',
    eipBrief1234: 'Delay difficulty bomb  Reduce block reward',
    introPrg3Title: '3. Extend information：Ethereum upgrade road map',
    introPrg3SubTitle:
      'These are the four planned stages in the development of Ethereum. ',
    introPrg3Item1: '1.Frontier (July 2015) ——Ethereum Blockchain goes live.',
    introPrg3Item2:
      '2.Homestead (March 2016) ——Many protocol improvements for speeding up transactions.',
    introPrg3Item3:
      '3.Metropolis (Oct 2017) ——Lighter, faster and more secure. It is broken down into two releases:',
    introPrg3Item3Sub1: ' (1)Byzantium (Oct 2017）',
    introPrg3Item3Sub2: ' (2)Constantinople (Jan 2018)',
    introPrg3Item4:
      '4.Serenity (TBA) : Proof of Stake using the Casper consensus algorithm.',
    perHour: 'Per Hour',
    perDay: 'Per Day',
    reset: 'Reset',
    zoom: 'Zoom',
    totalSupplyEther: 'Total New Supply Ether:',
    fromBlockRewards: 'From Block Rewards:',
    fromUncleInclReward: 'From UncelIncl Rewards:',
    fromUncleReward: 'From Uncel Rewards:',
    avgGasUsedPerTxn: 'Avg Gas Used Per Txn:',
    forkedAt: '君士坦丁堡硬分叉已成功激活于区块{block}，激活时间为{time}'
  }
};
const pageMessageFlatten = flatten(pageMessage);
export default pageMessageFlatten;