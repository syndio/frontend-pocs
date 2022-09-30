import React, { ReactNode } from 'react';
import './Label.css';

export interface ILabelProps {
  labelFor?: string;
  className?: string;
  required?: boolean;
  children: ReactNode;
}

export const Label = ({
  className = '',
  required = false,
  children,
  labelFor,
}: ILabelProps): JSX.Element => {
  return (
    <label htmlFor={labelFor} className={`label__wrapper ${className}`}>
      {children}
      {required && <div className="label--required">*</div>}
    </label>
  );
};

Label.displayName = 'Label';
