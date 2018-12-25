import React from 'react';
import './index.scss';

const getTableHeader = columns => {
  return columns.map((item, i) => {
    return (
      <th
        key={i}
        width={item.width}
        className={item.className}
        style={{ width: item.width, textAlign: item.align }}
      >
        {item.title}
      </th>
    );
  });
};

const getTableRowCell = (columns, dataSource, isForked, forkedBlock) => {
  return dataSource.map((dataItem, index) => {
    return (
      <tr
        key={index}
        className={`${
          isForked && forkedBlock == dataItem.height ? 'bsv-line' : ''
        }`}
      >
        {columns.map((item, i) => {
          return (
            <td
              key={i}
              width={item.width}
              style={{ width: item.width, textAlign: item.align }}
            >
              {item.render(dataItem)}
            </td>
          );
        })}
      </tr>
    );
  });
};

const Table = ({
  columns,
  dataSource,
  showHeader = true,
  style,
  isForked,
  forkedBlock
}) => {
  return (
    <div className="table-container" style={style}>
      <table className="bf-table">
        {showHeader && (
          <thead>
            <tr>{getTableHeader(columns)}</tr>
          </thead>
        )}
        <tbody>
          {getTableRowCell(columns, dataSource, isForked, forkedBlock)}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
