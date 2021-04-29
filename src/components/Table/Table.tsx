import React from 'react';
import { Link } from 'react-router-dom';
import { TableAction, TableColumn } from './table.types';
import { formatCellValue } from './utils';

type TableProps = {
  columns: TableColumn[];
  data: any[];
  actions?: TableAction[];
};

export default function Table({ actions, columns, data }: TableProps) {
  return (
    <table className="kbtable">
      <thead>
        <tr>
          {columns.map((column, idx) => (
            <th key={`${idx}-${column}`}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIdx) => {
          return (
            <tr key={rowIdx}>
              {columns.map((column, colIdx) => {
                const cellValue = formatCellValue(
                  item[column.valueKey],
                  column.valueType
                );
                const valueAsLink = column.onClick ? (
                  <Link
                    to={`${column.onClick.linkPrefix}${
                      item[column.onClick.linkKey]
                    }`}
                  >
                    {cellValue}
                  </Link>
                ) : (
                  cellValue
                );
                return <td key={`${colIdx}-${column.title}`}>{valueAsLink}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
      <tfoot></tfoot>
    </table>
  );
}
