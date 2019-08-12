import React, { InputHTMLAttributes, FunctionComponent } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
}

const InputGroup: FunctionComponent<Props> = props => {
  const { id, label, helperText } = props;
  return (
    <div className="input-group">
      <input className="input" {...props} />

      <div className="input-label d-flex align-items-center justify-content-between">
        <label htmlFor={id}>{label}</label>
        {helperText && <span className="input-helper">{helperText}</span>}
      </div>
    </div>
  );
};

export default InputGroup;
