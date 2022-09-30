import React, { ReactNode, ReactElement } from 'react';
import ReactSelect from 'react-select';
import type { Props as SelectProps, GroupBase } from 'react-select';
import { Direction, Message } from '@ui/config';
import { Icons } from '@ui/Icon';
import { Label } from '@ui/Label';
import {
  Control,
  SingleValue,
  Menu,
  CustomOption,
  DropdownIndicator,
  IndicatorSeparator,
  ValueContainer,
} from './partials';
import { throttle } from '@utils';
import './Select.css';
import { MessageLabel } from '@ui/MessageLabel';

export interface IOption2 {
  readonly value: string;
  readonly label: string;
  readonly color?: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
  readonly icon?: Icons;
  readonly iconDirection?: Direction.Left | Direction.Right;
  readonly iconClassName?: string;
  readonly selected?: boolean;
  readonly id?: string;
  readonly toolTip?: string | ReactNode;
  readonly sublabel?: string;
}

export interface IOption {
  readonly value: string;
  readonly label: string;
  readonly sublabel?: string;
  readonly isDisabled?: boolean;
  readonly icon?: Icons;
  readonly iconDirection?: Direction.Left | Direction.Right;
  readonly iconClassName?: string;
  readonly selected?: boolean;
  readonly url?: string;
  readonly shouldOpenInNewTab?: boolean;
  readonly id?: string;
  readonly toolTip?: string | ReactNode;
}

export interface GroupedOption {
  readonly label: string;
  readonly options: readonly IOption[] | readonly IOption2[];
}

export interface ISelectProps {
  avatar?: string;
  className?: string;
  avatarClassName?: string;
  defaultValue?: IOption | IOption2 | GroupedOption;
  disabled?: boolean;
  icon?: Icons;
  iconOnly?: boolean;
  iconPosition?: Direction.Left | Direction.Right;
  id?: string;
  inputId?: string;
  inverse?: boolean;
  isRtl?: boolean;
  options: readonly IOption[] | readonly IOption2[] | readonly GroupedOption[];
  onChange?: (option?: any) => void;
  onMenuClose?: (e?: any) => void | undefined;
  required?: boolean;
  separator?: boolean;
  borderless?: boolean;
  alignMenuRight?: boolean;
  defaultMenuIsOpen?: boolean;
  label?: ReactNode;
  message?: { label: ReactNode; type: Message };
  innerLabel?: ReactNode;
  value?: IOption | IOption2;
  name?: string;
}

interface ICustomSelectProps {
  inverse?: boolean;
  avatar?: string;
  avatarClassName?: string;
  baseClassName?: string;
  icon?: Icons;
  borderless?: boolean;
  iconOnly?: boolean;
  iconPosition?: Direction.Left | Direction.Right;
  innerLabel?: ReactNode;
}

const CustomSelect = <
  OptionType,
  IsMulti extends boolean = false,
  GroupType extends GroupBase<OptionType> = GroupBase<OptionType>
>({
  ...props
}: SelectProps<OptionType, IsMulti, GroupType> & ICustomSelectProps) => {
  return <ReactSelect {...props} />;
};

export const Select = ({
  className = '',
  avatarClassName = '',
  defaultValue,
  disabled = false,
  inverse = false,
  options,
  onChange = () => null,
  icon,
  iconPosition = Direction.Left,
  iconOnly = false,
  isRtl = false,
  separator = false,
  avatar,
  borderless = false,
  alignMenuRight = false,
  defaultMenuIsOpen = false,
  required = false,
  label = '',
  message,
  onMenuClose,
  innerLabel = '',
  value,
  name,
  id,
  inputId,
}: ISelectProps): ReactElement => {
  let css = inverse ? 'text-white bg-transparent' : 'text-primary';
  const iconOnlyCss = iconOnly ? 'select__icon-only' : '';

  if (borderless) {
    css = `${css} border-none`;
  }

  if (alignMenuRight) {
    css = `${css} select__align-menu--right`;
  }

  // throttle onChange to avoid pounding the server when doing direct API calls
  const onThrottleChange = throttle(onChange, 5000);

  const getDefaultValue = () => {
    if (defaultValue) {
      return defaultValue;
    }
    // @ts-ignore
    if (options[0]?.options) {
      // @ts-ignore
      const defaultOptions = options[0].options.find((o) => o.selected);
      if (!defaultOptions && iconOnly)
        throw new Error(
          'If component is iconOnly and uses GroupedOption, requires either a selected item or defaultValue to render properly!'
        );
      return defaultOptions;
    } else {
      // @ts-ignore
      return options.find((o) => o.selected);
    }
  };

  const extraProps = {
    ...(value ? { value } : null),
    ...(name ? { name } : null),
  };

  const labelProps = {
    ...(inputId ? { labelFor: inputId } : null),
  };

  if ((label || innerLabel) && !inputId) {
    throw new Error(
      '"inputId" prop must be provided when "label" or "innerLabel" is provided'
    );
  }

  return (
    <div className={`syo-select inline-block ${className} ${iconOnlyCss}`} id={id}>
      {label && (
        <Label required={required} {...labelProps}>
          {label}
        </Label>
      )}
      <CustomSelect<IOption | IOption2, false, GroupedOption>
        inputId={inputId}
        defaultValue={getDefaultValue()}
        options={options}
        onChange={onThrottleChange}
        classNamePrefix="select"
        className={`select ${css} ${label ? 'mt-2' : ''} ${message ? 'mb-2' : ''}`}
        isRtl={isRtl}
        onMenuClose={onMenuClose}
        isSearchable={false}
        isClearable={false}
        defaultMenuIsOpen={defaultMenuIsOpen}
        isDisabled={disabled}
        menuShouldScrollIntoView={false}
        borderless={borderless}
        icon={icon}
        iconPosition={iconPosition}
        iconOnly={iconOnly}
        avatarClassName={avatarClassName}
        inverse={inverse}
        avatar={avatar}
        innerLabel={innerLabel}
        baseClassName={className}
        components={{
          Option: CustomOption,
          Menu,
          Control: Control,
          SingleValue: SingleValue,
          // eslint-disable-next-line react/display-name
          IndicatorSeparator: (props: any) => {
            const iProps = {
              ...props,
              selectProps: {
                ...props.selectProps,
                inverse,
                iconOnly,
              },
            };
            return separator ? <IndicatorSeparator {...iProps} /> : null;
          },
          // eslint-disable-next-line react/display-name
          DropdownIndicator: (props: any) => {
            const iProps = {
              ...props,
              selectProps: {
                ...props.selectProps,
                inverse,
                iconOnly,
              },
            };
            return <DropdownIndicator {...iProps} />;
          },
          ValueContainer: ValueContainer,
        }}
        {...extraProps}
      />
      {message && <MessageLabel type={message.type}>{message.label}</MessageLabel>}
    </div>
  );
};

Select.displayName = 'Select';
