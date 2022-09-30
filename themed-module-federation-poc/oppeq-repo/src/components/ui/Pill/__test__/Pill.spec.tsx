import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pill } from '@ui/Pill';
import { Sizes } from '@ui/config';

describe('Pill component', () => {
  test('default state', () => {
    render(<Pill>hello</Pill>);

    const component = screen.getByRole('button');

    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(component).not.toBeDisabled();
    expect(component?.classList.contains('syo-pill--size-16')).toBe(true);
  });

  test('can be disabled', () => {
    render(<Pill disabled>hello</Pill>);

    const component = screen.getByRole('button');

    expect(component).toBeDisabled();
  });

  test('click event works', () => {
    const onClick = jest.fn();

    render(<Pill onClick={onClick}>click me</Pill>);

    const component = screen.getByRole('button');

    userEvent.click(component);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('press space bar as click (accessibility)', () => {
    const onClick = jest.fn();

    render(<Pill onClick={onClick}>click me</Pill>);

    const component = screen.getByRole('button');

    fireEvent.keyPress(component, { key: 'Space', code: 32, charCode: 32 });

    expect(onClick).toHaveBeenCalled();
  });

  test('size can be changed', () => {
    render(<Pill size={Sizes.xl}>hello</Pill>);

    const component = screen.getByRole('button');

    expect(component?.classList.contains('syo-pill--size-24')).toBe(true);
  });

  test('supports transparent background', () => {
    render(<Pill transparent>hello</Pill>);

    const component = screen.getByRole('button');

    expect(component.classList.contains('syo-pill--bg-fill')).toBe(false);
  });
});
