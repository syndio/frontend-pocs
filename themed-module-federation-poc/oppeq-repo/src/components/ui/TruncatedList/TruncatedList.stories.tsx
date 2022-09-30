import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TruncatedList } from '@ui/TruncatedList';
import '@stories/Stories.css';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI/TruncatedList',
  component: TruncatedList,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof TruncatedList>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TruncatedList> = (args) => (
  <div className={'w-40'}>
    <TruncatedList {...args} />
  </div>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  truncateAt: 1,
  list: [
    { name: 'first item', id: 1 },
    { name: 'second item', id: 2 },
    { name: 'third item', id: 3 },
  ],
};

export const LongStory = Template.bind({});
LongStory.args = {
  truncateAt: 1,
  list: [
    { name: 'long name is looooooooooooooooong', id: 1 },
    { name: 'second item', id: 2 },
    { name: 'third item', id: 3 },
  ],
};
