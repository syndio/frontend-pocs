import React, { ReactNode } from 'react';

interface IMain {
  children?: ReactNode;
  className?: string;
}

export const Main = ({ children, className = '' }: IMain): JSX.Element => {
  return <main className={`main grow bg-gradient-to-t from-gray-100 p-4 pt-14 ${className}`}>{children}</main>;
};