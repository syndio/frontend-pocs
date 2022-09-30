import React, { ReactNode, ComponentType } from 'react';

export interface ITreePartials {
  TreeBranch: ComponentType<ITreeBranch>;
  TreeNode: ComponentType<ITreeNode>;
  TreeNodeIcon: ComponentType<ITreeNodeIcon>;
  TreeNodeText: ComponentType<ITreeNodeText>;
}

export interface ITreeCore {
  partials?: ITreePartials;
}

export interface ITree extends ITreeCore {
  data: ITreeItem[];
  className?: string;
  onToggle?: (e: React.KeyboardEvent | React.MouseEvent, selected: ITreeItem) => void;
  expandedIds?: string[] | number[];
}

export interface ITreeBranch extends ITreeCore {
  item: ITreeItem;
  parent?: boolean;
  level: number;
  onToggle?: (e: React.KeyboardEvent | React.MouseEvent, selected: ITreeItem) => void;
  expanded?: boolean;
  expandedIds?: string[] | number[];
}

export interface ITreeItem {
  id: string | number;
  label: string;
  items?: ITreeItem[];
  parent?: boolean;
  selected?: boolean;
  expanded?: boolean;
}

export interface ITreeNode extends ITreeCore {
  item: ITreeItem;
  parent?: boolean;
  className?: string;
  onToggle: (e: React.KeyboardEvent | React.MouseEvent, selected: ITreeItem) => void;
  expanded: boolean;
}

export interface ITreeNodeText {
  item: ITreeItem;
  children?: ReactNode;
  className?: string;
  expanded: boolean;
}

export interface ITreeNodeIcon {
  className?: string;
  item: ITreeItem;
  children?: ReactNode;
  parent: boolean;
  expanded: boolean;
  tabIndex: number;
}
