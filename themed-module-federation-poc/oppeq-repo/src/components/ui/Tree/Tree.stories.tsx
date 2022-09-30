import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Tree } from '@ui/Tree';
import { TreePartials } from '@ui/Tree/partials';
import type { ITreeNodeIcon } from '@ui/Tree/types';

const dummyData = [
  {
    label: 'Engineering',
    id: 1,
    selected: false,
    items: [
      {
        label: 'Frontend Engineers',
        id: 11,
        selected: false,
        items: [
          {
            label: 'CSS Expert',
            id: 111,
            selected: false,
          },
        ],
      },
    ],
  },
  {
    label: 'Design',
    id: 2,
    selected: false,
    items: [
      {
        label: 'UX Designer',
        id: 21,
        selected: false,
      },
    ],
  },
  {
    label: 'CEO',
    id: 3,
    selected: false,
  },
];

export default {
  title: 'Navigation/Tree',
  component: Tree,
} as ComponentMeta<typeof Tree>;

const Template: ComponentStory<typeof Tree> = (args) => <Tree {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  data: dummyData,
};

function CustomTreeNodeIcon(props: ITreeNodeIcon) {
  const folderIcon = props.expanded ? <>📂</> : <>📁</>;
  const icon = props.item.items ? folderIcon : <>📄</>;

  return (
    <TreePartials.TreeNodeIcon {...props} className="mr-1 mt-1">
      {icon}
      <span className="mr-2" />
    </TreePartials.TreeNodeIcon>
  );
}

export const CustomIcon = Template.bind({});

CustomIcon.args = {
  data: dummyData,
  partials: {
    ...TreePartials,
    TreeNodeIcon: CustomTreeNodeIcon,
  },
};
