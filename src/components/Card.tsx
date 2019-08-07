import React, { FunctionComponent } from 'react';

interface Props {
  title: string;
  icon?: string;
  footer?: JSX.Element;
}

const Card: FunctionComponent<Props> = ({ title, icon, footer, children }) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-title">{title}</div>
        {icon && (
          <div className="card-header-icon">
            <img src={icon} alt="Copy Address" />
          </div>
        )}
      </div>
      <div className="card-content">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;
