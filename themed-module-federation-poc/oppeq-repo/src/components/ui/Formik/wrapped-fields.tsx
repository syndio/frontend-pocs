import React, { ReactElement } from 'react';
import { Field, FieldProps } from 'formik';
import { Message } from '@ui/config';
import { TextInput } from '@ui/TextInput';
import { Select } from '@ui/Select';
import { MultiSelect } from '@ui/MultiSelect';
import type { ITextInputProps } from '@ui/TextInput';
import type { IMultiSelectProps } from '@ui/MultiSelect';
import type { ISelectProps } from '@ui/Select';

interface IFormikTextBox extends Omit<ITextInputProps, 'onBlur' | 'value'> {
  name: string;
}

export const FormikTextBox = ({
  name,
  message,
  onChange,
  onWheel,
  ...rest
}: IFormikTextBox): ReactElement => {
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => {
        const displayedMessage =
          meta.error && meta.touched
            ? { type: Message.Error, label: meta.error }
            : message
            ? message
            : undefined;
        return (
          <TextInput
            value={field.value}
            id={name}
            onChange={onChange ? onChange : field.onChange}
            onBlur={field.onBlur}
            // @ts-ignore
            onWheel={onWheel ? onWheel : field.onWheel}
            message={displayedMessage}
            {...rest}
          />
        );
      }}
    </Field>
  );
};

interface IFormikSelect extends Omit<ISelectProps, 'onChange' | 'onBlur'> {
  name: string;
}

export const FormikSelect = ({ name, message, ...rest }: IFormikSelect): ReactElement => {
  return (
    <Field name={name}>
      {({ field, form, meta }: FieldProps) => {
        const displayedMessage =
          meta.error && meta.touched
            ? { type: Message.Error, label: meta.error }
            : message
            ? message
            : undefined;
        return (
          <Select
            {...rest}
            onChange={(e) => form.setFieldValue(field.name, e.value)}
            onMenuClose={() => form.setTouched({ ...form.touched, [field.name]: true })}
            message={displayedMessage}
          />
        );
      }}
    </Field>
  );
};

interface IFormikMultiSelect extends Omit<IMultiSelectProps, 'onChange' | 'onBlur' | 'id'> {
  name: string;
}

export const FormikMultiSelect = ({
  name,
  message,
  ...rest
}: IFormikMultiSelect): ReactElement => {
  return (
    <Field name={name}>
      {({ field, form, meta }: FieldProps) => {
        const displayedMessage =
          meta.error && meta.touched
            ? { type: Message.Error, label: meta.error }
            : message
            ? message
            : undefined;
        return (
          <MultiSelect
            {...rest}
            id={field.name}
            selectedOptions={field.value}
            onBlur={() => form.setTouched({ ...form.touched, [field.name]: true })}
            onChange={(e) => {
              form.setFieldValue(name, e);
            }}
            message={displayedMessage}
          />
        );
      }}
    </Field>
  );
};
