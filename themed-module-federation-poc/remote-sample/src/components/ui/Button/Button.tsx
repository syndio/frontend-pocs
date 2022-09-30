import React, { ReactNode } from 'react';
import './Button.css';

export interface IButtonProps {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export const Button = (props: IButtonProps): JSX.Element => {
  const {
    children,
    className = '',
    disabled = false,
    onClick,
  } = props;

  return (
    <button
      className={`syo-btn ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{children}</span>
    </button>
  );
};

Button.displayName = 'Button';
