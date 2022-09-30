import React from 'react';
import './TruncatedList.css';

export interface ITruncatedListProps {
  id: string;
  className?: string;
  list: {
    name: string;
    id: string | number;
  }[];
  truncateAt?: number;
}

export const TruncatedList = ({
  className,
  list,
  id,
  truncateAt = 1,
}: ITruncatedListProps): JSX.Element => {
  const listItems =
    list.length >= 1
      ? list.slice(0, truncateAt).map((item) => (
          <div className={`syo-truncated-list-item`} key={item.id}>
            {item.name}
          </div>
        ))
      : null;
  const moreListItems =
    list.length > truncateAt ? (
      <div className="syo-truncated-list-item_truncated-text">{`+${
        list.length - truncateAt
      } more`}</div>
    ) : null;
  return (
    <div id={id} className={`syo-truncated-list ${className}`}>
      {listItems}
      {moreListItems}
    </div>
  );
};
