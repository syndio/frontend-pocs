import React from 'react';
import { render, screen } from '@testing-library/react';
import { TruncatedList } from '@ui/TruncatedList';

const testListItems = [
  {
    name: 'test 1',
    id: 1,
  },
  {
    name: 'test 2',
    id: 2,
  },
  {
    name: 'test 3',
    id: 3,
  },
  {
    name: 'test 4',
    id: 4,
  },
];

describe('truncated list component', () => {
  test('default behavior', () => {
    render(<TruncatedList id="testList" list={testListItems} />);

    expect(screen.getByText(testListItems[0].name)).toBeInTheDocument();
    expect(screen.getByText('+3 more')).toBeInTheDocument();
  });
  test('if empty list', () => {
    const { container } = render(<TruncatedList id="testList" list={[]} />);
    expect(container.querySelector('.syo-truncated-list')?.children.length).toBe(0);
  });
  test('truncate at higher than list length', () => {
    const { container } = render(
      <TruncatedList id="testList" list={testListItems} truncateAt={6} />
    );
    expect(container.querySelector('.syo-truncated-list')?.children.length).toBe(4);
    expect(screen.getAllByText(testListItems[0].name)).not.toBeNull();
    expect(screen.getAllByText(testListItems[1].name)).not.toBeNull();
    expect(screen.getAllByText(testListItems[2].name)).not.toBeNull();
    expect(screen.getAllByText(testListItems[3].name)).not.toBeNull();
  });
  test('truncate at more than 1', () => {
    const { container } = render(
      <TruncatedList id="testList" list={testListItems} truncateAt={2} />
    );

    expect(container.querySelector('.syo-truncated-list')?.children.length).toBe(3);

    expect(screen.getByText(testListItems[0].name)).toBeInTheDocument();
    expect(screen.getByText(testListItems[1].name)).toBeInTheDocument();
    expect(screen.getByText('+2 more')).toBeInTheDocument();
  });
});
