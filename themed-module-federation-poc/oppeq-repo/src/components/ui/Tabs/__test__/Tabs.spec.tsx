import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs, Tab } from '@ui/Tabs/Tabs';
import userEvent from '@testing-library/user-event';

describe('Tabs component', () => {
  test('renders basic tabs', () => {
    render(
      <Tabs aria-label="Test Tabs">
        <Tab title="Demographics" id="demographics">
          Demographics content
        </Tab>
        <Tab title="Levels" id="levels">
          Levels content
        </Tab>
      </Tabs>
    );

    // Nav assertions
    expect(screen.getByText('Demographics').getAttribute('aria-selected')).toBe('true');
    expect(screen.getByText('Levels').getAttribute('aria-selected')).toBe('false');

    // Panel assertions
    expect(screen.getByText('Demographics content')).toBeInTheDocument();
    expect(screen.queryByText('Levels content')).toBeNull();
  });

  test('renders tabs with active tab set', () => {
    render(
      <Tabs aria-label="Test Tabs" defaultTabId="levels">
        <Tab title="Demographics" id="demographics">
          Demographics content
        </Tab>
        <Tab title="Levels" id="levels">
          Levels content
        </Tab>
      </Tabs>
    );

    // Nav assertions
    expect(screen.getByText('Demographics').getAttribute('aria-selected')).toBe('false');
    expect(screen.getByText('Levels').getAttribute('aria-selected')).toBe('true');

    // Panel assertions
    expect(screen.queryByText('Demographics content')).toBeNull();
    expect(screen.getByText('Levels content')).toBeInTheDocument();
  });

  test('onChange callback is called', () => {
    const onChange = jest.fn();

    render(
      <Tabs aria-label="Test Tabs" onChange={onChange}>
        <Tab title="Demographics" id="demographics">
          Demographics content
        </Tab>
        <Tab title="Levels" id="levels">
          Levels content
        </Tab>
      </Tabs>
    );

    // Nav assertions
    expect(screen.getByText('Demographics').getAttribute('aria-selected')).toBe('true');
    expect(screen.getByText('Levels').getAttribute('aria-selected')).toBe('false');

    // Panel assertions
    expect(screen.getByText('Demographics content')).toBeInTheDocument();
    expect(screen.queryByText('Levels content')).toBeNull();

    userEvent.click(screen.getByText('Levels'));

    // Nav assertions
    expect(screen.getByText('Demographics').getAttribute('aria-selected')).toBe('false');
    expect(screen.getByText('Levels').getAttribute('aria-selected')).toBe('true');

    // Panel assertions
    expect(screen.queryByText('Demographics content')).toBeNull();
    expect(screen.getByText('Levels content')).toBeInTheDocument();

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('accessibility basics', () => {
    render(
      <Tabs aria-label="Test Tabs" defaultTabId="levels">
        <Tab title="Demographics" id="demographics">
          Demographics content
        </Tab>
        <Tab title="Levels" id="levels">
          Levels content
        </Tab>
      </Tabs>
    );

    // Trying to follow these standards: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByRole('tablist').getAttribute('aria-label')).toEqual('Test Tabs');
    expect(screen.getAllByRole('tabpanel').length).toBe(1);
    expect(screen.getByRole('tabpanel').getAttribute('aria-labelledby')).toEqual('tab-levels');
    expect(screen.getByRole('tabpanel').getAttribute('tabindex')).toEqual('0');

    expect(screen.getByText('Demographics').getAttribute('tabindex')).toEqual('-1');
    expect(screen.getByText('Levels').getAttribute('tabindex')).toEqual('0');

    userEvent.click(screen.getByText('Demographics'));

    expect(screen.getAllByRole('tabpanel').length).toBe(1);
    expect(screen.getByRole('tabpanel').getAttribute('aria-labelledby')).toEqual(
      'tab-demographics'
    );
    expect(screen.getByRole('tabpanel').getAttribute('tabindex')).toEqual('0');

    expect(screen.getByText('Demographics').getAttribute('tabindex')).toEqual('0');
    expect(screen.getByText('Levels').getAttribute('tabindex')).toEqual('-1');
  });

  test('navigate tabs with keyboard arrows', async () => {
    render(
      <Tabs aria-label="Test Tabs" defaultTabId="demographics">
        <Tab title="Demographics" id="demographics">
          Demographics content
        </Tab>
        <Tab title="Levels" id="levels">
          Levels content
        </Tab>
      </Tabs>
    );

    expect(screen.getAllByRole('tabpanel').length).toBe(1);
    expect(screen.getByRole('tabpanel').getAttribute('aria-labelledby')).toEqual(
      'tab-demographics'
    );
    expect(screen.getByRole('tabpanel').getAttribute('tabindex')).toEqual('0');

    expect(screen.getByText('Demographics').getAttribute('tabindex')).toEqual('0');
    expect(screen.getByText('Levels').getAttribute('tabindex')).toEqual('-1');

    const tab1 = screen.getByText('Demographics');
    const tab2 = screen.getByText('Levels');

    // Start with focus on Tab 1
    tab1.focus();
    expect(tab1).toHaveFocus();

    // Pressing right arrow gives focus to Tab 2
    fireEvent.keyDown(tab1, { key: 'ArrowRight' });
    expect(tab2).toHaveFocus();

    // Pressing left arrow gives focus back to Tab 1
    fireEvent.keyDown(tab2, { key: 'ArrowLeft' });
    expect(tab1).toHaveFocus();

    // Pressing right arrow TWICE from Tab 1 cycles back to the first Tab
    fireEvent.keyDown(tab1, { key: 'ArrowRight' });
    fireEvent.keyDown(tab2, { key: 'ArrowRight' });
    expect(tab1).toHaveFocus();

    // Pressing left arrow from Tab 1 cycles forward to the last Tab
    fireEvent.keyDown(tab1, { key: 'ArrowLeft' });
    expect(tab2).toHaveFocus();
  });

  test('activate tab by pressing ENTER', async () => {
    render(
      <Tabs aria-label="Test Tabs" defaultTabId="demographics">
        <Tab title="Demographics" id="demographics">
          Demographics content
        </Tab>
        <Tab title="Levels" id="levels">
          Levels content
        </Tab>
      </Tabs>
    );

    const tab1 = screen.getByText('Demographics');
    const tab2 = screen.getByText('Levels');

    // Start with focus on Tab 1
    tab1.focus();
    expect(tab1).toHaveFocus();
    expect(screen.getByText('Demographics content')).toBeInTheDocument();

    // Pressing right arrow gives focus to Tab 2
    fireEvent.keyDown(tab1, { key: 'ArrowRight' });
    expect(tab2).toHaveFocus();
    expect(screen.getByText('Demographics content')).toBeInTheDocument();

    // Move to second tab using right arrow and press Enter to activate second tab
    fireEvent.keyDown(tab2, { key: 'Enter' });
    expect(screen.getByText('Levels content')).toBeInTheDocument();

    // Move to first tab using left arrow and press Enter to activate first tab
    fireEvent.keyDown(tab2, { key: 'ArrowLeft' });
    expect(tab1).toHaveFocus();
    fireEvent.keyDown(tab1, { key: 'Enter' });
    expect(screen.getByText('Demographics content')).toBeInTheDocument();
  });
});
