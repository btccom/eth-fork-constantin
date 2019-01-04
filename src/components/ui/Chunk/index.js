import React from 'react';
import './index.scss';
/**
 * type:primary|secondary
 *
 */
const Chunk = ({
  type,
  children,
  paddings = ['auto', '10px', 'auto', '10px'],
  //mode = 'default',
  style
}) => {
  const [paddingTop, paddingRight, paddingBottom, paddingLeft] = [...paddings];

  return (
    <div
      className={`chunk chunk-${type}`}
      style={{
        ...style,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft
      }}
    >
      {children}
    </div>
  );
};

export default Chunk;
