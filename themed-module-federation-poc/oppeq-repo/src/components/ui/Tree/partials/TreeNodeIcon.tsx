import React from 'react';
import { ITreeNodeIcon } from '@ui/Tree/types';

export const TreeNodeIcon = ({
  className = '',
  children,
  tabIndex = 0,
}: ITreeNodeIcon): JSX.Element => {
  return (
    <span role="button" tabIndex={tabIndex} className={`syo-tree__node__icon ${className}`}>
      {children}
    </span>
  );
};

TreeNodeIcon.displayName = 'TreeNodeIcon';
