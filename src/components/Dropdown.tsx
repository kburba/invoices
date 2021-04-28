import React from 'react';
import classnames from 'classnames';

type Props = {
  data: any[];
  name: string;
  value: string | number;
  onChange: (value: any) => void;
  error?: boolean;
};

const Dropdown = React.forwardRef<HTMLSelectElement, Props>(
  ({ data, value, name, onChange, error }, ref) => {
    return (
      <select
        value={value}
        ref={ref}
        name={name}
        className={classnames({ error })}
        onChange={(e) => onChange(e.target.value)}
      >
        <option disabled value="">
          Select {name}...
        </option>
        {data.map((item, idx) => (
          <option key={item.key} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    );
  }
);
export default Dropdown;
