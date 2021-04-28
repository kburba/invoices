import React from 'react';
import { DeepMap, FieldError } from 'react-hook-form';

type Props = {
  param: string;
  title: string;
  errors: DeepMap<any, FieldError>;
};

const InputGroup = React.forwardRef<HTMLInputElement, Props>(
  ({ errors, param, title }, ref) => {
    return (
      <div className="inputGroup">
        <label htmlFor={param}>{title}</label>
        <input placeholder={`Enter ${title.toLowerCase()}...`} ref={ref} />
        {errors[param] && (
          <div className="errorMsg">{errors[param].message}</div>
        )}
      </div>
    );
  }
);

export default InputGroup;
