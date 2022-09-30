import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from '@ui/Card';

describe('card component', () => {
  test('default state', () => {
    render(<Card>hello</Card>);

    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});
