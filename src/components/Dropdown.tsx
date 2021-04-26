import React from 'react';
import { UseFormRegister } from 'react-hook-form';

type Props = {
  data: any[];
  valueKey: string;
  nameKey: string;
  value: string | number;
  error?: string;
};

const Dropdown = React.forwardRef<
  HTMLSelectElement,
  Props & ReturnType<UseFormRegister<any>>
>(({ data, valueKey, nameKey, value, name, onBlur, onChange, error }, ref) => {
  return (
    <>
      <select
        value={value}
        ref={ref}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
      >
        {data.map((item, idx) => (
          <option key={`${idx}-${item[nameKey]}`} value={item[valueKey]}>
            {item[nameKey]}
          </option>
        ))}
      </select>
      {error && <div>{error}</div>}
    </>
  );
});
export default Dropdown;
