import React from 'react';
import type { ITreeNodeText } from '@ui/Tree/types';

export const TreeNodeText = ({ children, className = '' }: ITreeNodeText): JSX.Element => {
  return (
    <div
      className={`syo-tree__node__text inline-block leading-1 ${className}`}
      role="button"
      tabIndex={0}
    >
      {children}
    </div>
  );
};

TreeNodeText.displayName = 'TreeNodeText';
