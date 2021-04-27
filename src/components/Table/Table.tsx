import React from 'react';
import { TableAction, TableColumn } from './table.types';
import { formatCellValue } from './utils';

type TableProps = {
  columns: TableColumn[];
  data: any[];
  actions?: TableAction[];
};

export default function Table({ actions, columns, data }: TableProps) {
  return (
    <table>
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
                return <td key={`${colIdx}-${column.title}`}>{cellValue}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
      <tfoot></tfoot>
    </table>
  );
}
