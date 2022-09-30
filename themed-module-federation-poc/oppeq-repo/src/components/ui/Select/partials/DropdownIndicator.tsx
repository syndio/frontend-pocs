import React, { ReactElement } from 'react';
import { components, DropdownIndicatorProps } from 'react-select';

interface IDropdownIndicator extends DropdownIndicatorProps {
  selectProps: any;
}

export const DropdownIndicator = (props: IDropdownIndicator): ReactElement | null => {
  const { iconOnly } = props.selectProps;

  return !iconOnly ? <components.DropdownIndicator {...props} /> : null;
};
