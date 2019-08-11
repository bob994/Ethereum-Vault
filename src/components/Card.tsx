import React, { FunctionComponent, SVGProps } from 'react';

interface Props {
  title: string;
  Icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
  footer?: JSX.Element;
}

const Card: FunctionComponent<Props> = ({ title, Icon, footer, children }) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-title">{title}</div>
        {Icon && (
          <div className="card-header-icon">
            <Icon />
          </div>
        )}
      </div>
      <div className="card-content">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;
