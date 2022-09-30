import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TextInput } from '@ui/TextInput';
import { Icons } from '@ui/Icon';
import { Message } from '@ui/config';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Forms/TextInput',
  component: TextInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    value: { description: 'Input value' },
    className: {
      description: 'Class(es) that will be added to the input wrapper',
      control: 'text',
    },
    label: { description: 'The label that appears above the input box', control: 'text' },
    message: { description: 'The label that appears below the input box' },
    type: {
      description: 'Input type allowed by input box',
      defaultValue: 'string',
      control: { type: 'select', options: ['string', 'number'] },
    },
    placeholder: { description: 'Placeholder text within input box' },
    icon: { description: 'Shown icon in input box' },
    id: { description: 'ID used for input box', control: 'text' },
    onChange: { description: 'Function called on user input' },
    required: {
      description: 'Determines if an asterisk will be displayed next to label or not',
      control: 'boolean',
    },
    maxLength: { description: 'If string type, max length of string', control: 'number' },
    min: { description: 'If number type, minimum value', control: 'number' },
    max: { description: 'If number type, maximum value', control: 'number' },
    step: { description: 'If number type, the value it will go up/down', control: 'number' },
    suffix: {
      description: 'additional text or components to display within the input',
      control: 'text',
    },
  },
} as ComponentMeta<typeof TextInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextInput> = (args) => {
  const [myValue, setMyValue] = useState(args.value);
  return (
    <TextInput
      {...args}
      value={myValue}
      onChange={(e) => setMyValue(e.target.value)}
    ></TextInput>
  );
};

const defaultArgs = {
  label: 'My Label',
  maxLength: 50,
  placeholder: 'My Placeholder',
  className: 'w-48',
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  message: { type: Message.Hint, label: 'I have helper text' },
  ...defaultArgs,
};

export const Suffix = Template.bind({});
Suffix.args = {
  suffix: <div className="pr-2">@</div>,
  ...defaultArgs,
};

export const Error = Template.bind({});
Error.args = {
  required: true,
  message: { type: Message.Error, label: 'I have an error!' },
  ...defaultArgs,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  value: 'Another test value',
  ...defaultArgs,
};

export const Search = Template.bind({});
Search.args = {
  icon: Icons.MagnifyingGlass,
  ...defaultArgs,
};

export const Numbers = Template.bind({});
Numbers.args = {
  label: 'Number Input',
  type: 'number',
  step: 5,
  min: 0,
  max: 99,
  className: 'w-16',
};
