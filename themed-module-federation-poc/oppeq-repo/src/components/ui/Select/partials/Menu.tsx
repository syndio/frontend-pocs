import React, { ReactElement } from 'react';
import { components, MenuProps } from 'react-select';
import { IOption, IOption2, GroupedOption } from '../Select';

export const Menu = (
  props: MenuProps<IOption | IOption2, false, GroupedOption>
): ReactElement => {
  return (
    <components.Menu<IOption | IOption2, false, GroupedOption>
      {...props}
      className="select__menu"
    >
      {props.children}
    </components.Menu>
  );
};
