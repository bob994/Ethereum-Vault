import React, { FunctionComponent } from 'react';

interface Props {
  title: string;
  icon?: string;
  content: any;
  footer?: any;
  // content: string | Element[] | undefined;
  className?: string;
}

const Card: FunctionComponent<Props> = ({
  title,
  icon,
  content,
  footer,
  className = '',
}) => {
  return (
    <div className={`card ${className}`}>
      <div className="card-header">
        <div className="card-header-title">{title}</div>
        {icon && (
          <div className="card-header-icon">
            <img src={icon} alt="Copy Address" />
          </div>
        )}
      </div>
      <div className="card-content">{content}</div>
      <div className="card-footer">{footer}</div>
    </div>
  );
};

export default Card;
