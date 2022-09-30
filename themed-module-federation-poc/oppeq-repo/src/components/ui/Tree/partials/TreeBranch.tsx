import React, { useEffect, useState } from 'react';
import type { ITreeItem, ITreeBranch } from '@ui/Tree/types';
import { TreePartials } from '@ui/Tree/partials';
import { dfs } from '@utils/object';

export const TreeBranch = ({
  item,
  parent = false,
  level,
  onToggle,
  partials = TreePartials,
  expandedIds = undefined,
}: ITreeBranch): JSX.Element => {
  // If one of the descendant children is selected on page load expand the branch
  const dfsr = dfs(item, {
    targetKey: 'selected',
    targetValue: true,
  });

  const defaultIsExpand =
    item?.expanded || item.selected || (typeof dfsr === 'object' && dfsr !== null);
  const [isExpanded, setIsExpanded] = useState(defaultIsExpand ?? false);

  // The whole purpose of this useEffect is to expand the tree when a user
  // clicks on a different component (Not a Tree) and we want to expand a
  // branch in the Tree as an effect of this action. The problem is that
  // the Tree is a "controlled" component and turning it into an "uncontrolled"
  // component would be a big overkill refactor. Maybe in the future we can
  // do so; but we would have to make sure to expose the expand/collapse utils
  // to the outside so the dev does not have to think about this stuff
  useEffect(() => {
    if (expandedIds && expandedIds.indexOf(item.id as never) > -1) {
      setIsExpanded(true);
    }
  }, [expandedIds, item.id]);

  const spaceValues = [0, 5, 10, 14, 20];
  const spacing = spaceValues[level];
  const paddingLeft = level > 0 ? `pl-${spacing}` : '';

  const onToggleNode = (
    e: React.KeyboardEvent | (React.MouseEvent & { target: any; key?: any }),
    selected: ITreeItem
  ) => {
    // clicking the icon simply toggles expand/collapse
    if (e.target.nodeName === 'SPAN' || e.key === ' ') {
      setIsExpanded((exp) => !exp);
    }

    // clicking text select/deselects the node
    if (e.target.nodeName === 'DIV' || e.key === 'Enter') {
      if (onToggle) {
        onToggle(e, {
          ...item,
          selected: !selected.selected,
        });
      }
    }
  };

  return (
    <>
      <partials.TreeNode
        item={item}
        parent={parent}
        className={paddingLeft}
        onToggle={onToggleNode}
        expanded={isExpanded}
        partials={partials}
      />
      {isExpanded &&
        item?.items?.map((itm: ITreeItem): JSX.Element => {
          const parent = itm.items ? true : false;

          return (
            <partials.TreeBranch
              key={itm.id}
              item={itm}
              parent={parent}
              level={level + 1}
              onToggle={onToggle}
              partials={partials}
              expandedIds={expandedIds}
            />
          );
        })}
    </>
  );
};
