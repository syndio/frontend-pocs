/* eslint-disable react/jsx-key */
// Above rule is disabled for file because react keys are implicitly added where hooks have been spread
import React, { useMemo, useEffect, useCallback, ReactElement } from 'react';
import {
  HeaderGroup,
  useTable,
  useSortBy,
  useFilters,
  useFlexLayout,
  usePagination,
  SortingRule,
  TableOptions,
} from 'react-table';
import { DefaultColumnFilter, FiltersAndActions } from './partials';
import { Sizes, Intent } from '@ui/config';
import { Icon, Icons } from '@ui/Icon';
import { ErrorFallback } from '@ui/Misc/ErrorFallback';
import { Pagination } from '@ui/Pagination';
import { DataMode } from '@ui/config';
import { ErrorBoundary } from 'react-error-boundary';
import { Spinner } from '@ui/Spinner';
import './Table.css';

export interface IFilter {
  id: string;
  value: any;
}

export type SortType = SortingRule<string>;

export interface ITableProps<T extends Record<number, unknown>> extends TableOptions<T> {
  outerWrapperClassNames?: string;
  innerWrapperClassNames?: string;
  stickyColumn?: boolean;
  stickyColumnIndexes?: { index: number; width: string; left: string }[];
  pagination?: boolean;
  loading?: boolean;
  loadingMsg?: string | ReactElement;
  noDataMsg?: string | ReactElement;
  intent?: Intent;
  onUpdate?: (sortBy: SortingRule<T>[], pageIndex: number, filters: IFilter[]) => void;
  rowsPerPage?: number;
  totalCount?: number;
  dataMode: DataMode;
  initialFilters?: IFilter[];
  initialSort?: SortType[];
  actions?: ReactElement[];
  onSort?: (sortBy: SortingRule<T>[]) => void;
}

/**
 * A Table component that utilizes react-table v7 and supports sorting, pagination, and filtering (server-side optional).
 *
 * @returns
 */
export const Table = <T extends Record<number, unknown>>({
  outerWrapperClassNames = '',
  innerWrapperClassNames = '',
  columns = [],
  data = [],
  loading = false,
  loadingMsg = 'Loading...',
  noDataMsg = 'No Data Found',
  stickyColumn = false,
  stickyColumnIndexes = [
    { index: 0, width: '150px', left: '0' },
    { index: 1, width: '150px', left: '150px' },
  ],
  pagination = true,
  intent = Intent.Primary,
  onUpdate = () => {},
  onSort = () => {},
  rowsPerPage = 0,
  totalCount = 0,
  dataMode,
  initialFilters = [],
  initialSort = [],
  actions = [],
}: ITableProps<T>): ReactElement => {
  if (!data || !columns) {
    throw new Error('Required prop(s) "data" and/or "columns" is missing');
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onUpdateHandler = useCallback(onUpdate, []);
  const DEFAULT_PAGE_SIZE = 50;
  const tableIntentCss = `syo-table--${intent}`;

  const defaultColumn = useMemo(
    () => ({
      width: 100,
      Filter: DefaultColumnFilter,
      disableFilters: true,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    flatHeaders,
    rows,
    prepareRow,
    page,
    pageCount,
    state: { pageIndex, sortBy, filters },
    gotoPage,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    setAllFilters,
  } = useTable<T>(
    {
      columns: useMemo(() => columns, [columns]),
      data: useMemo(() => data, [data]),
      initialState: {
        pageSize: rowsPerPage || DEFAULT_PAGE_SIZE,
        pageIndex: 0,
        filters: useMemo(() => initialFilters, [initialFilters]),
        sortBy: useMemo(() => initialSort, [initialSort]),
      },
      defaultColumn,
      manualFilters: dataMode === DataMode.ServerSide,
      manualSortBy: dataMode === DataMode.ServerSide,
      manualPagination: dataMode === DataMode.ServerSide,
      autoResetSortBy: dataMode === DataMode.ClientSide,
      ...(dataMode === DataMode.ServerSide && {
        pageCount: Math.ceil(totalCount / rowsPerPage),
      }),
    },
    useFilters,
    useSortBy,
    usePagination,
    useFlexLayout
  );

  useEffect(() => {
    if (dataMode === DataMode.ServerSide && onUpdateHandler) {
      onUpdateHandler(sortBy, pageIndex, filters);
    }
  }, [sortBy, pageIndex, filters, dataMode, onUpdateHandler]);

  useEffect(() => {
    onSort(sortBy);
  }, [sortBy, onSort]);

  useEffect(() => {
    setAllFilters(initialFilters);
  }, [initialFilters, setAllFilters]);

  const generateStickyColumnStyle = (
    hasStickyColumn: boolean,
    stickyColumnIndexes: { index: number; width: string; left: string }[],
    index: number
  ) =>
    hasStickyColumn
      ? {
          style: {
            left: stickyColumnIndexes[index].left,
            zIndex: 5,
            minWidth: stickyColumnIndexes[index].width,
            maxWidth: stickyColumnIndexes[index].width,
          },
        }
      : {};

  const renderRows = () =>
    page.map((row) => {
      prepareRow(row);

      return (
        <div {...row.getRowProps()} className="syo-tbody__tr">
          {row.cells.map((cell, index) => {
            const cellProps = cell.getCellProps();
            const hasStickyColumn =
              (stickyColumnIndexes.find((e) => e.index === index) && stickyColumn) || false;
            const cellCss = hasStickyColumn
              ? index === stickyColumnIndexes.length - 1
                ? 'syo-td_sticky syo-td_sticky_last'
                : 'syo-td_sticky'
              : '';

            const className = `syo-td ${cell.column.id || ''} ${cellCss} ${
              // @ts-ignore
              cell.column.className || ''
            }`;

            return (
              <div
                {...cellProps}
                className={className}
                {...generateStickyColumnStyle(hasStickyColumn, stickyColumnIndexes, index)}
                role="gridcell"
              >
                {cell.render('Cell')}
              </div>
            );
          })}
        </div>
      );
    });

  const getSortClass = (column: HeaderGroup<T>) => {
    let className = 'syo-sort';

    if (column.isSorted) {
      className += column.isSortedDesc ? ' syo-sort_desc' : ' syo-sort_asc';
    }

    return className;
  };

  return (
    <div
      role="table"
      className={`syo-table ${tableIntentCss} ${outerWrapperClassNames}`}
      data-version="7"
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <FiltersAndActions
          columns={flatHeaders}
          disabled={data.length === 0 && filters.length === 0 && !loading}
          actions={actions}
        />
        {!loading ? (
          <div className={innerWrapperClassNames}>
            <div {...getTableProps()} className="syo-table" role="grid">
              {(rows.length || loading) && (
                <div className="syo-thead">
                  {headerGroups.map((headerGroup: HeaderGroup<T>) => (
                    <div {...headerGroup.getHeaderGroupProps()} className="syo-thead__tr">
                      {headerGroup.headers.map((column, index) => {
                        const hasStickyColumn =
                          (stickyColumnIndexes.find((e) => e.index === index) &&
                            stickyColumn) ||
                          false;
                        const cellCss = hasStickyColumn
                          ? index === stickyColumnIndexes.length - 1
                            ? 'syo-th_sticky syo-th_sticky_last'
                            : 'syo-th_sticky'
                          : '';

                        return (
                          <div
                            {...column.getHeaderProps(column.getSortByToggleProps())}
                            className={`syo-th ${column.id || ''} ${cellCss} ${
                              // @ts-ignore
                              column.headerClassName || ''
                            }`}
                            {...generateStickyColumnStyle(
                              hasStickyColumn,
                              stickyColumnIndexes,
                              index
                            )}
                            role="columnheader"
                          >
                            {column.render('Header')}
                            <span className={getSortClass(column)}>
                              <Icon
                                name={Icons[column.isSortedDesc ? 'ArrowDown' : 'ArrowUp']}
                                size={Sizes.sm}
                                className={!column.isSorted ? 'opacity-0' : ''}
                              />
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}

              {rows.length > 0 && (
                <div className="syo-tbody" {...getTableBodyProps()}>
                  {renderRows()}
                </div>
              )}
            </div>

            {!!rows.length ? (
              pagination ? (
                <Pagination
                  numPages={pageCount}
                  rowsPerPage={rowsPerPage}
                  totalCount={totalCount || rows.length}
                  pageIndex={pageIndex}
                  canPrevious={canPreviousPage}
                  canNext={canNextPage}
                  onPrevious={previousPage}
                  onNext={nextPage}
                  gotoPage={gotoPage}
                />
              ) : null
            ) : (
              <div className="syo-no-data">{noDataMsg}</div>
            )}
          </div>
        ) : (
          <div className="syo-table__loading-container">
            <Spinner wrapperClassName="syo-table__loading-spinner" size={10} />
            <div className="syo-table__loading-message">{loadingMsg}</div>
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};
