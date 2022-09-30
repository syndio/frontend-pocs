import React, { ReactNode } from 'react';
import './Sidebar.css';

interface ISidebar {
  children?: ReactNode;
  className?: string;
}

export const Sidebar = ({ children, className = '' }: ISidebar): JSX.Element => {
  return <nav className={`sidebar ${className}`}>{children}</nav>;
};