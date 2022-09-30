import React from 'react';
import { TruncatedList } from '@ui/TruncatedList';
import type { IOption } from '@ui/Select';
import { Icon, Icons } from '@ui/Icon';
import { Sizes } from '@ui/config';

interface ICustomValueContainerProps {
  values: readonly IOption[];
  id: string;
  placeholder?: string;
  onClick: () => void;
  className?: string;
}

export const ValueDisplay = (props: ICustomValueContainerProps): JSX.Element => {
  const myValues = props.values.map((e) => {
    return { id: e.value, name: e.label };
  });

  return (
    <div
      className={`syo-multi-select__value-display ${props.className}`}
      onClick={props.onClick}
      role="button"
      tabIndex={0}
    >
      {myValues.length ? (
        <TruncatedList list={myValues} id={`${props.id}-List`} className="leading-4" />
      ) : (
        <div className="syo-multi-select__placeholder">{props.placeholder}</div>
      )}
      <Icon name={Icons.ChevronDown} size={Sizes.lg} className="text-actionPrimary" />
    </div>
  );
};
