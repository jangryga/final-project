import { FieldProps, getIn } from 'formik';
import { TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField/TextField';
import React from 'react';

export default function FormField({
  field,
  form,
  ...props
}: FieldProps & TextFieldProps): React.ReactElement {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);
  return (
    <TextField
      fullWidth
      // autoFocus
      margin='normal'
      helperText={errorText}
      error={!!errorText}
      {...field}
      {...props}
    />
  );
}
