import React, { ReactChild, ReactChildren } from 'react';
import { Sizes } from '@ui/config';
import './Pill.css';

interface IPill {
  className?: string;
  children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
  size?: Sizes;
  transparent?: boolean;
  disabled?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
}

export const Pill = ({
  children,
  className = '',
  disabled = false,
  size = Sizes.md,
  transparent = false,
  onClick,
}: IPill): JSX.Element => {
  const sizeMap = {
    '8': 'syo-pill--size-8',
    '12': 'syo-pill--size-12',
    '16': 'syo-pill--size-16',
    '20': 'syo-pill--size-20',
    '24': 'syo-pill--size-24',
    '28': 'syo-pill--size-28',
    '32': 'syo-pill--size-32',
  };

  const bg = !transparent ? 'syo-pill--bg-fill' : 'syo-pill--bg-transparent';
  const pointerCss = onClick ? 'syo-pill__pointer' : '';

  if (!children) {
    throw new Error('Pill component must have a children');
  }

  return (
    <button
      className={`syo-pill ${className} ${sizeMap[size]} ${bg} ${pointerCss}`}
      disabled={disabled}
      onClick={onClick}
      onKeyPress={(e) => {
        if (e.key === 'Space' && onClick) {
          onClick();
        }
      }}
      tabIndex={0}
    >
      {children}
    </button>
  );
};

Pill.displayName = 'Pill';
