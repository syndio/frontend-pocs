import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Callout } from '@ui/Callout';
import { Button } from '@ui/Button';
import { Icons } from '@ui/Icon';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI/Callout',
  component: Callout,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Callout>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Callout> = (args) => (
  <Callout {...args}>
    <div>
      <h4>This is a callout</h4>
      <p>A full analysis of how women are represented at different levels.</p>
    </div>
    <div>
      <Button className="whitespace-nowrap">Register</Button>
    </div>
  </Callout>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};

export const Icon = Template.bind({});
Icon.args = {
  icon: Icons.Syndio,
};
