import React, { ReactNode } from 'react';
import './MessageLabel.css';

import { Sizes, Message } from '@ui/config';
import { Icons, Icon } from '@ui/Icon';

export interface IMessageLabelProps {
  className?: string;
  type?: Message;
  children: ReactNode;
}

export const MessageLabel = ({
  className = '',
  type = Message.Hint,
  children,
}: IMessageLabelProps): JSX.Element => {
  return (
    <div
      className={`syo-message-label__wrapper syo-message-label__wrapper--${type} ${className} `}
    >
      {type === Message.Error && <Icon name={Icons.ErrorCircle} size={Sizes.sm} />}
      {children}
    </div>
  );
};

MessageLabel.displayName = 'MessageLabel';
