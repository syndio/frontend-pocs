import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import type { IOption } from '@ui/Select';
import { Message } from '@ui/config';
import { MultiSelect } from '@ui/MultiSelect';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Forms/MultiSelect',
  component: MultiSelect,
} as ComponentMeta<typeof MultiSelect>;

const simpleOptions: IOption[] = [
  { value: 'chocolate', label: 'Bugs Bunny Workspace' },
  { value: 'strawberry', label: 'Hulk Workspace' },
  { value: 'vanilla', label: 'Elon Musk Workspace' },
];

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MultiSelect> = (args) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  return (
    <div className="max-w-xs w-60">
      <MultiSelect
        {...args}
        onChange={(e: any) => setSelectedOptions(e)}
        selectedOptions={selectedOptions}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'my test label',
  message: { label: 'a hint', type: Message.Hint },
  options: simpleOptions,
  searchPlaceholder: 'Search by name',
  required: true,
};

export const Error = Template.bind({});
Error.args = {
  label: 'my test label',
  message: { label: 'whoops', type: Message.Error },
  options: simpleOptions,
  searchPlaceholder: 'Search by name',
  required: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'my test label',
  message: { label: 'a hint', type: Message.Hint },
  options: simpleOptions,
  searchPlaceholder: 'Search by name',
  required: true,
  disabled: true,
};
