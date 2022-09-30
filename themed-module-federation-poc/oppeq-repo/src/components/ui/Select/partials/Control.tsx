import React, { ReactElement } from 'react';
import { components } from 'react-select';
import type { ControlProps, Props as SelectProps } from 'react-select';
import type { GroupedOption, IOption, IOption2 } from '@ui';

interface CustomControlProps extends ControlProps<any> {
  borderless?: boolean;
  inverse?: boolean;
}

export const Control = (
  props: React.PropsWithChildren<ControlProps<IOption | IOption2, false, GroupedOption>>
): ReactElement => {
  const { inverse, borderless } = props.selectProps as SelectProps<
    IOption,
    false,
    GroupedOption
  > &
    CustomControlProps;
  const css = inverse ? 'text-white bg-transparent' : 'text-primary';
  const borderCss = borderless ? 'border-none' : '';

  return (
    <components.Control {...props} className={`select__control ${css} ${borderCss}`}>
      {props.children}
    </components.Control>
  );
};
