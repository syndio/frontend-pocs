import React, { ReactElement } from 'react';
import { ComponentMeta } from '@storybook/react';
import { BrowserRouter, Link } from 'react-router-dom';

import { Breadcrumbs } from '@ui/Breadcrumbs/Breadcrumbs';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
} as ComponentMeta<typeof Breadcrumbs>;

export const Single = (): ReactElement => {
  return (
    <BrowserRouter>
      <Breadcrumbs>
        <Link to="#" className="font-bold text-actionPrimary">
          Users
        </Link>
      </Breadcrumbs>
    </BrowserRouter>
  );
};

export const Multiple = (): ReactElement => {
  return (
    <BrowserRouter>
      <Breadcrumbs>
        <Link to="#" className="font-bold text-actionPrimary">
          Users
        </Link>
        <div>Willy Wonka</div>
      </Breadcrumbs>
    </BrowserRouter>
  );
};
