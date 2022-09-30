import React, { ReactNode } from 'react';
import { Intent, Direction, Sizes } from '@ui/config';
import { Icon, Icons } from '@ui/Icon';
import './Button.css';

export interface IButtonProps {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  intent?: Intent;
  icon?: Icons;
  iconDirection?: Direction.Left | Direction.Right;
  iconSize?: Sizes;
}

export const Button = (props: IButtonProps): JSX.Element => {
  const {
    children,
    className = '',
    disabled = false,
    icon,
    onClick,
    iconDirection = Direction.Left,
    intent = Intent.Secondary,
    iconSize = Sizes.xl,
  } = props;

  const btnIntentCss = `syo-btn--${intent}`;
  const iconIntentCss = `syo-btn__ico--${intent}`;

  return (
    <button
      className={`syo-btn ${btnIntentCss} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && iconDirection === Direction.Left && (
        <Icon name={icon} size={iconSize} className={`${iconIntentCss} syo-btn__ico--left`} />
      )}

      <span>{children}</span>

      {icon && iconDirection === Direction.Right && (
        <Icon name={icon} size={iconSize} className={`${iconIntentCss} syo-btn__ico--right`} />
      )}
    </button>
  );
};

Button.displayName = 'Button';
