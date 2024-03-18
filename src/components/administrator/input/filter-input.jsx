import { TextField } from '@mui/material';
import { useField } from 'formik';
import { useCallback } from 'react';

export const FilterInput = ({ placeholder, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  const handelBlue = useCallback(
    async (e) => {
      field.onBlur(e);
      props.onBlur && props.onBlur(e);
      let value = e.target.value?.toString().trim();
      await setValue(value);
    },
    [field, props]
  );

  const handleChange = useCallback(
    async (e) => {
      field.onChange(e);
      props.onChange && props.onChange(e);
      setValue(e.target.value);
    },
    [field, props, setValue]
  );

  return (
    <TextField
      name={field.name}
      value={meta.value}
      onChange={handleChange}
      onBlur={handelBlue}
      placeholder={placeholder}
      variant="standard"
      sx={{
        height: 44,
        width: '100%',
        '.MuiInputBase-input': {
          fontFamily: 'Noto Sans JP',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: 16,
          lineHeight: '34px',
          p: '0px 15px',
          boxShadow: 'none',
          height: '44px',
          color: 'gray.100',
        },
        '.MuiInput-underline:before': {
          borderBottom: '1px solid',
        },
        '.MuiInput-underline:after': {
          borderBottom: '1px solid',
        },
        '.MuiInput-underline:hover:not(.Mui-disabled):before': {
          borderBottom: '1px solid',
        },
      }}
    />
  );
};
