import React, { ReactNode, ReactElement } from 'react';
import type { ITabPanel } from '../types';

export const TabPanel = ({ children, activeTab }: ITabPanel): JSX.Element => {
  // Grab children as array then filter by activeTab
  const activePanel = React.Children.toArray(children).filter(
    (child: ReactNode) => (child as ReactElement)?.props.id === activeTab
  );

  return (
    <>
      {React.Children.map(activePanel, (child: ReactNode) => {
        const { className, id, children: panelChildren } = (child as ReactElement)?.props;
        return (
          <div
            className={`syo-tabs__pane animate-fade-in ${className || ''}`}
            id={`panel-${id}`}
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={`tab-${id}`}
            hidden={!activeTab}
          >
            {panelChildren}
          </div>
        );
      })}
    </>
  );
};
