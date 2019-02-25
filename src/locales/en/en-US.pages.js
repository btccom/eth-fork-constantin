import flatten from 'flat';
const pageMessage = {
  pages: {
    appName: 'Ethereum Explorer',
    upgradedTip: 'Constantinople/St.Petersburg Upgrade',
    block: 'Block',
    sinceLastBlock: 'since last block',
    blockstoGo: 'blocks to go',
    activeAt:
      'Constantinople/St.Petersburg will activate on block {block} nearly {time}. ',
    forkRemark:
      'Constantinople/St.Petersburg fork partly focuses on delaying the difficulty bomb, reducing ETH reward.',
    viewMore: 'View more details',
    height: 'Height',
    age: 'Age',
    miner: 'Miner',
    reward: 'Reward',
    blockTime: 'Block Time',
    txns: 'Txns',
    size: 'Size',
    rewardChartTitle: 'Ethereum Block Rewards Chart',
    forkTime: '{time} Constantinople/St.Petersburg Fork',
    rewardChartYaxisTitlePerHour: 'New Ether Supply Per Hour',
    rewardChartYaxisTitlePerDay: 'New Ether Supply Per Day',
    gasUsedChartTitle: 'Ethereum Average Gas Used Per Transaction Chart',
    gasUsedChartYaxisTitle: 'Average Gas Used Per Transaction',
    priceChart: 'Ether Prices Chart',
    etherPriceCurrency: 'Ether Prices（USD）',
    introduction: 'Constantinople/St.Petersburg Introduction',
    introPrg1Title: '1. What is Constantinople/St.Petersburg Hard Fork?',
    introPrg1:
      "Constantinople/St.Petersburg mainnet hard fork scheduled for block #7280000, estimated around the 28th of February, 2019. Constantinople/St.Petersburg fork is the concluding part of Metropolis phase to make adjustments to Ethereum's economic policy, which partly focuses on delaying the difficulty bomb, reducing ETH reward and excessive gas costs.",
    introPrg2Title: '2. Which EIPs are implemented?',
    introPrg2:
      'The Constantinople/St.Petersburg hard fork encompasses five separate Ethereum Improvement Proposals (EIPs).',
    introPrg2eip145:
      'EIP 145: Bitwise shifting instructions in EVM. To provide native bitwise shifting with cost on par with other arithmetic operations.',
    introPrg2eip1014:
      'EIP 1014: Skinny CREATE2. Allows for a significant performance increase in state channels.',
    introPrg2eip1052: 'EIP 1052: EXTCODEHASH Opcode. Specifies a new opcode.',
    introPrg2eip1283:
      'EIP 1283: Net gas metering for SSTORE without dirty maps. Enabling new usages for contract storage, and reducing excessive gas costs.',
    introPrg2eip1234:
      'EIP 1234: Constantinople/St.Petersburg Difficulty Bomb Delay and Block Reward Adjustment. ',
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
    introPrg3Item3Sub2: ' (2)Constantinople/St.Petersburg (Feb 2019)',
    introPrg3Item4:
      '4.Serenity (TBA) : Proof of Stake using the Casper consensus algorithm.',
    perHour: 'Per Hour',
    perDay: 'Per Day',
    chartForkRemarkText: 'Constantinople/St.Petersburg Fork',
    reset: 'Reset',
    zoom: 'Zoom',
    totalSupplyEther: 'Total New Supply Ether:',
    fromBlockRewards: 'From Block Rewards:',
    fromUncleInclReward: 'From UncelIncl Rewards:',
    fromUncleReward: 'From Uncel Rewards:',
    avgGasUsedPerTxn: 'Avg Gas Used Per Txn:',
    forkedAt:
      'Constantinople/St.Petersburg activated on block {block} at {time}',
    postponedTip: 'POSTPONED',
    seeDetail: 'See More Detail',
    tbd: 'TBD',
    postponedTip:
      'Constantinople/St.Petersburg network upgrade has been postponed due to security vulnerability until further notice',
    remove1283Tip:
      '* EIP 1283 will be removed from the St.Petersburg network upgrade.'
  }
};
const pageMessageFlatten = flatten(pageMessage);
export default pageMessageFlatten;
