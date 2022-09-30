import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Sizes } from '@ui/config';
import { Toggle } from '@ui/Toggle';
import '@stories/Stories.css';

export default {
  title: 'Forms/Toggle',
  component: Toggle,
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = (args) => {
  const [defaultIsChecked, setDefaultIsChecked] = useState(false);
  const [withLabelChecked, setWithLabelChecked] = useState(false);
  const [defaultChecked, setDefaultChecked] = useState(true);
  const [withHandlerChecked, setWithHandlerChecked] = useState(false);
  return (
    <>
      <Toggle
        {...args}
        id={'toggle-default'}
        value={'default'}
        checked={defaultIsChecked}
        onChange={() => setDefaultIsChecked(!defaultIsChecked)}
      />
      <Toggle
        {...args}
        id={'toggle-labelled'}
        value={'labelled'}
        label={'With Label'}
        checked={withLabelChecked}
        onChange={() => setWithLabelChecked(!withLabelChecked)}
      />
      <Toggle
        {...args}
        id={'toggle-disabled'}
        value={'disabled'}
        label={'Disabled'}
        disabled={true}
      />
      <Toggle
        {...args}
        id={'toggle-checked'}
        value={'checked'}
        label={'Default Checked'}
        checked={defaultChecked}
        onChange={() => setDefaultChecked(!defaultChecked)}
      />

      <Toggle
        {...args}
        id={'toggle-with-handler'}
        value={'handler'}
        label={`with onChange handler: Toggle is ${
          withHandlerChecked ? 'checked' : 'not checked'
        }`}
        checked={withHandlerChecked}
        onChange={() => setWithHandlerChecked(!withHandlerChecked)}
      />
    </>
  );
};

const SizesTemplate: ComponentStory<typeof Toggle> = (args) => {
  return (
    <div className="storybook_toggles">
      <Toggle {...args} label={'xs'} id={'xs-toggle'} value={'xs'} size={Sizes.xs} />
      <Toggle {...args} label={'sm'} id={'sm-toggle'} value={'sm'} size={Sizes.sm} />
      <Toggle {...args} label={'md (default)'} id={'md-toggle'} value={'md'} size={Sizes.md} />
      <Toggle {...args} label={'lg'} id={'lg-toggle'} value={'lg'} size={Sizes.lg} />
      <Toggle {...args} label={'xl'} id={'xl-toggle'} value={'xl'} size={Sizes.xl} />
      <Toggle {...args} label={'xxl'} id={'xxl-toggle'} value={'xxl'} size={Sizes.xxl} />
      <Toggle {...args} label={'xxxl'} id={'xxxl-toggle'} value={'xxxl'} size={Sizes.xxxl} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  size: Sizes.md,
};

export const AllSizes = SizesTemplate.bind({});
AllSizes.args = {
  label: 'Toggle me',
};
