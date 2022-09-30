import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tabs, Tab } from './Tabs';

export default {
  title: 'Navigation/Tabs',
  component: Tabs,
  argTypes: {
    className: {
      description: 'Provide your own HTML classes',
    },
    'aria-label': {
      description:
        'All tabs are required to provide a text alternative to indicate the user that they have landed on a Tabs component. <br /><br /> Example:<br /> `<Tabs aria-label="Demographics Tabs" />` <br /><br /> If it is not provided, component will throw an error.',
    },
    defaultTabId: {
      description: 'Sets the active tab to the one that matches this ID.',
    },
    onChange: {
      description:
        'Exposes onChange outside the Tab component with two arguments; the event object and the ID of the tab activated.',
    },
  },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => (
  <Tabs {...args}>
    <Tab id="demographics" title="Demographics">
      Demographics!
    </Tab>
    <Tab id="levels" title="Levels">
      Levels!
    </Tab>
  </Tabs>
);

export const Basic = Template.bind({});

Basic.args = {
  'aria-label': 'Default Tabs',
};

export const DefaultActive = Template.bind({});

DefaultActive.args = {
  'aria-label': 'Default Tabs',
  defaultTabId: 'levels',
};

const StatefulTemplate: ComponentStory<typeof Tabs> = (args) => {
  const [activeTabId, setActiveTabId] = useState('levels');

  return (
    <Tabs
      {...args}
      activeTabId={activeTabId}
      onChange={(e, tabId) => {
        setActiveTabId(tabId);
      }}
    >
      <Tab id="demographics" title="Demographics">
        Demographics!
      </Tab>
      <Tab id="levels" title="Levels">
        Levels!
      </Tab>
    </Tabs>
  );
};

export const Controlled = StatefulTemplate.bind({});
