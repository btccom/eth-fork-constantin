import { dateFormat } from 'utils';
dateFormat();

const doughnuChartColors = [
  '#975FE4',
  '#3AA0FF',
  '#36CBCB',
  '#4DCB73',
  '#FAD337',
  '#FA8C16',
  '#F2637B',
  '#F5222D',
  '#EB2F96',
  '#919191',
  '#ccldc0'
];

const defaultPageSizeOptions = ['10', '25', '50', '100', '150'];

const getTimespanStr = dayTimespan => {
  return new Date(
    new Date().getTime() - dayTimespan * 24 * 60 * 60 * 1000
  ).format('yyyyMMdd');
};
const chartStartTimeRangeMap = {
  '1': getTimespanStr(7), // per hour
  '2': getTimespanStr(30) // per day
};

export { doughnuChartColors, defaultPageSizeOptions, chartStartTimeRangeMap };
