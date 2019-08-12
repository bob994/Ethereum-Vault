import React, { ButtonHTMLAttributes, FunctionComponent } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'rounded';
}

const Button: FunctionComponent<Props> = props => {
  const { variant, type = 'button' } = props;
  console.log(variant);
  return (
    <button
      type={type}
      className={`button ${variant ? variant : ''}`}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
