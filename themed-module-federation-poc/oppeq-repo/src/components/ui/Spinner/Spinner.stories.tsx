import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Spinner } from '@ui/Spinner';

export default {
  title: 'UI/Spinner',
  component: Spinner,
  argTypes: {},
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args) => (
  <Spinner {...args}>Click me!</Spinner>
);

export const Default = Template.bind({});
Default.args = {};

export const Wrapper = Template.bind({});
Wrapper.args = {
  wrapperClassName: 'bg-teal-200 p-4 rounded',
};
