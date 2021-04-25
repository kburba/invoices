import React from 'react';

type Props = {
  data: any[];
  valueKey: string;
  nameKey: string;
  value: string | number;
};

export default function Dropdown({ data, valueKey, nameKey, value }: Props) {
  return (
    <select value={value}>
      {data.map((item, idx) => (
        <option key={`${idx}-${item[nameKey]}`} value={item[valueKey]}>
          {item[nameKey]}
        </option>
      ))}
    </select>
  );
}
