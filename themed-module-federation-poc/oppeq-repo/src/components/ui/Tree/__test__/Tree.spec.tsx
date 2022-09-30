import React, { useCallback, useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent, { TargetElement } from '@testing-library/user-event';
import { Tree } from '@ui/Tree';
import { TreePartials } from '@ui/Tree/partials';
import type { ITreeItem, ITreeNodeText } from '@ui/Tree/types';
import { deepReplaceObjects, deepCloneArray } from '@utils/array';

const dummyData: ITreeItem[] = [
  {
    label: 'Engineering',
    id: 1,
    selected: false,
    expanded: false,
    items: [
      {
        label: 'Frontend Engineers',
        id: 11,
        selected: false,
        expanded: false,
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
    expanded: false,
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

function CustomTreeNodeText(props: ITreeNodeText): JSX.Element {
  const css = props.item.selected ? 'font-bold' : '';

  return (
    <TreePartials.TreeNodeText {...props} className={css}>
      {props.item.label}
    </TreePartials.TreeNodeText>
  );
}

function TreeWrapperComponent(props: any) {
  const [data, setData] = useState<ITreeItem[]>(props.data);

  const onToggle = useCallback(
    (e: React.KeyboardEvent | React.MouseEvent, selected?: ITreeItem | null) => {
      const newData = deepReplaceObjects(props.data, {
        targetKey: 'selected',
        subarrayKey: 'items',
        replacer: (item) => (item.id === selected?.id ? selected.selected : false),
      }) as ITreeItem[];

      setData(newData);
    },
    [props.data, data, setData]
  );

  const extraProps: any = {};

  if (props.partials) {
    extraProps.partials = props.partials;
  }

  return (
    <div>
      <Tree data={data} onToggle={onToggle} {...extraProps} />
    </div>
  );
}

describe('Tree component', () => {
  test('default renders collapsed', () => {
    const newData = deepCloneArray(dummyData);
    const { container, getAllByRole, getByText, queryByText } = render(
      <Tree data={newData} />
    );

    expect(getAllByRole('tree')).toHaveLength(1);
    expect(getAllByRole('treeitem')).toHaveLength(3);
    expect(getAllByRole('treeitem', { expanded: false }).length).toEqual(3);
    expect(getAllByRole('button')).toHaveLength(6);

    expect(container.getElementsByClassName('syo-tree__node').length).toEqual(3);

    expect(getByText('Engineering')).toBeInTheDocument();
    expect(queryByText('Frontend Engineers')).toBeNull();
    expect(queryByText('CSS Expert')).toBeNull();
    expect(getByText('Design')).toBeInTheDocument();
    expect(queryByText('UX Designer')).toBeNull();
    expect(getByText('CEO')).toBeInTheDocument();
  });

  test('default with "selected" branch renders branch expanded', () => {
    const newData = deepCloneArray(dummyData);

    newData[0].selected = true;

    const { getAllByRole, getByText, queryByText } = render(<Tree data={newData} />);

    expect(getAllByRole('treeitem')).toHaveLength(4);
    expect(getAllByRole('treeitem', { expanded: false }).length).toEqual(3);
    expect(getAllByRole('treeitem', { expanded: true }).length).toEqual(1);

    expect(getByText('Engineering')).toBeInTheDocument();
    expect(getByText('Frontend Engineers')).toBeInTheDocument();
    expect(queryByText('CSS Expert')).toBeNull();
    expect(getByText('Design')).toBeInTheDocument();
    expect(queryByText('UX Designer')).toBeNull();
    expect(getByText('CEO')).toBeInTheDocument();
  });

  test('clicking treeitems "selected" by default unselects them', async () => {
    const newData = deepCloneArray(dummyData);

    newData[0].selected = true;

    const { getAllByRole, getByText } = render(
      <TreeWrapperComponent
        data={newData}
        partials={{
          ...TreePartials,
          TreeNodeText: CustomTreeNodeText,
        }}
      />
    );

    expect(getAllByRole('treeitem', { selected: true }).length).toEqual(1);
    expect(getAllByRole('treeitem', { selected: false }).length).toEqual(3);

    userEvent.click(getByText('Engineering'));

    expect(getAllByRole('treeitem', { selected: false }).length).toEqual(4);
  });

  test('tree expands/collapses in any level', async () => {
    const newData = deepCloneArray(dummyData);

    const { getByText, getAllByRole, queryByText } = render(
      <TreeWrapperComponent data={newData} />
    );

    expect(getAllByRole('treeitem', { expanded: false }).length).toEqual(3);

    // Clicking chevron on level 1 expands/collapse level 2
    const level1 = getByText('Engineering');

    // getByText('Engineering') gets us the text node; but we want the icon sibling
    userEvent.click(level1.previousSibling as TargetElement);

    expect(getAllByRole('treeitem', { expanded: false }).length).toEqual(3);
    expect(getByText('Frontend Engineers')).toBeInTheDocument();
    expect(queryByText('CSS Expert')).toBeNull();

    // Clicking chevron on level 2 expands/collapse level 3
    const level2 = getByText('Frontend Engineers');

    // getByText('Frontend Engineers') gets us the text node; but we want the icon sibling
    userEvent.click(level2.previousSibling as TargetElement);

    expect(getAllByRole('treeitem', { expanded: false }).length).toEqual(3);
    expect(getAllByRole('treeitem', { expanded: true }).length).toEqual(2);
    expect(getByText('Engineering')).toBeInTheDocument();
    expect(getByText('Frontend Engineers')).toBeInTheDocument();
    expect(getByText('CSS Expert')).toBeInTheDocument();

    // getByText('Frontend Engineers') gets us the text node; but we want the icon sibling
    userEvent.click(level2.previousSibling as TargetElement);

    expect(getAllByRole('treeitem', { expanded: false }).length).toEqual(3);
    expect(getAllByRole('treeitem', { expanded: true }).length).toEqual(1);
    expect(getByText('Frontend Engineers')).toBeInTheDocument();
    expect(queryByText('CSS Expert')).toBeNull();

    // getByText('Engineering') gets us the text node; but we want the icon sibling
    userEvent.click(level1.previousSibling as TargetElement);

    expect(getAllByRole('treeitem', { expanded: false }).length).toEqual(3);

    expect(queryByText('Frontend Engineers')).toBeNull();
    expect(queryByText('CSS Expert')).toBeNull();
  });

  test('tree renders with first level expanded', () => {
    const newData = deepCloneArray(dummyData);

    // maybe it's best to have a property "expanded" to differentiate from "selected"
    newData[0].selected = true;
    newData[1].selected = true;

    const { getAllByRole } = render(<TreeWrapperComponent data={newData} />);

    expect(getAllByRole('treeitem', { selected: true }).length).toEqual(2);
    expect(getAllByRole('treeitem', { selected: false }).length).toEqual(3);
  });

  // [OPPEQR-363] - bug
  test('expanded branch collapses on first click', async () => {
    const newData = deepCloneArray(dummyData);

    // expand before running test
    newData[0].selected = true;
    newData[0].expanded = true;
    (newData[0].items as ITreeItem[])[0].selected = true;
    (newData[0].items as ITreeItem[])[0].expanded = true;

    render(<TreeWrapperComponent data={newData} />);

    const frontendNode = screen.getByText('Frontend Engineers');
    const engineeringNode = screen.getByText('Engineering');

    expect(engineeringNode.parentElement?.getAttribute('aria-expanded')).toBe('true');
    expect(frontendNode.parentElement?.getAttribute('aria-expanded')).toBe('true');

    // getByText('Frontend Engineers') gets us the text node; but we want the chevron icon sibling
    userEvent.click(frontendNode.previousSibling as TargetElement);

    // The bug we are trying to check for briefly expands the node and then closes it, which
    // means it never actually opens for the user. For the test, this means, that if we try
    // to assert if false or not true, it will always return true. Afaik, there is no nice way
    // to do an assertion for this flickering so I'm doing a timeout/
    await new Promise((r) => setTimeout(r, 1000));

    expect(frontendNode.parentElement?.getAttribute('aria-expanded')).not.toBe('true');
  });
});
