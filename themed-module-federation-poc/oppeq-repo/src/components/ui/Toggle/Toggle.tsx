import React from 'react';
import { Sizes, IInput } from '@ui/config';
import './Toggle.css';

interface IToggle extends IInput {
  value: string;
  label?: string;
  checked?: boolean;
}

export const Toggle = ({
  id = '',
  value = '',
  label = '',
  size = Sizes.md,
  className = '',
  disabled = false,
  checked = false,
  onChange = () => {},
}: IToggle): JSX.Element => {
  const sizeMap = {
    '8': 'h-3 w-6 min-w-6',
    '12': 'h-4 w-8 min-w-8',
    '16': 'h-5 w-10 min-w-10',
    '20': 'h-6 w-12 min-w-12',
    '24': 'h-7 w-14 min-w-14',
    '28': 'h-8 w-16 min-w-16',
    '32': 'h-8 w-16 min-w-16',
  };

  const sizeMapText = {
    '8': 'text-xs',
    '12': 'text-sm',
    '16': 'text-base',
    '20': 'text-lg',
    '24': 'text-xl',
    '28': 'text-2xl',
    '32': 'text-2xl',
  };

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className={`flex items-center relative ${
          disabled ? 'cursor-not-allowed' : 'cursor-pointer '
        }`}
        id={`${id}--label`}
        aria-label={id}
      >
        <input
          type="checkbox"
          role="button"
          id={id}
          key={`toggle-${id}`}
          className="sr-only"
          disabled={disabled}
          onChange={onChange}
          value={value}
          checked={checked}
        />
        <div className={`toggle-bg toggle-bg-${size} rounded-full ${sizeMap[size]}`}></div>
        {label && (
          <span className={`ml-3 text-primary ${sizeMapText[size]} font-medium`}>{label}</span>
        )}
      </label>
    </div>
  );
};

Toggle.displayName = 'Toggle';
