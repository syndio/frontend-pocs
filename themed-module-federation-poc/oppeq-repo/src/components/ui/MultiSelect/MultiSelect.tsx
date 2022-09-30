import React, { useRef, useState } from 'react';
import ReactSelect, { GroupBase } from 'react-select';
import type { OnChangeValue, Props as SelectProps } from 'react-select';
import { useOnClickOutside } from '@hooks/ui';
import { Label } from '@ui/Label';
import { MessageLabel } from '@ui/MessageLabel';
import type { IInput } from '@ui/config';
import type { IOption } from '@ui/Select';
import { CheckboxLine, SearchBox, MenuList, ValueDisplay } from './partials';
import './MultiSelect.css';

export interface IMultiSelectProps extends Omit<IInput, 'onChange' | 'onBlur'> {
  id: string;
  options: readonly IOption[];
  onInputChange?: (newValue: string) => void;
  isSearchable?: boolean;
  selectedOptions?: readonly IOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  hasRemoveAll?: boolean;
  hasSelectAll?: boolean;
  onChange?: (newValue: readonly IOption[]) => void | undefined;
  onBlur?: () => void;
}

interface CustomMultiSelectProps {
  hasRemoveAll: boolean;
  hasSelectAll: boolean;
  shownOptions: readonly IOption[];
  setIsOpen: (a: boolean) => void;
}

const CustomMultiSelect = <
  OptionType,
  IsMulti extends boolean = true,
  GroupType extends GroupBase<OptionType> = GroupBase<OptionType>
>(
  props: SelectProps<OptionType, IsMulti, GroupType> & CustomMultiSelectProps
) => {
  return <ReactSelect {...props} />;
};

export const MultiSelect = ({
  onChange = () => {},
  options,
  isSearchable = true,
  selectedOptions = [],
  placeholder = 'Select...',
  hasRemoveAll = true,
  hasSelectAll = true,
  id,
  label,
  message,
  required,
  searchPlaceholder,
  disabled = false,
  onBlur = () => {},
}: IMultiSelectProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const ref = useRef(null);

  useOnClickOutside(ref, () => {
    onBlur();
    setIsOpen(false);
  });

  const styles = {
    placeholder(base: any) {
      return {
        ...base,
        display: 'none',
      };
    },
  };

  return (
    <div className="syo-multi-select__outer-wrapper">
      <Label labelFor={id} required={required}>
        {label}
      </Label>
      <ValueDisplay
        className={`${label ? 'mt-2' : ''} ${
          message ? `syo-multi-select--${message?.type} mb-2` : ''
        }`}
        values={selectedOptions}
        id={id}
        placeholder={placeholder}
        onClick={() => {
          if (!disabled) setIsOpen(!isOpen);
        }}
      />
      {isOpen && (
        <div ref={ref} className="syo-multi-select__inner-wrapper">
          <CustomMultiSelect
            className="syo-multi-select"
            classNamePrefix="syo-multi-select"
            options={options}
            inputId={id}
            name={id}
            isDisabled={disabled}
            isSearchable={isSearchable}
            isMulti
            menuIsOpen={true}
            placeholder={searchPlaceholder}
            isClearable={false}
            backspaceRemovesValue={false}
            hideSelectedOptions={false}
            controlShouldRenderValue={false}
            closeMenuOnSelect={false}
            onChange={(newValue: OnChangeValue<IOption, true>) => onChange(newValue)}
            inputValue={searchText}
            onInputChange={(val, action) => {
              if (action.action === 'input-change') setSearchText(val);
            }}
            menuShouldScrollIntoView={false}
            value={selectedOptions}
            styles={styles}
            hasRemoveAll={hasRemoveAll}
            hasSelectAll={hasSelectAll}
            setIsOpen={setIsOpen}
            shownOptions={options}
            components={{
              Option: CheckboxLine,
              Input: SearchBox,
              MenuList: MenuList,
              DropdownIndicator: null,
              IndicatorSeparator: null,
            }}
          />
        </div>
      )}
      {message && <MessageLabel type={message.type}>{message.label}</MessageLabel>}
    </div>
  );
};

MultiSelect.displayName = 'MultiSelect';
