import React from 'react';
import { render, screen } from '@testing-library/react';
import { Callout } from '@ui/Callout';

describe('callout component', () => {
  test('default behavior', () => {
    render(<Callout>hello world</Callout>);
    expect(screen.getByText('hello world')).toBeInTheDocument();
  });
});
