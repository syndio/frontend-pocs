import React, { ReactNode } from 'react';
import './TextInput.css';

import { Sizes, IInput } from '@ui/config';
import { Label } from '@ui/Label';
import { Icons, Icon } from '@ui/Icon';
import { MessageLabel } from '@ui/MessageLabel';

export interface ITextInputProps extends IInput {
  icon?: Icons;
  label?: ReactNode;
  max?: number;
  maxLength?: number;
  min?: number;
  onMouseDown?: (e: any) => void;
  onWheel?: (e: any) => void;
  placeholder?: string;
  step?: number;
  type?: 'string' | 'number';
  value: string | number | undefined | readonly string[];
  suffix?: ReactNode;
  inputClassName?: string;
}

export const TextInput = ({
  className = '',
  disabled = false,
  message,
  icon,
  id,
  label,
  onChange,
  onBlur,
  onMouseDown,
  onWheel,
  placeholder,
  max,
  maxLength,
  min,
  required = false,
  step,
  suffix,
  type = 'string',
  value,
  inputClassName,
}: ITextInputProps): JSX.Element => {
  return (
    <div className={`syo-text-input__wrapper ${className}`}>
      <Label required={required}>{label}</Label>
      <div className={`syo-text-input__input_container ${label ? 'mt-2' : ''}`}>
        {icon && <Icon name={icon} className="syo-text-input__icon" size={Sizes.md} />}
        <input
          id={id}
          onChange={onChange}
          onWheel={onWheel}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeholder}
          className={`syo-text-input appearance-none ${
            message ? `syo-text-input--${message?.type} mb-2` : ''
          }  ${icon ? 'syo-text-input__input_icon' : ''} ${inputClassName}`}
          value={value}
          type={type}
          maxLength={maxLength}
          min={min}
          max={max}
          step={step}
          onMouseDown={onMouseDown}
          data-testid={id}
        />
        {suffix && <div className="syo-text-input__suffix">{suffix}</div>}
      </div>
      {message && <MessageLabel type={message.type}>{message.label}</MessageLabel>}
    </div>
  );
};

TextInput.displayName = 'Input';
