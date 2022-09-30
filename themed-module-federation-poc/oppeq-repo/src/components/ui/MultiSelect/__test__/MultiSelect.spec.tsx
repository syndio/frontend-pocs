import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import selectEvent from 'react-select-event';
import { MultiSelect } from '@ui/MultiSelect';
import type { IOption } from '@ui/Select';

const simpleOptions: IOption[] = [
  { value: 'chocolate', label: 'Bugs Bunny Workspace' },
  { value: 'strawberry', label: 'Hulk Workspace' },
  { value: 'vanilla', label: 'Elon Musk Workspace' },
];

describe('multiselect component', () => {
  test('default behavior', async () => {
    const selectedOptions: IOption[] = [];
    const setSelectedOptions = jest.fn();
    const { getByLabelText, container } = render(
      <form data-testid="form">
        <MultiSelect
          label="Test Values"
          id="test"
          options={simpleOptions}
          onChange={setSelectedOptions}
          selectedOptions={selectedOptions}
          placeholder="Test Select"
        />
      </form>
    );

    fireEvent.click(screen.getByText('Test Select'));
    //opens and shows display
    expect(screen.queryAllByText(simpleOptions[0].label).length).toBe(1);
    expect(screen.queryAllByText(simpleOptions[1].label).length).toBe(1);
    expect(screen.queryAllByText(simpleOptions[2].label).length).toBe(1);

    await selectEvent.select(
      getByLabelText('Test Values'),
      [simpleOptions[0].label, simpleOptions[1].label],
      { container }
    );

    expect(setSelectedOptions).toHaveBeenCalledTimes(2);
  });

  test('can be disabled', async () => {
    const selectedOptions: IOption[] = [];
    const setSelectedOptions = jest.fn();
    const { getByText } = render(
      <MultiSelect
        id="test"
        options={simpleOptions}
        onChange={setSelectedOptions}
        selectedOptions={selectedOptions}
        placeholder="Test Select"
        disabled={true}
      />
    );

    //opens dropdown
    fireEvent.click(getByText('Test Select'));

    //don't expect to open container with included items
    expect(screen.queryAllByText(simpleOptions[0].label).length).toBe(0);
    expect(screen.queryAllByText(simpleOptions[1].label).length).toBe(0);
    expect(screen.queryAllByText(simpleOptions[2].label).length).toBe(0);
  });
});
