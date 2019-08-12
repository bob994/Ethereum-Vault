import React, { InputHTMLAttributes, FunctionComponent } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helpertext?: string;
}

const InputGroup: FunctionComponent<Props> = props => {
  const { id, label, helpertext } = props;
  return (
    <div className="input-group">
      <input className="input" {...props} />

      <div className="input-label d-flex align-items-center justify-content-between">
        <label htmlFor={id}>{label}</label>
        {helpertext && <span className="input-helper">{helpertext}</span>}
      </div>
    </div>
  );
};

export default InputGroup;
