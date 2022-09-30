import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, Link } from 'react-router-dom';
import { Breadcrumbs } from '../Breadcrumbs';

describe('Breadcrumbs component', () => {
  test('default behavior', () => {
    const { container, getByText } = render(
      <BrowserRouter>
        <Breadcrumbs>
          <Link to="#" className="font-bold text-actionPrimary">
            Users
          </Link>
          <div>Willy Wonka</div>
        </Breadcrumbs>
      </BrowserRouter>
    );

    // should include both children and a separator <li>
    expect(container.getElementsByTagName('li').length).toBe(3);
    expect(getByText('Users')).toBeInTheDocument();
    expect(getByText('Willy Wonka')).toBeInTheDocument();
  });
});
