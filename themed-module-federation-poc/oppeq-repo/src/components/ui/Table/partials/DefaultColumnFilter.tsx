import React, { ReactElement, useCallback, useState, useEffect } from 'react';
import { Icons } from '@ui/Icon';
import { TextInput } from '@ui/TextInput';
import { debounce } from '@utils/debounce';

export interface IDefaultColumnFilterProps {
  column: {
    filterValue: string;
    setFilter: (term: string | undefined) => void;
    id: string;
  };
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  debounceWait?: number;
}

export const DefaultColumnFilter = ({
  column,
  placeholder = 'Search',
  disabled = false,
  className,
  debounceWait = 0,
}: IDefaultColumnFilterProps): ReactElement => {
  const [value, setValue] = useState(column.filterValue || '');

  useEffect(() => {
    if (!column.filterValue) {
      setValue('');
    }
  }, [column.filterValue]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeDebounced = useCallback(
    debounce(
      (value: any) => {
        column.setFilter(value || undefined); // Set undefined to remove the filter entirely
      },
      debounceWait,
      false
    ),
    [debounceWait, column]
  );

  const onChange = (value: any) => {
    setValue(value);
    onChangeDebounced(value);
  };

  return (
    <TextInput
      value={value}
      icon={Icons.MagnifyingGlass}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
      key={`${column.id}-filter`}
    />
  );
};
