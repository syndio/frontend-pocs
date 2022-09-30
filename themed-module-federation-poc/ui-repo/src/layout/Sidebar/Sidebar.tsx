import React, { ReactNode } from 'libs/react';
import { Info } from './Info';
import './Sidebar.css';

interface ISidebar {
  children?: JSX.Element;
  className?: string;
}

export const Sidebar = ({ children, className = '' }: ISidebar): JSX.Element => {
  return (
    <nav className={`sidebar ${className}`}>
      <Info />
      {children}
    </nav>
  );
};