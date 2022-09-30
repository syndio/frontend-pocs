import React from 'react';
import { render, screen } from '@testing-library/react';
import { Pagination, IPaginationProps } from '@ui/Pagination';
import userEvent from '@testing-library/user-event';

const onPrevious = jest.fn();
const onNext = jest.fn();
const gotoPage = jest.fn();

const props: IPaginationProps = {
  pageIndex: 0,
  numPages: 3,
  rowsPerPage: 10,
  totalCount: 25,
  canPrevious: false,
  canNext: true,
  onPrevious: onPrevious,
  onNext: onNext,
  gotoPage: gotoPage,
  navOnly: false,
};

describe('Pagination component', () => {
  test('shows navigation section and page summary section', () => {
    render(<Pagination {...props} />);

    expect(screen.queryByTestId('syo-pagination__summary')).toBeInTheDocument();
  });

  test('shows navigation section only', () => {
    render(<Pagination {...props} navOnly={true} />);

    expect(screen.queryByTestId('syo-pagination__summary')).not.toBeInTheDocument();
  });

  test('shows correct numbers in page summary', () => {
    const { rerender } = render(<Pagination {...props} />);

    expect(screen.getByText('1-10 of 25')).toBeInTheDocument();
    rerender(<Pagination {...props} pageIndex={1} />);
    expect(screen.getByText('11-20 of 25')).toBeInTheDocument();
    rerender(<Pagination {...props} pageIndex={2} />);
    expect(screen.getByText('21-25 of 25')).toBeInTheDocument();
  });

  test('has only next buttons enabled on first page', () => {
    render(<Pagination {...props} />);

    expect(screen.queryByTestId('syo-pagination__first')).toBeDisabled();
    expect(screen.queryByTestId('syo-pagination__prev')).toBeDisabled();
    expect(screen.queryByTestId('syo-pagination__next')).not.toBeDisabled();
    expect(screen.queryByTestId('syo-pagination__last')).not.toBeDisabled();
  });

  test('has all navigation buttons enabled when on middle page', () => {
    render(<Pagination {...props} pageIndex={1} canPrevious={true} />);

    expect(screen.queryByTestId('syo-pagination__first')).not.toBeDisabled();
    expect(screen.queryByTestId('syo-pagination__prev')).not.toBeDisabled();
    expect(screen.queryByTestId('syo-pagination__next')).not.toBeDisabled();
    expect(screen.queryByTestId('syo-pagination__last')).not.toBeDisabled();
  });

  test('has only previous buttons enabled on last page', () => {
    render(<Pagination {...props} pageIndex={2} canPrevious={true} canNext={false} />);

    expect(screen.queryByTestId('syo-pagination__first')).not.toBeDisabled();
    expect(screen.queryByTestId('syo-pagination__prev')).not.toBeDisabled();
    expect(screen.queryByTestId('syo-pagination__next')).toBeDisabled();
    expect(screen.queryByTestId('syo-pagination__last')).toBeDisabled();
  });

  test('has all navigation disabled when there is one page', () => {
    render(<Pagination {...props} numPages={1} totalCount={8} canNext={false} />);

    expect(screen.queryByTestId('syo-pagination__first')).toBeDisabled();
    expect(screen.queryByTestId('syo-pagination__prev')).toBeDisabled();
    expect(screen.queryByTestId('syo-pagination__next')).toBeDisabled();
    expect(screen.queryByTestId('syo-pagination__last')).toBeDisabled();
  });

  test('calls correct functions when navigating', () => {
    render(<Pagination {...props} pageIndex={1} canPrevious={true} />);

    const firstButton = screen.getByTestId('syo-pagination__first');
    const prevButton = screen.getByTestId('syo-pagination__prev');
    const nextButton = screen.getByTestId('syo-pagination__next');
    const lastButton = screen.getByTestId('syo-pagination__last');
    const currPageInput = screen
      .getByTestId('syo-pagination__current-page')
      .getElementsByTagName('input')[0];

    userEvent.click(nextButton);
    expect(onNext).toHaveBeenCalledTimes(1);

    userEvent.click(prevButton);
    expect(onPrevious).toHaveBeenCalledTimes(1);

    userEvent.click(lastButton);
    expect(gotoPage).toHaveBeenCalledTimes(1);
    expect(gotoPage).toHaveBeenCalledWith(2);

    userEvent.click(firstButton);
    expect(gotoPage).toHaveBeenCalledTimes(2);
    expect(gotoPage).toHaveBeenCalledWith(0);

    // Should only be able to navigate to pages that exist
    userEvent.type(currPageInput, '{backspace}0');
    expect(gotoPage).toHaveBeenCalledTimes(2);
    userEvent.type(currPageInput, '{backspace}4');
    expect(gotoPage).toHaveBeenCalledTimes(2);
    userEvent.type(currPageInput, '{backspace}2');
    expect(gotoPage).toHaveBeenCalledTimes(3);
    expect(gotoPage).toHaveBeenCalledWith(1);
  });
});
