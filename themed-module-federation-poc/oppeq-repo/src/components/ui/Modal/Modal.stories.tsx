import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Sizes } from '@ui/config';
import { Button } from '@ui/Button';
import { Icon, Icons } from '@ui/Icon';
import { Modal, ModalConfirmButton, ModalCancelButton } from '@ui/Modal';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI/Modal',
  component: Modal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Modal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Modal> = (args) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const actions = [
    <ModalCancelButton key="test1" onClick={() => setIsModalVisible(false)} />,
    <ModalConfirmButton key="test2" onClick={() => setIsModalVisible(false)} />,
  ];
  return (
    <div className="h-screen w-screen">
      <Button onClick={() => setIsModalVisible(!isModalVisible)}>Click me!</Button>
      {isModalVisible && (
        <Modal {...args} actions={actions} onCancel={() => setIsModalVisible(false)} />
      )}
    </div>
  );
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  header: 'My header',
  subHeader: 'My SubHeader',
  children: (
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut etiam sit amet nisl purus. Nec
        ullamcorper sit amet risus. A pellentesque sit amet porttitor eget. Faucibus vitae
        aliquet nec ullamcorper sit amet risus. Nulla facilisi etiam dignissim diam. Neque
        aliquam vestibulum morbi blandit cursus risus at ultrices mi. Condimentum vitae sapien
        pellentesque habitant morbi. Pharetra sit amet aliquam id diam maecenas ultricies. Eu
        tincidunt tortor aliquam nulla facilisi cras. Viverra aliquet eget sit amet tellus cras
        adipiscing enim. Placerat duis ultricies lacus sed turpis tincidunt id aliquet risus.
        Volutpat blandit aliquam etiam erat velit. Sed enim ut sem viverra aliquet. Massa eget
        egestas purus viverra accumsan in nisl nisi scelerisque. Ut venenatis tellus in metus
        vulputate eu scelerisque felis. Id faucibus nisl tincidunt eget nullam non nisi.
        Dapibus ultrices in iaculis nunc sed augue lacus viverra. Arcu cursus euismod quis
        viverra nibh.
      </p>

      <p>
        Lectus sit amet est placerat in egestas. Egestas integer eget aliquet nibh praesent
        tristique magna sit. Senectus et netus et malesuada fames ac turpis egestas. Vulputate
        mi sit amet mauris commodo quis. Nisi lacus sed viverra tellus in hac habitasse. Sed
        tempus urna et pharetra. Condimentum id venenatis a condimentum. Neque viverra justo
        nec ultrices dui sapien eget. Morbi enim nunc faucibus a pellentesque sit amet. Urna
        nunc id cursus metus aliquam eleifend mi in nulla. Etiam non quam lacus suspendisse
        faucibus interdum posuere. Risus pretium quam vulputate dignissim suspendisse in est
        ante. Sit amet massa vitae tortor condimentum lacinia quis vel eros.
      </p>
    </div>
  ),
};

export const Alert = Template.bind({});
Alert.args = {
  header: (
    <div>
      <Icon name={Icons.ExclaimCircle} size={Sizes.xxxl} className="text-red w-16" /> Alert!
    </div>
  ),
  hasOverlay: false,
  hasCloseButton: true,
  className: 'min-w-alert',
  children: 'I am an alert!!!',
};

export const Confirm = Template.bind({});
Confirm.args = {
  hasOverlay: false,
  hasCloseButton: false,
  className: 'min-w-alert',
  children: 'Please Confirm',
};
