import React, { ReactNode } from 'react';
import './Callout.css';

interface ICallout {
  className?: string;
  iconClassName?: string;
  children?: ReactNode;
}

export const Callout = ({
  className = '',
  children,
}: ICallout): JSX.Element => {
  return (
    <div className={`syo-callout syo-callout__wrapper ${className}`}>
      <div className="syo-callout__children">{children}</div>
    </div>
  );
};