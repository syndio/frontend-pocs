import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TooltipIcon } from '@ui/TooltipIcon';
import { Icons } from '@ui/Icon';
import { Sizes, Direction } from '@ui/config';

export default {
  title: 'UI/TooltipIcon',
  component: TooltipIcon,
  argTypes: {
    icon: {
      description: 'Icon displayed.  Defaults to the circle with question mark in it',
      defaultValue: Icons.QuestionCircleOutline,
      control: { type: 'select', options: Icons },
    },
    iconClassname: {
      description:
        'Classnames specifically for the displayed icon.  If you wish to change the color, you would do it here',
      control: 'text',
    },
    placement: {
      description:
        'Tooltip default placement.  Generally if the browser has space for it it will display the tooltip in selected placement',
      control: { type: 'select', options: Direction },
    },
    size: {
      description: 'size of the icon',
      control: { type: 'select', options: Sizes },
    },
  },
} as ComponentMeta<typeof TooltipIcon>;

const Template: ComponentStory<typeof TooltipIcon> = (args) => {
  const options = {
    ...args,
  };

  return <TooltipIcon {...options}>Tada!</TooltipIcon>;
};

const IconTemplate: ComponentStory<typeof TooltipIcon> = (args) => {
  const options = {
    ...args,
  };

  return <TooltipIcon {...options}>Tada!</TooltipIcon>;
};

const PlacementTemplate: ComponentStory<typeof TooltipIcon> = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex">
        <div className="flex-inline px-8">
          <span>Top</span>
          <TooltipIcon iconClassname="text-gray-400" placement={Direction.Top}>
            Tooltip Top
          </TooltipIcon>
        </div>
        <div className="flex-inline px-8">
          <span>Right</span>
          <TooltipIcon iconClassname="text-gray-400" placement={Direction.Right}>
            Tooltip right
          </TooltipIcon>
        </div>
      </div>
      <div className="flex">
        <div className="flex-inline px-8">
          <span>Left</span>
          <TooltipIcon iconClassname="text-gray-400" placement={Direction.Left}>
            Tooltip left
          </TooltipIcon>
        </div>
        <div className="flex-inline px-8">
          <span>Bottom</span>
          <TooltipIcon iconClassname="text-gray-400" placement={Direction.Bottom}>
            Tooltip bottom
          </TooltipIcon>
        </div>
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Placement = PlacementTemplate.bind({});
Placement.args = {};

export const InfoIcon = IconTemplate.bind({});
InfoIcon.args = {
  icon: Icons.InfoCircle,
  iconClassname: 'text-blue',
};
