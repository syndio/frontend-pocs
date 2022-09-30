import React, { ReactElement } from 'react';
import { components } from 'react-select';
import type { SingleValueProps, Props as SelectProps } from 'react-select';
import { Sizes, Direction } from '@ui/config';
import { Avatar } from '@ui/Avatar';
import { Icon, Icons } from '@ui/Icon';
import type { GroupedOption, IOption, IOption2 } from '@ui';

const getIcon = (icon: Icons, className: string) => {
  return <Icon name={icon} size={Sizes.xl} className={className} />;
};

const getAvatar = (avatar: string, avatarClassName: string) => {
  return <Avatar str={avatar} avatarClassName={avatarClassName} />;
};

interface ICustomSingleValueProps {
  iconOnly?: boolean;
  avatar?: string;
  inverse?: boolean;
  icon?: Icons;
  iconPosition?: Direction.Left | Direction.Right;
  avatarClassName?: string;
  baseClassName?: string;
}

export const SingleValue = (
  props: React.PropsWithChildren<SingleValueProps<IOption | IOption2, false, GroupedOption>>
): ReactElement => {
  const { avatar, inverse, icon, iconPosition, iconOnly, avatarClassName, baseClassName } =
    props.selectProps as SelectProps<IOption | IOption2, false, GroupedOption> &
      ICustomSingleValueProps;

  const css = inverse
    ? 'text-white focus:text-white active:text-white bg-transparent border-none'
    : 'text-primary';

  return (
    <components.SingleValue {...props} className={`select__single-value ${css}`}>
      {icon &&
        !avatar &&
        iconPosition === Direction.Left &&
        getIcon(icon, `select__single-value__icon--left ${baseClassName}`)}

      {avatar &&
        !icon &&
        iconPosition === Direction.Left &&
        getAvatar(avatar, `select__single-value__avatar--left ${avatarClassName}`)}

      {!iconOnly && (
        <div className={`select__labels ${props.data.sublabel ? 'select__has-sublabel' : ''}`}>
          {props.data.sublabel && (
            <div className="select__sublabel">{props.data.sublabel}</div>
          )}
          <div className="select__label">{props.children}</div>
        </div>
      )}

      {icon &&
        !avatar &&
        iconPosition === Direction.Right &&
        getIcon(icon, `select__single-value__icon--right ${baseClassName}`)}

      {avatar &&
        !icon &&
        iconPosition === Direction.Right &&
        getAvatar(avatar, `select__single-value__avatar--right ${avatarClassName}`)}
    </components.SingleValue>
  );
};
