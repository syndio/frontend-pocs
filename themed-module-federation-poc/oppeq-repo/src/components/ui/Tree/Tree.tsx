import React from 'react';
import { TreePartials } from '@ui/Tree/partials';
import type { ITree } from '@ui/Tree/types';

export const Tree = React.memo(
  ({
    data,
    className = '',
    onToggle,
    partials = TreePartials,
    expandedIds,
  }: ITree): JSX.Element => {
    return (
      <div className={`syo-tree ${className}`} role="tree">
        {data?.map((item) => {
          return (
            <partials.TreeBranch
              key={item.id}
              item={item}
              parent={Array.isArray(item.items)}
              level={0}
              onToggle={onToggle}
              partials={partials}
              expandedIds={expandedIds}
            />
          );
        })}
      </div>
    );
  }
);
