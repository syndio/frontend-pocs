import React from 'react';
import { render } from '@testing-library/react';
import { Icon, Icons } from '@ui/Icon';

describe('icon component', () => {
  test('default behavior', () => {
    const { container } = render(<Icon name={Icons.Syndio} />);

    // First child of Button should be the SVG icon (Direction.Left is default)
    expect(container?.firstChild?.nodeName).toBe('svg');

    // Icon should be .icon-syndio
    expect(container.querySelector('.ico--syndio')).toBeDefined();
  });
});
