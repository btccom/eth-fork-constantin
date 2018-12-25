import React from 'react';
import './index.scss';
const RateLabel = ({ changeRate, style }) => {
  if (!changeRate) {
    return null;
  }
  let cls = changeRate === 0 ? '' : changeRate > 0 ? 'increase' : 'decline';
  let rate = changeRate === 0 ? 0 : Math.abs(changeRate).toFixed(2) + '%';
  return (
    <span className="rate-label">
      <i className={`${cls}-icon`} />
      <span className={`${cls}-text`} style={{ marginLeft: 4 }}>
        {cls === 'increase' ? '+' : '-'}
        {rate}
      </span>
    </span>
  );
};
export default RateLabel;
