import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Intent, Direction } from '@ui/config';
import { Button } from '@ui/Button';
import { Icons } from '@ui/Icon';

describe('button component', () => {
  test('default behavior', () => {
    const onClick = jest.fn();
    const { container, getByText } = render(<Button onClick={onClick}>click me</Button>);

    fireEvent.click(screen.getByText('click me'));

    // should default to secondary intent style
    expect(container.getElementsByClassName('syo-btn--secondary').length).toBe(1);
    expect(getByText('click me')).not.toBeDisabled();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('can be disabled', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Button disabled onClick={onClick}>
        click me
      </Button>
    );

    fireEvent.click(screen.getByText('click me'));

    expect(getByText('click me').closest('button')).toBeDisabled();
    expect(onClick).not.toHaveBeenCalledTimes(1);
  });

  test('primary intent', () => {
    const { container } = render(<Button intent={Intent.Primary}>click me</Button>);

    expect(container.getElementsByClassName('syo-btn--primary').length).toBe(1);
  });

  test('supports icon', () => {
    const { container } = render(<Button icon={Icons.Syndio}>click me</Button>);

    // First child of Button should be the SVG icon (Direction.Left is default)
    expect(container?.firstChild?.firstChild?.nodeName).toBe('svg');

    // Icon should be .icon-syndio
    expect(container.querySelector('.ico--syndio')).toBeDefined();

    // Second child of Button should be "click me"
    expect(container?.lastChild?.lastChild?.firstChild?.nodeValue).toBe('click me');
  });

  test('icon on the right of text', () => {
    const { container } = render(
      <Button icon={Icons.Syndio} iconDirection={Direction.Right}>
        click me
      </Button>
    );

    // First child of Button should be the text
    expect(container?.firstChild?.firstChild?.firstChild?.nodeValue).toBe('click me');

    // Second child of Button should be the icon
    expect(container?.lastChild?.lastChild?.nodeName).toBe('svg');
  });
});
