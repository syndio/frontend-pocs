import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Sizes, Direction } from '@ui/config';
import { Tooltip } from '@ui/Tooltip';
import { Icon, Icons } from '@ui/Icon';

export default {
  title: 'UI/Tooltip',
  component: Tooltip,
  argTypes: {},
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => {
  const buttonRef = React.useRef(null);
  const [isVisible, setVisibility] = React.useState(false);
  const options = {
    ...args,
    isVisible,
    targetRef: buttonRef,
  };

  return (
    <>
      <a
        ref={buttonRef}
        onMouseEnter={() => setVisibility(true)}
        onMouseLeave={() => setVisibility(false)}
      >
        hover me
      </a>
      <Tooltip {...options}>Tada!</Tooltip>
    </>
  );
};

const IconTemplate: ComponentStory<typeof Tooltip> = (args) => {
  const buttonRef = React.useRef(null);
  const [isVisible, setVisibility] = React.useState(false);
  const options = {
    ...args,
    isVisible,
    targetRef: buttonRef,
  };

  return (
    <>
      <a
        ref={buttonRef}
        onMouseEnter={() => setVisibility(true)}
        onMouseLeave={() => setVisibility(false)}
      >
        <Icon name={Icons.QuestionCircle} size={Sizes.md} className="text-gray-400" />
      </a>

      <Tooltip {...options}>Tada!</Tooltip>
    </>
  );
};

const PlacementTemplate: ComponentStory<typeof Tooltip> = () => {
  const buttonRefTop = React.useRef(null);
  const buttonRefBottom = React.useRef(null);
  const buttonRefRight = React.useRef(null);
  const buttonRefLeft = React.useRef(null);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex">
        <div className="flex-inline px-8">
          <span ref={buttonRefTop}>Top</span>
          <Tooltip isVisible={true} targetRef={buttonRefTop} placement={Direction.Top}>
            Tooltip Top
          </Tooltip>
        </div>
        <div className="flex-inline px-8">
          <span ref={buttonRefRight}>Right</span>
          <Tooltip isVisible={true} targetRef={buttonRefRight} placement={Direction.Right}>
            Tooltip right
          </Tooltip>
        </div>
      </div>
      <div className="flex">
        <div className="flex-inline px-8">
          <span ref={buttonRefLeft}>Left</span>
          <Tooltip isVisible={true} targetRef={buttonRefLeft} placement={Direction.Left}>
            Tooltip left
          </Tooltip>
        </div>
        <div className="flex-inline px-8">
          <span ref={buttonRefBottom}>Bottom</span>
          <Tooltip isVisible={true} targetRef={buttonRefBottom} placement={Direction.Bottom}>
            Tooltip bottom
          </Tooltip>
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
InfoIcon.args = {};
