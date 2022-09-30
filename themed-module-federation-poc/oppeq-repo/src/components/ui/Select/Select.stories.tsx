import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Direction } from '@ui/config';
import { Select, IOption } from '@ui/Select';
import { Icons } from '@ui/Icon';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Forms/Select',
  component: Select,
  argTypes: {
    defaultValue: {
      description: 'Sets the initial value of the Select component',
    },
    value: {
      description:
        'By default, the Select component is uncontrolled. Provide this prop when you want to control the state of the Select component. See "Controlled" example.',
    },
    id: {
      description:
        'Provides an ID to the top DIV of the Select component which is just a wrapper to the underlying React-Select component',
    },
    inputId: {
      description:
        'Provides an ID to the hidden INPUT which holds the actual currently selected value',
    },
    name: {
      description:
        "Name of the hidden input field in the Select component. This prop is required when using Jest's `.toHaveFormValues()`",
    },
  },
} as ComponentMeta<typeof Select>;

const simpleOptions: IOption[] = [
  { value: 'chocolate', label: 'Bugs Bunny Workspace' },
  { value: 'strawberry', label: 'Hulk Workspace' },
  { value: 'vanilla', label: 'Elon Musk Workspace' },
];

const sublabelOptions = [
  { value: 'chocolate', sublabel: 'Acme Corp', label: 'Bugs Bunny Workspace' },
  { value: 'strawberry', sublabel: 'Ben & Jerrys', label: 'Hulk Workspace' },
  { value: 'vanilla', sublabel: 'Tesla', label: 'Elon Musk Workspace' },
];

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Select> = (args) => <Select {...args}>Click me!</Select>;

export const Default = Template.bind({});
Default.args = {
  options: simpleOptions,
  iconPosition: Direction.Left,
};

export const Label = Template.bind({});
Label.args = {
  options: simpleOptions,
  iconPosition: Direction.Left,
  label: <div className="prose prose-body-heavy">I am a label</div>,
  inputId: 'my-select-1',
};

export const RequiredLabel = Template.bind({});
RequiredLabel.args = {
  options: simpleOptions,
  iconPosition: Direction.Left,
  label: <div className="prose prose-body-heavy">I am a required label</div>,
  inputId: 'my-select-2',
  required: true,
};

export const InnerLabel = Template.bind({});
InnerLabel.args = {
  options: simpleOptions,
  innerLabel: 'Inner Label:',
  inputId: 'my-select-3',
};

export const RequiredInnerLabel = Template.bind({});
RequiredInnerLabel.args = {
  options: simpleOptions,
  innerLabel: 'Inner Label:',
  inputId: 'my-select-4',
  required: true,
};

export const Sublabel = Template.bind({});
Sublabel.args = {
  options: sublabelOptions,
};

export const Icon = Template.bind({});
Icon.args = {
  options: simpleOptions,
  defaultValue: simpleOptions[0],
  icon: Icons.Switcher,
  iconOnly: false,
  borderless: false,
};

export const Avatar = Template.bind({});
Avatar.args = {
  avatar: 'S',
  avatarClassName: 'bg-actionPrimary',
  options: simpleOptions,
  iconOnly: false,
  borderless: false,
};

export const OptionIcon = Template.bind({});
OptionIcon.args = {
  options: [
    {
      value: 'chocolate',
      icon: Icons.Syndio,
      iconDirection: Direction.Left,
      iconClassName: 'bg-actionPrimary p-2 text-white rounded-md leading-none',
      label: 'Bugs Bunny Workspace',
    },
    {
      value: 'strawberry',
      icon: Icons.Syndio,
      iconDirection: Direction.Left,
      iconClassName: 'bg-purple p-2 text-white rounded-md leading-none',
      label: 'Hulk Workspace',
    },
    {
      value: 'vanilla',
      icon: Icons.Syndio,
      iconDirection: Direction.Left,
      iconClassName:
        'bg-gradient-to-r from-purple-500 to-teal-600 p-2 text-white rounded-md leading-none',
      label: 'Elon Musk Workspace',
      isDisabled: true,
    },
  ],
  defaultMenuIsOpen: true,
};

export const Grouping = Template.bind({});
Grouping.args = {
  options: [
    {
      label: 'Syndio (Product & Engineering)',
      options: [
        { value: 'chocolate', sublabel: 'Acme Corp', label: "Jenny's Workspace" },
        { value: 'strawberry', sublabel: 'Ben & Jerrys', label: "Sam's Workspace" },
        { value: 'vanilla', sublabel: 'Tesla', label: "Jessica's Workspace" },
      ],
    },
    {
      label: 'ACME Corporation',
      options: [
        { value: 'chocolate2', sublabel: 'Acme Corp 2', label: "Lena's Workspace" },
        { value: 'strawberry2', sublabel: 'Ben & Jerrys 2', label: "Josh's Workspace" },
        { value: 'vanilla2', sublabel: 'Tesla 2', label: "David's Workspace" },
      ],
    },
  ],
  defaultMenuIsOpen: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  options: simpleOptions,
  disabled: true,
};

const StatefulTemplate: ComponentStory<typeof Select> = (args) => {
  const [selected, setSelected] = useState<IOption>(args.options[0] as IOption);

  return (
    <Select
      {...args}
      value={selected}
      onChange={(e) => {
        const options = args.options as IOption[]; // ¯\_(ツ )_/¯
        const newSelected = options.find((o) => o.value === e.value) as IOption;

        setSelected(newSelected);
      }}
    />
  );
};

export const DisabledOption = Template.bind({});
DisabledOption.args = {
  options: [
    {
      value: 'chocolate',
      label: 'Bugs Bunny Workspace',
      isDisabled: true,
    },
    {
      value: 'strawberry',
      label: 'Hulk Workspace',
    },
    {
      value: 'vanilla',
      label: 'Elon Musk Workspace',
      isDisabled: true,
    },
  ],
  defaultMenuIsOpen: true,
};

export const Controlled = StatefulTemplate.bind({});
Controlled.args = {
  options: simpleOptions,
  defaultValue: simpleOptions[0],
};
