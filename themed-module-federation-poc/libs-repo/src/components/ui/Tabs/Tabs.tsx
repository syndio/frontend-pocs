import React, { ReactElement, useState } from 'react';
import { TabNav } from './partials/TabNav';
import { TabPanel } from './partials/TabPanel';
import { Tab } from './partials/Tab';
import type { ITabs } from './types';
import './Tabs.css';

export const Tabs = ({
  children,
  className = '',
  onChange,
  defaultTabId, // uncontrolled
  activeTabId, // controlled
  ...props
}: ITabs): JSX.Element => {
  const ariaLabel = props['aria-label'];

  // if no default is provided, set the default to the id of the first tab
  const [activeTab, setActiveTab] = useState(
    defaultTabId || (React.Children.toArray(children) as ReactElement[])[0].props.id
  );

  const onChangeTab = (e: React.KeyboardEvent | React.MouseEvent, id: string) => {
    setActiveTab(id);

    if (onChange) {
      onChange(e, id);
    }
  };

  return (
    <div className={`syo-tabs ${className}`} role="tablist" aria-label={ariaLabel}>
      <TabNav onChange={onChangeTab} activeTab={activeTabId || activeTab}>
        {children}
      </TabNav>
      <TabPanel activeTab={activeTabId || activeTab}>{children}</TabPanel>
    </div>
  );
};

export { Tab };
