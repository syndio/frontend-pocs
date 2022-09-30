import React, { ChangeEvent } from 'react';
import type { GroupBase, InputProps } from 'react-select';
import { Icons } from '@ui/Icon';
import { TextInput } from '@ui/TextInput';
import type { IOption } from '@ui/Select';

export const SearchBox = (
  props: InputProps<IOption, true, GroupBase<IOption>>
): JSX.Element => {
  const { onInputChange, inputValue, inputId } = props.selectProps;

  return (
    <TextInput
      placeholder="Search"
      id={inputId}
      className="syo-multi-select__search"
      icon={Icons.MagnifyingGlass}
      value={inputValue}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        onInputChange(e.currentTarget.value, {
          action: 'input-change',
          prevInputValue: inputValue,
        });
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.target.focus();
      }}
    />
  );
};
