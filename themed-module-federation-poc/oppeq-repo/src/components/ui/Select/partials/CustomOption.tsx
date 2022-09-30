import React, { ReactElement, useState, useRef } from 'react';
import { components } from 'react-select';
import type { OptionProps, Props as SelectProps } from 'react-select';
import { Direction, Sizes, Intent } from '@ui/config';
import type { GroupedOption, IOption, IOption2 } from '@ui';
import { Tooltip } from '@ui/Tooltip';
import { Icon } from '@ui/Icon';

interface ICustomOptionProps extends OptionProps<IOption | IOption2> {
  inverse?: boolean;
}

export const CustomOption = (
  props: OptionProps<IOption | IOption2, false, GroupedOption>
): ReactElement => {
  const { inverse, isRtl } = props.selectProps as SelectProps<
    IOption | IOption2,
    false,
    GroupedOption
  > &
    ICustomOptionProps;

  const { label, id, icon, iconClassName, sublabel, isDisabled } = props.data as
    | IOption
    | IOption2;

  const css = inverse ? 'text-white bg-transparent' : 'text-primary';
  const [isTooltipShown, setTooltipShown] = useState(false);
  const optionRef = useRef(null);
  const toolTipText = props.data.toolTip as string | ReactElement;
  const toolTip = toolTipText ? (
    <Tooltip
      targetRef={optionRef}
      isVisible={isTooltipShown}
      placement={Direction.Right}
      intent={Intent.Secondary}
    >
      {toolTipText}
    </Tooltip>
  ) : (
    <></>
  );
  let iconDirection = '';

  if (Direction.Left && !isRtl) {
    iconDirection = Direction.Left;
  }

  if (Direction.Right && isRtl) {
    iconDirection = Direction.Right;
  }

  return (
    <components.Option {...props} className={`select__option ${css} flex`}>
      {icon && iconDirection === Direction.Left && (
        <div
          className={`select__option-icon select__option-icon--left ${iconClassName}`}
          id={id}
        >
          <Icon name={icon} size={Sizes.md} />
        </div>
      )}
      {
        <div
          onMouseLeave={() => setTooltipShown(false)}
          onMouseEnter={() => setTooltipShown(true)}
          className="flex-grow w-full"
          ref={optionRef}
          id={id && id}
        >
          <div className={`prose prose-body-regular ${isDisabled ? 'text-gray-500' : ''}`}>
            {label}
            <div>{toolTip}</div>
          </div>

          {sublabel && <div className="prose prose-helper-regular-12">{sublabel}</div>}
        </div>
      }

      {icon && iconDirection === Direction.Right && (
        <div
          className={`select__option-icon select__option-icon--right ${iconClassName}`}
          id={id && id}
        >
          <Icon name={icon} size={Sizes.md} />
        </div>
      )}
    </components.Option>
  );
};
