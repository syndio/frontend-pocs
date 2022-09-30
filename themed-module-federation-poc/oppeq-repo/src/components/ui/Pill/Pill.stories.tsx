import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Sizes } from '@ui/config';
import { Pill } from '@ui/Pill';
import '@stories/Stories.css';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI/Pill',
  component: Pill,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Pill>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Pill> = (args) => <Pill {...args}>Pill me!</Pill>;

const SizesTemplate: ComponentStory<typeof Pill> = (args) => (
  <div className="storybook__pills">
    <Pill {...args} size={Sizes.xs}>
      Pill me!
    </Pill>
    <br />
    <Pill {...args} size={Sizes.sm}>
      Pill me!
    </Pill>
    <br />
    <Pill {...args} size={Sizes.md}>
      Pill me!
    </Pill>
    <br />
    <Pill {...args} size={Sizes.lg}>
      Pill me!
    </Pill>
    <br />
    <Pill {...args} size={Sizes.xl}>
      Pill me!
    </Pill>
    <br />
    <Pill {...args} size={Sizes.xxl}>
      Pill me!
    </Pill>
    <br />
    <Pill {...args} size={Sizes.xxxl}>
      Pill me!
    </Pill>
  </div>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  size: Sizes.md,
  transparent: false,
};

export const AllSizes = SizesTemplate.bind({});
AllSizes.args = {
  transparent: false,
};

/*
export const Icon = Template.bind({});
Icon.args = {
  icon: Icons.Syndio,
  iconDirection: Direction.Left,
};
*/
