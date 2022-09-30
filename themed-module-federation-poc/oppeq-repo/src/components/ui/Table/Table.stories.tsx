import React, { useMemo } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import { Sizes, DataMode, Intent } from '@ui/config';
import { Table } from '@ui/Table';
import type { ITableProps } from '@ui/Table';
import { Pill } from '@ui/Pill';
import { Button } from '@ui/Button';
import { Icon, Icons } from '@ui/Icon';
import { DefaultColumnFilter, IDefaultColumnFilterProps } from '@ui/Table/partials';
import { SortingRule } from 'react-table';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI/Table',
  component: Table,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    columns: {
      description:
        'List of columns in the table (see https://react-table.tanstack.com/docs/api/useTable#column-options).',
    },
    data: {
      description:
        'List of rows for the table (see https://react-table.tanstack.com/docs/api/useTable#row-properties).',
    },
    dataMode: {
      description: `Enables sorting, filtering, and pagination detection functionality, but does not automatically perform row sorting, filtering, or pagination. Turn
      this on if you wish to implement your own sorting, filtering, and pagination outside of the table (eg. server-side).`,
    },
    loading: {
      description: 'Flag to determine whether or not table is in loading state.',
    },
    loadingMsg: {
      description: 'Message to show while the data is in loading state.',
    },
    noDataMsg: {
      description: 'Message to show when the table is not loading and the data is empty.',
    },
    onUpdate: {
      description:
        'Required if dataMode is set to "clientSide". This is a callback function triggered on manual sort, filter, and pagination.',
    },
    onSort: {
      description: 'Function that will fire when user manually sorts',
    },
    outerWrapperClassNames: {
      description:
        'Classes to append to the wrapper containing the filter, table, and pagination sections.',
    },
    innerWrapperClassNames: {
      description:
        'Classes to append to the wrapper containing the table and pagination sections (does not include the filters section).',
    },
    rowsPerPage: {
      description:
        'If pagination is enabled, number of rows to display for each page of table.',
    },
    totalCount: {
      description: `Required if dataMode is set to "clientSide". This value is used to determine the total number of rows available in table. 
      This number is then used to materialize certain pagination options.`,
    },
    initialFilters: {
      description:
        'An array of objects representing the initial active filters for the Table on render.',
    },
    initialSort: {
      description:
        'An array of objects representing the initial active sort for the Table on render.',
    },
    actions: {
      description:
        'List of Button props objects (see Button stories) for any action buttons to render outside the table&apos;s headers and rows',
    },
    stickyColumn: {
      description:
        'A boolean identify if the table supports sticky column or not. By default it is set to false',
    },
    stickyColumnIndexes: {
      description: 'An array of objects representing the sticky columns with styles',
    },
  },
} as ComponentMeta<typeof Table>;

const defaultArgs: any = {
  columns: [
    {
      Header: 'Employee',
      accessor: 'employeeNum',
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Location',
      accessor: 'location',
    },
    {
      Header: 'Favorite Ice Cream',
      accessor: 'icecream',
      width: 160,
    },
    {
      Header: 'Favorite Color',
      accessor: 'color',
      width: 130,
    },
  ],
  data: [
    {
      employeeNum: 1,
      name: 'Jenny',
      location: 'New Jersey',
      icecream: 'vanilla',
      color: 'pink',
    },
    {
      employeeNum: 2,
      name: 'Sam',
      location: 'New York',
      icecream: 'chocolate',
      color: 'black',
    },
    {
      employeeNum: 3,
      name: 'David',
      location: 'Connecticut',
      icecream: 'chocolate chip cookie dough',
      color: 'purple',
    },
    {
      employeeNum: 4,
      name: 'Lena',
      location: 'Washington',
      icecream: 'cookies & cream',
      color: 'blue',
    },
    {
      employeeNum: 5,
      name: 'Josh',
      location: 'Louisiana',
      icecream: 'strawberry',
      color: 'red',
    },
    {
      employeeNum: 6,
      name: 'Jessica',
      location: 'California',
      icecream: 'mint',
      color: 'orange',
    },
    {
      employeeNum: 7,
      name: 'Kelsey',
      location: 'Iowa',
      icecream: 'cake batter',
      color: 'green',
    },
    {
      employeeNum: 8,
      name: 'Gladys',
      location: 'California',
      icecream: 'brownie batter',
      color: 'magenta',
    },
    {
      employeeNum: 9,
      name: 'Olya',
      location: 'New York',
      icecream: 'butter pecan',
      color: 'teal',
    },
    {
      employeeNum: 10,
      name: 'Courtney',
      location: 'Arizona',
      icecream: 'rocky road',
      color: 'yellow',
    },
    {
      employeeNum: 11,
      name: 'Erika',
      location: 'Washington',
      icecream: 'mint',
      color: 'indigo',
    },
  ],
  rowsPerPage: 5,
  dataMode: DataMode.ClientSide,
  innerWrapperClassNames: 'mt-3',
  initialFilters: [],
};

const argsWithFilters = {
  ...defaultArgs,
  columns: defaultArgs.columns.map((col: { accessor: string }) => {
    if (col.accessor === 'name') {
      return {
        ...col,
        disableFilters: false,
      };
    }

    if (col.accessor === 'location') {
      return {
        ...col,
        disableFilters: false,
        Filter: (props: IDefaultColumnFilterProps) => (
          <DefaultColumnFilter {...props} placeholder="Search by location" />
        ),
      };
    }

    return col;
  }),
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Table> = <Data extends Record<number, unknown>>(
  args: ITableProps<Data>
) => {
  const [{ rowsPerPage, dataMode }, updateArgs] = useArgs();
  const memoizedFilters = useMemo(() => args.initialFilters, []);
  const memoizedSort = useMemo(() => args.initialSort, []);

  const mockServerSideFilter = (
    filters: { id: string; value: any }[],
    data: { [key: string]: any }[]
  ) => {
    let newData = [...data];

    filters.forEach((f) => {
      newData = newData.filter((row) => {
        const value = row[f.id].toLowerCase();
        const searchTerm = f.value.toLowerCase();

        return value.includes(searchTerm);
      });
    });

    updateArgs({ totalCount: newData.length });
    return newData;
  };

  const mockServerSideSort = (sortBy: SortingRule<Data>[], data: { [key: string]: any }[]) => {
    const sortCol: string = sortBy[0]?.id;
    const sortDesc: boolean = sortBy[0]?.desc || false;

    return data?.sort((a: any, b: any) => {
      if (sortDesc) {
        return a[sortCol] < b[sortCol] ? 1 : -1;
      } else {
        return a[sortCol] < b[sortCol] ? -1 : 1;
      }
    });
  };

  const mockServerSidePagination = (pageIndex: number, data: { [key: string]: any }[]) => {
    if (rowsPerPage) {
      const startIndex = pageIndex * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      return data.slice(startIndex, endIndex);
    }
    return data;
  };

  const onUpdate = (
    sortBy: SortingRule<Data>[],
    pageIndex: number,
    filters: { id: string; value: any }[]
  ) => {
    let newData = defaultArgs.data?.length ? [...defaultArgs.data] : [];

    if (dataMode === DataMode.ServerSide) {
      newData = mockServerSideFilter(filters, newData);
      newData = sortBy.length ? mockServerSideSort(sortBy, newData) : newData;
      newData = mockServerSidePagination(pageIndex, newData);
    }

    updateArgs({ data: newData });
  };

  const tableProps = {
    ...args,
    ...(dataMode === DataMode.ServerSide ? { onUpdate: onUpdate } : {}),
    ...(args.initialFilters ? { initialFilters: memoizedFilters } : {}),
    ...(args.initialSort ? { initialSort: memoizedSort } : {}),
  };

  return <Table {...tableProps} />;
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const ServerSide = Template.bind({});
ServerSide.args = {
  ...defaultArgs,
  dataMode: DataMode.ServerSide,
  totalCount: 11,
};

export const FilterOnRender = Template.bind({});
FilterOnRender.args = {
  ...argsWithFilters,
  initialFilters: [{ id: 'location', value: 'new' }],
};

export const SortOnRender = Template.bind({});
SortOnRender.args = {
  ...defaultArgs,
  initialSort: [{ id: 'color', desc: true }],
};

export const ActionButtons = Template.bind({});
ActionButtons.args = {
  ...argsWithFilters,
  actions: [
    <Button
      key="click-me-btn"
      onClick={() => alert('Wow! Nice click!')}
      intent={Intent.Secondary}
    >
      Click me!
    </Button>,
  ],
};

export const NoData = Template.bind({});
NoData.args = {
  ...defaultArgs,
  data: [],
  noDataMsg: (
    <div className="text-center p-5">
      <h1 className="prose prose-header-2">No results were found matching your search</h1>
      <p>Try adjusting your search or filters to find what you&apos;re looking for.</p>
    </div>
  ),
};

export const Loading = Template.bind({});
Loading.args = {
  ...defaultArgs,
  data: [],
  loading: true,
  loadingMsg: (
    <div className="flex my-10 items-center">
      <h2 className="prose prose-header-3 px-5">Loading data... </h2>
    </div>
  ),
};

export const VerticalScroll = Template.bind({});
VerticalScroll.args = {
  ...defaultArgs,
  innerWrapperClassNames: `${defaultArgs.innerWrapperClassNames} h-80`,
};

export const HorizontalScroll = Template.bind({});
HorizontalScroll.args = {
  ...defaultArgs,
  innerWrapperClassNames: `${defaultArgs.innerWrapperClassNames} w-5/6`,
};

export const ComplexCells = Template.bind({});
ComplexCells.args = {
  ...defaultArgs,
  data: [
    {
      employeeNum: null,
      name: (
        <div className="flex items-center text-alertError">
          <Icon name={Icons.Person} size={Sizes.sm} />
          <div className="ml-2">Restricted</div>
        </div>
      ),
      location: (
        <div className="flex items-center text-alertError">
          <Icon name={Icons.Person} size={Sizes.sm} />
          <div className="ml-2">Restricted</div>
        </div>
      ),
      icecream: (
        <Button
          onClick={() => {
            alert('Favorite Ice Cream: Cake Batter');
          }}
        >
          Click to see!
        </Button>
      ),
      color: (
        <Pill transparent={false} size={Sizes.md}>
          Teal
        </Pill>
      ),
    },
    ...defaultArgs.data,
  ],
};
