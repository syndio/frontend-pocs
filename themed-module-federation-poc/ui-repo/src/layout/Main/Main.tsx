import React, { ReactElement } from 'react';
import './Main.css';

interface IMain {
  children?: ReactElement;
  className?: string;
}

export const Main = ({ children, className = '' }: IMain): ReactElement => {
  return <main className={`main ${className}`}>{children}</main>;
};