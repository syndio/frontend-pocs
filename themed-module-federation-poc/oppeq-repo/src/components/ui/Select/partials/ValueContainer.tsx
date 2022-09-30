import React, { ReactElement, ReactNode } from 'react';
import { components } from 'react-select';
import { ValueContainerProps, Props as SelectProps } from 'react-select';
import { Label } from '@ui/Label/Label';
import type { GroupedOption, IOption, IOption2 } from '@ui';

interface ICustomValueContainerProps {
  innerLabel?: ReactNode;
  required?: boolean;
  inputId?: string;
}

export const ValueContainer = (
  props: React.PropsWithChildren<ValueContainerProps<IOption | IOption2, false, GroupedOption>>
): ReactElement => {
  const { innerLabel, required, inputId } = props.selectProps as SelectProps<
    IOption | IOption2,
    false,
    GroupedOption
  > &
    ICustomValueContainerProps;

  return (
    <components.ValueContainer
      {...props}
      className={innerLabel ? 'syo-select--inner-label' : ''}
    >
      {innerLabel && (
        <Label required={required} labelFor={inputId}>
          {innerLabel}
        </Label>
      )}
      {props.children}
    </components.ValueContainer>
  );
};
