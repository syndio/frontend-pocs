import React, { ReactElement } from 'react';
import { Column } from 'react-table';

interface IFiltersAndActionsProps<T extends Record<number, unknown>> {
  columns: Column<T>[];
  disabled?: boolean;
  actions?: ReactElement[];
  className?: string;
}

export const FiltersAndActions = <T extends Record<number, unknown>>({
  columns = [],
  disabled = false,
  actions = [],
  className = '',
}: IFiltersAndActionsProps<T>): ReactElement => {
  return (
    <div className={`flex flex-col-reverse justify-between gap-4 md:flex-row ${className}`}>
      <div className="syo-filters">
        {columns.map((col: Column<T>) => {
          // @ts-ignore
          return col.canFilter ? (
            <span className={`syo-filter--${col.id}`} key={`filter-${col.id}`}>
              {/* @ts-ignore */}
              {col.render('Filter', { disabled })}
            </span>
          ) : null;
        })}
      </div>
      {!!actions.length && (
        <div className="syo-actions">{actions.map((actionBtn) => actionBtn)}</div>
      )}
    </div>
  );
};
