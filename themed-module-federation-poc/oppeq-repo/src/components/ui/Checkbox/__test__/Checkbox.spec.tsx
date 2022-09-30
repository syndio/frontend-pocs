import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox, CheckboxState } from '@ui/Checkbox';

describe('checkbox component', () => {
  test('default behavior', () => {
    const onClick = jest.fn();
    const { container } = render(
      <Checkbox value={CheckboxState.False} onChange={onClick}>
        click me
      </Checkbox>
    );

    fireEvent.click(screen.getByText('click me'));

    expect(container.getElementsByTagName('input')[0]).not.toBeDisabled();
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(CheckboxState.False);
  });

  test('can be disabled', () => {
    const onClick = jest.fn();
    const { container } = render(
      <Checkbox value={CheckboxState.False} disabled onChange={onClick}>
        click me
      </Checkbox>
    );

    fireEvent.click(screen.getByText('click me'));

    expect(container.getElementsByTagName('input')[0]).toBeDisabled();
    expect(onClick).not.toHaveBeenCalledTimes(1);
  });

  describe('svg behavior', () => {
    test('true', () => {
      const onClick = jest.fn();
      const { container } = render(
        <Checkbox value={CheckboxState.True} onChange={onClick}>
          click me
        </Checkbox>
      );

      expect(container.getElementsByTagName('svg')[1].classList).toContain(
        'ico--checkbox-check'
      );
      expect(container.getElementsByTagName('svg').length).toEqual(2);
    });
    test('true, disabled', () => {
      const onClick = jest.fn();
      const { container } = render(
        <Checkbox value={CheckboxState.True} disabled onChange={onClick}>
          click me
        </Checkbox>
      );

      expect(container.getElementsByTagName('svg')[2].classList).toContain(
        'ico--checkbox-check'
      );
      expect(container.getElementsByTagName('input')[0]).toBeDisabled();
      expect(container.getElementsByTagName('svg').length).toEqual(3);
    });
    test('false', () => {
      const onClick = jest.fn();
      const { container } = render(
        <Checkbox value={CheckboxState.False} onChange={onClick}>
          click me
        </Checkbox>
      );

      expect(container.getElementsByTagName('svg')[1].classList).toContain(
        'ico--checkbox-box'
      );
      expect(container.getElementsByTagName('svg').length).toEqual(2);
    });
    test('false, disabled', () => {
      const onClick = jest.fn();
      const { container } = render(
        <Checkbox value={CheckboxState.False} disabled onChange={onClick}>
          click me
        </Checkbox>
      );
      expect(container.getElementsByTagName('svg')[1].classList).toContain(
        'ico--checkbox-box'
      );
      expect(container.getElementsByTagName('input')[0]).toBeDisabled();
      expect(container.getElementsByTagName('svg').length).toEqual(2);
    });
    test('indeterminate', () => {
      const onClick = jest.fn();
      const { container } = render(
        <Checkbox value={CheckboxState.Indeterminate} onChange={onClick}>
          click me
        </Checkbox>
      );
      expect(container.getElementsByTagName('svg')[1].classList).toContain(
        'ico--checkbox-indeterminate'
      );
      expect(container.getElementsByTagName('svg').length).toEqual(2);
    });
    test('indeterminate, disabled', () => {
      const onClick = jest.fn();
      const { container } = render(
        <Checkbox value={CheckboxState.Indeterminate} disabled onChange={onClick}>
          click me
        </Checkbox>
      );
      expect(container.getElementsByTagName('input')[0]).toBeDisabled();
      expect(container.getElementsByTagName('svg').length).toEqual(3);
      expect(container.getElementsByTagName('svg')[2].classList).toContain(
        'ico--checkbox-indeterminate'
      );
    });
  });
});
