import React from 'react';
import './index.scss';

const Card = ({ type = 'primary', children, showHighlight = false, style }) => {
  return (
    <div className={`card ${showHighlight ? 'hightlight' : ''}`} style={style}>
      {children}
    </div>
  );
};

export default Card;