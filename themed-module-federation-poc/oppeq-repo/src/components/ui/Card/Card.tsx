import classNames from 'tailwindcss-classnames';
import React, { ReactNode } from 'react';
import './Card.css';

interface CardProps {
  children?: ReactNode;
  border?: boolean;
  borderless?: boolean;
  className?: string;
}

export const Card = ({ className = '', border, children }: CardProps): JSX.Element => {
  const css = classNames({
    'rounded-lg': true,
    'text-gray-500': true,
    'text-sm': true,
    'font-extrabold': true,
    border,
    'bg-white': true,
  });

  return <div className={`syo-card ${css} ${className}`}>{children}</div>;
};

Card.displayName = 'Card';
