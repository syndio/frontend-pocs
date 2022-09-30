import React, { ReactElement } from 'react';
import { Logo } from "./Logo";

import './Header.css';

interface ISidebar {
  className?: string;
  productName: string;
}

export const Header = ({ className = '', productName }: ISidebar): ReactElement => {
  return (
    <header className={`header ${className}`}>
      <div className="header__left-region flex">
        <Logo className="header__logo" />
        {productName && (
          <div className="header__productName">{productName}</div>
        )}
        <div>[[PRODUCT_SWITCHER_HERE]]</div>
      </div>

      <div className="header__right-region flex">
        <div className="header__avatar">S</div>
      </div>
    </header>
  );
};