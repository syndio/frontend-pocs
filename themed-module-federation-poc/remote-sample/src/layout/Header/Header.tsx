import React, { ReactElement } from 'react';
import { Logo } from "./Logo";

import './Header.css';

interface ISidebar {
  className?: string;
  productName: string;
}

export const Header = ({ className = '', productName }: ISidebar): ReactElement => {
  return (
    <header className={`header ${className} animate-fade-in`}>
      <div className="header__left-region flex">
        <Logo className="header__logo" />
        {productName && (
          <div className="header__productName">{productName}</div>
        )}
      </div>

      <div className="header__right-region flex">
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-teal text-white">S</div>
      </div>
    </header>
  );
};