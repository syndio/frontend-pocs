import React from 'react';
import type { ITab } from '../types';

export const Tab = ({ children, className = '', title }: ITab): JSX.Element => {
  return (
    <div className={`${className}`}>
      <strong>{title}</strong>
      {children}
    </div>
  );
};
