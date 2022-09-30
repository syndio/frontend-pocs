import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Select } from '@ui/Select';

const options = [
  { value: 'chocolate', label: 'Bugs Bunny Workspace' },
  { value: 'strawberry', label: 'Hulk Workspace' },
  { value: 'vanilla', label: 'Elon Musk Workspace' },
];

describe('Select component', () => {
  test('is initially in a closed state', () => {
    render(<Select options={options} />);
    expect(screen.queryByText('Hulk Workspace')).not.toBeInTheDocument();
    expect(screen.queryByText('Elon Musk Workspace')).not.toBeInTheDocument();
  });

  test('when you click, the menu opens and shows all options', () => {
    const { container } = render(<Select options={options} />);
    const component = container.querySelector('input');
    userEvent.click(component as HTMLInputElement);
    expect(screen.getByText('Hulk Workspace')).toBeInTheDocument();
    expect(screen.getByText('Elon Musk Workspace')).toBeInTheDocument();
  });

  test('can be disabled', () => {
    const { container } = render(<Select options={options} disabled />);
    const component = container.querySelector('input');
    expect(component).toBeDisabled();
  });

  test('can have a label', () => {
    const { container } = render(
      <Select options={options} label="Fun Workspaces" inputId="label" />
    );
    const label = container.querySelector('label');
    expect(within(label as HTMLLabelElement).getByText('Fun Workspaces')).toBeInTheDocument();
  });

  test('has a label inside the value container', () => {
    const { container } = render(
      <Select options={options} innerLabel="Fun Workspaces" inputId="inner-label" />
    );
    const label = container.querySelector('.select__value-container label');
    expect(within(label as HTMLLabelElement).getByText('Fun Workspaces')).toBeInTheDocument();
  });

  test('inputId must be provided when using label/innerLabel', () => {
    const err = console.error;

    // mock console.error to not generate noise during this throw error test
    console.error = jest.fn();

    expect(() => render(<Select options={options} label="Some label" />)).toThrow(
      '"inputId" prop must be provided when "label" or "innerLabel" is provided'
    );

    expect(() => render(<Select options={options} innerLabel="Some inner Label" />)).toThrow(
      '"inputId" prop must be provided when "label" or "innerLabel" is provided'
    );

    // restore console.error for other tests
    console.error = err;
  });
});
