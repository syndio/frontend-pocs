import React from 'react';
import { components } from 'react-select';
import type { MenuListProps, GroupBase, Props as SelectProps } from 'react-select';
import type { IOption } from '@ui/Select';

export interface ICustomMenuListProps {
  hasRemoveAll?: boolean;
  hasSelectAll?: boolean;
  onChange: (v: readonly IOption[]) => void;
  shownOptions: readonly IOption[];
}

export const MenuList = (
  props: React.PropsWithChildren<MenuListProps<IOption, true, GroupBase<IOption>>>
): JSX.Element => {
  const { hasRemoveAll, hasSelectAll, onChange, shownOptions, inputValue, options } =
    props.selectProps as SelectProps<IOption, true, GroupBase<IOption>> & ICustomMenuListProps;

  return (
    <div className="syo-multi-select__menu-container">
      {hasRemoveAll && props.getValue().length === options?.length && (
        <button onClick={() => onChange([])} className="syo-multi-select__edit-all">
          Remove all
        </button>
      )}
      {hasSelectAll && !inputValue && props.getValue().length !== options?.length && (
        <button onClick={() => onChange(shownOptions)} className="syo-multi-select__edit-all">
          Select all
        </button>
      )}
      <components.MenuList {...props}>{props.children}</components.MenuList>
    </div>
  );
};
