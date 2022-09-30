import { useState } from 'react';
import '@testing-library/jest-dom';
import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from '@ui/TextInput';

describe('TextInput', () => {
  test('can be disabled', () => {
    const { container } = render(<TextInput value="" disabled onChange={jest.fn()} />);
    expect(container.getElementsByTagName('input')[0]).toBeDisabled();
  });

  test('can have a label', () => {
    const { container } = render(<TextInput value="" label="Name" onChange={jest.fn()} />);
    const label = container.querySelector('label');
    expect(within(label as HTMLLabelElement).getByText('Name')).toBeInTheDocument();
  });

  test('if type is number, it only accepts numeric input', () => {
    const Container = () => {
      const [value, setValue] = useState<string | number>('');
      return (
        <TextInput value={value} onChange={(e) => setValue(e.target.value)} type="number" />
      );
    };
    const { container } = render(<Container />);
    const input = container.querySelector('input') as HTMLInputElement;
    userEvent.type(input, '123');
    expect(input).toHaveValue(123);
    userEvent.type(input, 'a');
    expect(input).toHaveValue(null);
  });

  test('if type is string, it accepts any string', () => {
    const Container = () => {
      const [value, setValue] = useState<string | number>('');
      return (
        <TextInput value={value} onChange={(e) => setValue(e.target.value)} type="string" />
      );
    };
    const { container } = render(<Container />);
    const input = container.querySelector('input') as HTMLInputElement;
    userEvent.type(input, 'abc123!@#$%');
    expect(input).toHaveValue('abc123!@#$%');
  });
});
