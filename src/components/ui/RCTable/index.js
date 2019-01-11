// import React from 'react';
// import './index.scss';

// const getTableHeader = columns => {
//   return columns.map((item, i) => {
//     return (
//       <th
//         key={i}
//         width={item.width}
//         className={item.className}
//         style={{ width: item.width, textAlign: item.align }}
//       >
//         {item.title}
//       </th>
//     );
//   });
// };

// const getTableRowCell = (columns, dataSource, isForked, forkedBlock) => {
//   return dataSource.map((dataItem, index) => {
//     return (
//       <tr
//         key={index}
//         className={`${
//           isForked && forkedBlock == dataItem.height ? 'bsv-line' : ''
//         }`}
//       >
//         {columns.map((item, i) => {
//           return (
//             <td
//               key={i}
//               width={item.width}
//               style={{ width: item.width, textAlign: item.align }}
//             >
//               {item.render(dataItem)}
//             </td>
//           );
//         })}
//       </tr>
//     );
//   });
// };

// const Table = ({
//   columns,
//   dataSource,
//   showHeader = true,
//   style,
//   isForked,
//   forkedBlock
// }) => {
//   return (
//     <div className="table-container" style={style}>
//       <table className="bf-table">
//         {showHeader && (
//           <thead>
//             <tr>{getTableHeader(columns)}</tr>
//           </thead>
//         )}
//         <tbody>
//           {getTableRowCell(columns, dataSource, isForked, forkedBlock)}
//         </tbody>
//       </table>
//     </div>
//   );
// };
// export default Table;

import React from 'react';
import Animate from 'rc-animate';
import 'rc-table/assets/index.css';
import 'rc-table/assets/animation.css';
import './index.scss';
import Table from 'rc-table';

const AnimateBody = props => (
  <Animate transitionName="move" component="tbody" {...props} />
);

const RCTable = ({
  columns,
  dataSource,
  hasFixedColumn = false,
  showHeader = true,
  style,
  isForked,
  forkedBlock
}) => {
  return (
    <div className="table-container">
      {hasFixedColumn ? (
        <Table
          columns={columns}
          data={dataSource}
          scroll={{ x: 1140 }}
          // components={{
          //   body: { wrapper: AnimateBody }
          // }}
          rowClassName={(r, i) => {
            if (i === 0) {
              return 'row-appear';
            }
          }}
        />
      ) : (
        <Table
          columns={columns}
          data={dataSource}
          // components={{
          //   body: { wrapper: AnimateBody }
          // }}
          rowClassName={(r, i) => {
            if (i === 0) {
              return 'row-appear';
            }
          }}
        />
      )}
    </div>
  );
};
export default RCTable;
