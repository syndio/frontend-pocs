import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Sizes } from '@ui/config';
import { Icons, Icon } from '@ui/Icon';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI/Icon',
  component: Icon,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Icon>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Icon> = (args) => (
  <div className="rounded inline-block p-2 shadow-md">
    <Icon {...args} />
  </div>
);

const BgTemplate: ComponentStory<typeof Icon> = (args) => (
  <div className="rounded bg-actionPrimary inline-block p-2 shadow-md">
    <Icon {...args} />
  </div>
);

const IconListTemplate: ComponentStory<typeof Icon> = (args) => (
  <>
    {Object.keys(Icons)
      .filter((v) => isNaN(Number(v)))
      .map((key: string) => {
        return (
          <div
            key={key}
            className="rounded bg-white text-actionAccent inline-block p-4 m-2 shadow-md leading-none"
          >
            <Icon size={Sizes.md} {...args} name={Icons[key as keyof typeof Icons]} />
          </div>
        );
      })}
  </>
);

export const All = IconListTemplate.bind({});

All.args = {
  className: 'text-actionPrimary',
  size: Sizes.md,
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  name: Icons.Syndio,
  size: Sizes.xxl,
};

export const Color = Template.bind({});
Color.args = {
  name: Icons.Syndio,
  size: Sizes.xxl,
  className: 'text-actionPrimary',
};

export const Background = BgTemplate.bind({});
Background.args = {
  name: Icons.Syndio,
  size: Sizes.xxl,
  className: 'bg-actionPrimary text-white',
};
