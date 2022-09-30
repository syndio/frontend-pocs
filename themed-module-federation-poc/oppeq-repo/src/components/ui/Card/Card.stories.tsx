import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Card } from '@ui/Card';
import { Button } from '@ui/Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI/Card',
  component: Card,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Card>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Card> = (args) => (
  <Card {...args}>
    <div>
      <h2>This is a card</h2>
      <p>A full analysis of how women are represented at different levels.</p>
    </div>
    <div>
      <Button className="whitespace-nowrap">Card CTA</Button>
    </div>
  </Card>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};
