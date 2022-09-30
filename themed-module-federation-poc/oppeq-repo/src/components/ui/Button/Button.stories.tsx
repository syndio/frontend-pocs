import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Intent, Direction } from '@ui/config';
import { Button } from '@ui/Button';
import { Icons } from '@ui/Icon';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>Click me!</Button>;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  intent: Intent.Primary,
  onClick: () => {
    alert('Button clicked!');
  },
};

export const Secondary = Template.bind({});
Secondary.args = {
  intent: Intent.Secondary,
};

export const Icon = Template.bind({});
Icon.args = {
  icon: Icons.Syndio,
  iconDirection: Direction.Left,
};
