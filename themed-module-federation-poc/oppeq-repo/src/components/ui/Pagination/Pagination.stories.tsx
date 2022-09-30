import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Pagination } from '@ui/Pagination';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Navigation/Pagination',
  component: Pagination,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    pageIndex: {
      description: 'Index of active page',
    },
    numPages: {
      description: 'Total number of pages required to show all possible results',
    },
    rowsPerPage: {
      description: 'Maximum number of rows to display on each page',
    },
    totalCount: {
      description:
        'Total number of results, useful for manual handling of pagination (e.g. server side pagination)',
    },
    canPrevious: {
      description:
        'Flag to determine whether or not user should be able to navigate to a previous page from the current page',
    },
    canNext: {
      description:
        'Flag to determine whether or not user should be able to navigate to a later page from the current page',
    },
    onPrevious: {
      description: 'Function handler for click on previous button',
    },
    onNext: {
      description: 'Function handler for click on next button',
    },
    gotoPage: {
      description:
        'Function handler for updating page number in "go to" section of navigation, as well as first page and last page buttons',
    },
    navOnly: {
      description:
        'Flag to determine whether or not to hide the results summary section {e.g. 11-20 of 31}',
    },
  },
} as unknown as ComponentMeta<typeof Pagination>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Pagination> = (args) => {
  const { numPages = 0 } = args;
  const [pageIndex, setPageIndex] = useState(0);
  const [canPrevious, setCanPrevious] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const navPage = (pageIndex: number) => {
    if (pageIndex >= numPages || pageIndex < 0) {
      return;
    }

    const canPrev = !(pageIndex === 0);
    const canNext = !(pageIndex === numPages - 1);
    setPageIndex(pageIndex);
    setCanPrevious(canPrev);
    setCanNext(canNext);
  };

  return (
    <Pagination
      {...args}
      pageIndex={pageIndex}
      canPrevious={canPrevious}
      canNext={canNext}
      onPrevious={() => navPage(pageIndex - 1)}
      onNext={() => navPage(pageIndex + 1)}
      gotoPage={navPage}
    />
  );
};

const defaultArgs = {
  numPages: 5,
  rowsPerPage: 10,
  totalCount: 46,
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const NavigationOnly = Template.bind({});
NavigationOnly.args = {
  ...defaultArgs,
  navOnly: true,
};
