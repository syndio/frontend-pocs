import React, { useState, ReactNode, ReactElement } from 'react';
import { TabButton } from '@ui/Tabs/partials/TabButton';
import type { ITabNav } from '@ui/Tabs/types';

export const TabNav = ({ children, onChange, activeTab }: ITabNav): JSX.Element => {
  const [focusedTab, setFocusTab] = useState('');

  const onFocus = (id: string) => {
    setFocusTab(id);
  };

  return (
    <div className={`syo-tabs__nav`}>
      {React.Children.map(children, (child: ReactNode) => {
        return (
          <TabButton
            onChange={onChange}
            onFocus={onFocus}
            focusedTab={focusedTab}
            activeTab={activeTab}
            {...(child as ReactElement)?.props}
          />
        );
      })}
    </div>
  );
};
