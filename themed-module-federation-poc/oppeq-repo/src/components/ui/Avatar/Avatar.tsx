import React, { ReactElement } from 'react';

interface IAvatarProps {
  str: string;
  avatarClassName?: string;
}

export const Avatar = ({
  str,
  avatarClassName = 'avatar--primary',
}: IAvatarProps): ReactElement => {
  return (
    <div
      className={`
        inline-block text-white text-xl rounded-2xl w-8 h-8 align-middle text-center
        ${avatarClassName}
      `}
    >
      {str.charAt(0)}
    </div>
  );
};

Avatar.displayName = 'Avatar';
