import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Sizes } from '@ui/config';
import { Toggle } from '@ui/Toggle';

const defaultProps = {
  size: Sizes.md,
};

describe('Toggle component', () => {
  test('default behavior', async () => {
    render(
      <Toggle {...defaultProps} id={'toggle-default'} value={'default'} checked={false} />
    );
    const toggle = screen.getByRole('button');
    // should have no label, unchecked by default
    expect(toggle.getElementsByTagName('span')).toHaveLength(0);
    expect(toggle).not.toBeChecked();
  });

  test('disabled', async () => {
    render(
      <Toggle {...defaultProps} id={'toggle-disabled'} value={'disabled'} disabled={true} />
    );
    const toggle = screen.getByRole('button');
    // should be disabled, click should not change checked status
    expect(toggle).toBeDisabled();
    expect(toggle).toHaveProperty('disabled', true);
    expect(toggle).not.toBeChecked();
    // fireEvent.click() does not respect disabled attributes. Instead trigger keyDown on toggle
    toggle.focus();
    fireEvent.keyDown(document.activeElement || document.body);
    expect(toggle).not.toBeChecked();
  });

  test('with label', async () => {
    render(
      <Toggle {...defaultProps} id={'toggle-label'} value={'label'} label={'Test label'} />
    );
    // should have a label
    expect(screen.getByText('Test label')).toBeVisible();
  });

  test('default checked', async () => {
    render(
      <Toggle {...defaultProps} id={'toggle-checked'} value={'checked'} checked={true} />
    );
    const toggle = screen.getByRole('button');
    // should be checked by default
    expect(toggle).toHaveProperty('defaultChecked', true);
    expect(toggle).toBeChecked();
  });

  test('should call onChange when clicked', async () => {
    const setChecked = jest.fn();
    render(
      <Toggle
        {...defaultProps}
        id={'toggle-with-handler'}
        value={'with-handler'}
        onChange={setChecked}
      />
    );
    const toggle = screen.getByRole('button');
    // should trigger event handler
    fireEvent.click(toggle);
    expect(setChecked).toHaveBeenCalledTimes(1);
  });
});
