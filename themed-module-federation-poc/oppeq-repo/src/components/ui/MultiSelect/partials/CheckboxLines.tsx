import React, { ReactElement } from 'react';
import type { OptionProps, GroupBase } from 'react-select';
import { Checkbox, CheckboxState } from '@ui/Checkbox';
import type { IOption } from '@ui/Select';

export const CheckboxLine = (
  props: OptionProps<IOption, true, GroupBase<IOption>>
): ReactElement => {
  return (
    <Checkbox
      className="syo-multi-select__checkbox"
      value={props.isSelected ? CheckboxState.True : CheckboxState.False}
      onChange={() => props.selectOption(props.data)}
    >
      {props.label}
    </Checkbox>
  );
};
