import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Sizes } from '@ui/config';
import { Checkbox, defaultCheckboxOnChange, CheckboxState } from '@ui/Checkbox';
import '@stories/Stories.css';

export default {
  title: 'Forms/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => {
  const [checked, setChecked] = useState(CheckboxState.True);
  return (
    <Checkbox
      id={args.id}
      disabled={args.disabled}
      size={args.size}
      value={checked}
      onChange={() => {
        setChecked(defaultCheckboxOnChange(checked));
      }}
    >
      A checkbox test!
    </Checkbox>
  );
};

const AllTypesTemplate: ComponentStory<typeof Checkbox> = () => {
  return (
    <div>
      <div>
        <Checkbox value={CheckboxState.True} onChange={() => {}}>
          True
        </Checkbox>
      </div>
      <div>
        <Checkbox value={CheckboxState.False} onChange={() => {}}>
          False
        </Checkbox>
      </div>
      <div>
        <Checkbox value={CheckboxState.Indeterminate} onChange={() => {}}>
          Indeterminate
        </Checkbox>
      </div>
      <div>
        <Checkbox value={CheckboxState.True} disabled={true} onChange={() => {}}>
          True
        </Checkbox>
      </div>
      <div>
        <Checkbox value={CheckboxState.False} disabled={true} onChange={() => {}}>
          False
        </Checkbox>
      </div>
      <div>
        <Checkbox value={CheckboxState.Indeterminate} disabled={true} onChange={() => {}}>
          Indeterminate
        </Checkbox>
      </div>
    </div>
  );
};

const AllSizesTemplate: ComponentStory<typeof Checkbox> = () => {
  return (
    <div>
      <div>
        <Checkbox value={CheckboxState.True} size={Sizes.xs} onChange={() => {}}>
          xs
        </Checkbox>
      </div>
      <div>
        <Checkbox value={CheckboxState.True} size={Sizes.sm} onChange={() => {}}>
          sm
        </Checkbox>
      </div>
      <div>
        <Checkbox value={CheckboxState.True} size={Sizes.md} onChange={() => {}}>
          md
        </Checkbox>
      </div>
      <div>
        <Checkbox value={CheckboxState.True} size={Sizes.lg} onChange={() => {}}>
          lg
        </Checkbox>
      </div>
      <div>
        <Checkbox value={CheckboxState.True} size={Sizes.xl} onChange={() => {}}>
          xl
        </Checkbox>
      </div>
      <div>
        <Checkbox value={CheckboxState.True} size={Sizes.xxl} onChange={() => {}}>
          xxl
        </Checkbox>
      </div>
      <div>
        <Checkbox value={CheckboxState.True} size={Sizes.xxxl} onChange={() => {}}>
          xxxl
        </Checkbox>
      </div>
      <div>
        <Checkbox value={CheckboxState.Indeterminate} size={Sizes.xs} onChange={() => {}}>
          xs
        </Checkbox>
      </div>
      <div>
        <Checkbox value={CheckboxState.Indeterminate} size={Sizes.sm} onChange={() => {}}>
          sm
        </Checkbox>
      </div>
      <div>
        <Checkbox value={CheckboxState.Indeterminate} size={Sizes.md} onChange={() => {}}>
          md
        </Checkbox>
      </div>
      <div>
        <Checkbox value={CheckboxState.Indeterminate} size={Sizes.lg} onChange={() => {}}>
          lg
        </Checkbox>
      </div>
      <div>
        <Checkbox value={CheckboxState.Indeterminate} size={Sizes.xl} onChange={() => {}}>
          xl
        </Checkbox>
      </div>
      <div>
        <Checkbox value={CheckboxState.Indeterminate} size={Sizes.xxl} onChange={() => {}}>
          xxl
        </Checkbox>
      </div>
      <div>
        <Checkbox value={CheckboxState.Indeterminate} size={Sizes.xxxl} onChange={() => {}}>
          xxxl
        </Checkbox>
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  size: Sizes.md,
  disabled: false,
  id: 'test',
};

export const AllTypes = AllTypesTemplate.bind({});
AllTypes.args = {};

export const AllSizes = AllSizesTemplate.bind({});
AllSizes.args = {};
