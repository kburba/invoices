import React from 'react';

type Props = {
  data: any[];
  name: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  error?: string;
};

const Dropdown = React.forwardRef<HTMLSelectElement, Props>(
  ({ data, value, name, onChange, error }, ref) => {
    return (
      <>
        <select value={value} ref={ref} name={name} onChange={onChange}>
          <option disabled>Select...</option>
          {data.map((item, idx) => (
            <option key={item.key} value={item.value}>
              {item.text}
            </option>
          ))}
        </select>
        {error && <div>{error}</div>}
      </>
    );
  }
);
export default Dropdown;
