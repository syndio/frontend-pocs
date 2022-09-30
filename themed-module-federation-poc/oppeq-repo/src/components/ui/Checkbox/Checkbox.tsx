import React, { ReactNode } from 'react';
import './Checkbox.css';

import type { IInput } from '@ui/config';
import { Sizes } from '@ui/config';
import { Icon, Icons } from '@ui/Icon';

export enum CheckboxState {
  True = 'true',
  False = 'false',
  Indeterminate = 'indeterminate',
}

interface ICheckbox extends Omit<IInput, 'onChange'> {
  children?: ReactNode;
  value: CheckboxState;
  onChange: (val: CheckboxState) => void | undefined;
}

export const defaultCheckboxOnChange = (val: CheckboxState): CheckboxState => {
  if (val === CheckboxState.True) return CheckboxState.False;
  return CheckboxState.True;
};

export const Checkbox = ({
  id,
  className,
  onChange = () => {},
  children,
  value,
  disabled = false,
  size = Sizes.md,
}: ICheckbox): JSX.Element => {
  let bgColor = 'text-actionPrimary';
  if (value === CheckboxState.False) {
    bgColor = disabled ? 'text-gray-200' : 'text-white';
  } else if (disabled) {
    bgColor = 'text-gray-300';
  }

  const iconClassName = disabled ? 'text-gray-400' : 'text-white';
  let iconName;
  if (value === CheckboxState.Indeterminate) iconName = Icons.CheckBoxIndeterminate;
  else if (value === CheckboxState.True) iconName = Icons.CheckBoxCheck;

  const checkBoxIcons = (
    <div className="syo-checkbox-icons" style={{ width: `${size}px`, height: `${size}px` }}>
      <Icon name={Icons.CheckBoxBG} size={size} className={bgColor} />
      {(disabled || value === CheckboxState.False) && (
        <Icon name={Icons.CheckBoxBox} size={size} className="text-gray-400" />
      )}
      {iconName && <Icon name={iconName} size={size} className={iconClassName} />}
    </div>
  );

  return (
    <label htmlFor={id} className={`${className} syo-checkbox-container-label`}>
      <input
        className="syo-checkbox-input"
        id={id}
        ref={(input) => {
          if (input) {
            if (value === CheckboxState.Indeterminate) input.indeterminate = true;
            else if (value === CheckboxState.False) input.checked = false;
            else if (value === CheckboxState.True) input.checked = true;
          }
        }}
        disabled={disabled}
        onChange={() => onChange(value)}
        type="checkbox"
      />
      {checkBoxIcons}
      <div className="syo-checkbox-label">{children}</div>
    </label>
  );
};

Checkbox.displayName = 'Checkbox';
