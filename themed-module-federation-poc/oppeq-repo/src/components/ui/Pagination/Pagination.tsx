import React, { useState, ReactElement, useEffect } from 'react';
import { Sizes } from '@ui/config';
import { Icon, Icons } from '@ui/Icon';
import { TextInput } from '@ui/TextInput';
import { ErrorFallback } from '@ui/Misc/ErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';
import './Pagination.css';

export interface IPaginationProps {
  pageIndex?: number;
  numPages?: number;
  rowsPerPage?: number;
  totalCount: number;
  canPrevious: boolean;
  canNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  gotoPage: (pageNum: number) => void;
  navOnly?: boolean;
}

export const Pagination = ({
  pageIndex = 0,
  numPages = 1,
  rowsPerPage = 10,
  totalCount = 0,
  canPrevious = false,
  canNext = false,
  onPrevious,
  onNext,
  gotoPage,
  navOnly = false,
}: IPaginationProps): ReactElement => {
  const firstRowOnPage = pageIndex * rowsPerPage + 1;
  const lastRowOnPage = Math.min(pageIndex * rowsPerPage + rowsPerPage, totalCount);
  const [currPageIndex, setCurrPageIndex] = useState<number | string>(pageIndex + 1);

  useEffect(() => {
    setCurrPageIndex(pageIndex + 1);
  }, [pageIndex]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const valueAsNum = Number(value);

    if (value && (valueAsNum < 1 || valueAsNum > numPages)) {
      return;
    }

    setCurrPageIndex(value);
    if (value) {
      const newPage = Number(valueAsNum) - 1;
      gotoPage(newPage);
    }
  };

  return (
    <div className="syo-pagination">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {!navOnly && (
          <div className="syo-pagination__summary" data-testid="syo-pagination__summary">
            {firstRowOnPage}-{lastRowOnPage} of {totalCount}
          </div>
        )}
        <div className="syo-pagination__navigation" data-testid="syo-pagination__navigation">
          <button
            type="button"
            onClick={() => gotoPage(0)}
            disabled={!canPrevious}
            className="syo-pagination__first"
            data-testid="syo-pagination__first"
          >
            <Icon name={Icons.ChevronEndLeft} size={Sizes.md} />
          </button>
          <button
            type="button"
            onClick={onPrevious}
            disabled={!canPrevious}
            className="syo-pagination__prev"
            data-testid="syo-pagination__prev"
          >
            <Icon name={Icons.ChevronLeft} size={Sizes.md} />
          </button>
          <div className="syo-pagination__indicator">
            <div className="syo-pagination__indicator--container">
              <span
                className="syo-pagination__current-page"
                data-testid="syo-pagination__current-page"
              >
                <TextInput
                  type="number"
                  onChange={onChange}
                  value={currPageIndex}
                  min={1}
                  max={numPages}
                  disabled={numPages <= 1}
                />
              </span>{' '}
              of{' '}
              <span
                className="syo-pagination__total-pages"
                data-testid="syo-pagination__total-pages"
              >
                {numPages}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onNext}
            disabled={!canNext}
            className="syo-pagination__next"
            data-testid="syo-pagination__next"
          >
            <Icon name={Icons.ChevronRight} size={Sizes.md} />
          </button>
          <button
            onClick={() => gotoPage(numPages - 1)}
            disabled={!canNext}
            className="syo-pagination__last"
            data-testid="syo-pagination__last"
          >
            <Icon name={Icons.ChevronEndRight} size={Sizes.md} />
          </button>
        </div>
      </ErrorBoundary>
    </div>
  );
};
