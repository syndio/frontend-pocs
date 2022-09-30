import React from 'react';
import { render, screen } from '@testing-library/react';
import { Avatar } from '@ui/Avatar';

describe('avatar component', () => {
  test('default state', () => {
    render(<Avatar str="Acme" />);

    expect(screen.getByText('A')).toBeInTheDocument();
  });
});
