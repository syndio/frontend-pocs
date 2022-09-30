import React, { ReactNode } from 'react';
import { Sizes } from '@ui/config';
import { Icon, Icons } from '@ui/Icon';
import './Callout.css';

interface ICallout {
  icon?: Icons | undefined;
  className?: string;
  iconClassName?: string;
  children?: ReactNode;
}

export const Callout = ({
  icon,
  className = '',
  iconClassName = '',
  children,
}: ICallout): JSX.Element => {
  return (
    <div className={`syo-callout__wrapper ${className}`}>
      {icon && (
        <div className="syo-callout__icon">
          <Icon name={icon} size={Sizes.xl} className={iconClassName} />
        </div>
      )}
      <div className="syo-callout__children">{children}</div>
    </div>
  );
};

Callout.displayName = 'Callout';
