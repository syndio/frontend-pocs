import React, { useRef } from 'react';
import { Icon, Icons } from '@ui/Icon';
import type { ITreeNode } from '@ui/Tree/types';
import { TreePartials } from '@ui/Tree/partials';
import '@ui/Tree/Tree.css';

export const TreeNode = ({
  item,
  parent = false,
  className = '',
  onToggle,
  expanded = false,
  partials = TreePartials,
}: ITreeNode): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);

  const onKeyDown = (e: React.KeyboardEvent<Element>) => {
    const itemEl = ref.current;

    if (e.key === 'ArrowUp' && itemEl?.previousElementSibling) {
      e.preventDefault(); // prevent key presses from scrolling <main /> region
      (itemEl?.previousElementSibling as HTMLLIElement).focus();
    }

    if (e.key === 'ArrowDown' && itemEl?.nextElementSibling) {
      e.preventDefault(); // prevent key presses from scrolling <main /> region
      (itemEl?.nextElementSibling as HTMLLIElement).focus();
    }

    // Enter for triggering click selection and spacebar for triggering collapse/expand
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); // prevent key presses from scrolling <main /> region

      onToggle(e, item);
    }
  };

  const ico = parent ? Icons.ChevronRight : Icons.CheckBoxBG;
  const rotate = expanded ? 'rotate-90' : 'rotate-0';
  // remove pointer events so span onClick yields e.target.nodeName SPAN reliably
  const icoCss = parent ? `mr-1.5 ${rotate} pointer-events-none` : 'mr-1.5 text-transparent';
  const tabIndex = parent ? 0 : -1;
  const selectedCss = item.selected ? 'tree__node--selected' : '';
  const ariaHidden = !parent;

  const onClick = (e: any) => {
    onToggle(e, item);
  };

  return (
    <div
      ref={ref}
      role="treeitem"
      aria-expanded={expanded}
      aria-selected={item.selected || false}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onClick={onClick}
      className={`syo-tree__node ${selectedCss} ${className}`}
    >
      <partials.TreeNodeIcon
        item={item}
        parent={parent}
        expanded={expanded}
        aria-hidden={ariaHidden}
        tabIndex={tabIndex}
      >
        <Icon name={ico} className={icoCss} aria-hidden={ariaHidden} />
      </partials.TreeNodeIcon>

      <partials.TreeNodeText item={item} expanded={expanded}>
        {item.label}
      </partials.TreeNodeText>
    </div>
  );
};
