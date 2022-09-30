import React, { ReactNode } from 'react';

export interface IUI {
  id?: string;
  disabled?: boolean;
  className?: string;
}

export interface IInput {
  id?: string;
  onChange?: (e: React.ChangeEvent<any | undefined>) => void | undefined;
  onBlur?: (e: React.FocusEvent) => void | undefined;
  onWheel?: (e: React.WheelEvent<any | undefined>) => void | undefined;
  disabled?: boolean;
  size?: Sizes;
  className?: string;
  required?: boolean;
  message?: { label: ReactNode; type: Message };
  label?: ReactNode;
}

export enum Intent {
  Primary = 'primary',
  Secondary = 'secondary',
  Transparent = 'transparent',
}

export enum Direction {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
}

export enum Message {
  Error = 'error',
  Hint = 'hint',
}
export enum DataMode {
  ServerSide = 'serverSide',
  ClientSide = 'clientSide',
}

export enum Sizes {
  xs = '8',
  sm = '12',
  md = '16',
  lg = '20',
  xl = '24',
  xxl = '28',
  xxxl = '32',
}
