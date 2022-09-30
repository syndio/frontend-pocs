import React, { ReactNode } from 'react';
import { IUI } from '../config';

export interface ITabNav {
  children: ReactNode;
  onChange: (e: React.KeyboardEvent | React.MouseEvent, id: string) => void;
  activeTab: string;
}

export interface ITabPanel {
  children: ReactNode;
  activeTab: string;
}

export interface ITabButton {
  onChange: (e: React.KeyboardEvent | React.MouseEvent, id: string) => void;
  onFocus: (id: string) => void;
  focusedTab: string;
  activeTab: string;
  id: string;
  title: ReactNode;
}

export interface ITab extends IUI {
  children: ReactNode;
  title: ReactNode;
  id: string;
}

export interface ITabs extends IUI {
  children: ReactNode;
  onChange?: (e: React.KeyboardEvent | React.MouseEvent, id: string) => void;
  'aria-label': string;
  defaultTabId?: string;
  activeTabId?: string;
}
