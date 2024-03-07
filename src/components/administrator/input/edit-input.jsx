import { convertToFullWidth, convertToHalfWidth } from '@/utils';
import { TextField } from '@mui/material';
import { useField } from 'formik';
import { useCallback } from 'react';

export const AdEditInput = ({ isMultiline, convertFullWidth, convertHalfWidth, autoTrim = true, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  const handelBlue = useCallback(
    async (e) => {
      field.onBlur(e);
      props.onBlur && props.onBlur(e);
      let value = autoTrim ? e.target.value?.toString().trim() : e.target.value?.toString();

      if (convertHalfWidth) {
        value = convertToHalfWidth(value);
      }
      if (convertFullWidth) {
        value = convertToFullWidth(value);
      }

      await setValue(value);
    },
    [field, props]
  );

  const handleChange = useCallback(
    async (e) => {
      field.onChange(e);
      props.onChange && props.onChange(e);
      await setValue(e.target.value);
    },
    [field, props, setValue]
  );

  return (
    <TextField
      name={field.name}
      multiline={isMultiline}
      sx={{
        ml: -2,
        width: 1,
        '& .MuiOutlinedInput-root': {
          padding: 0,
          '& fieldset': {
            border: 'none',
          },
          '&:hover fieldset': {
            border: 'none',
          },
          '&.Mui-focused fieldset': {
            border: '2px solid #1976d2',
          },
        },
        '& .MuiInputBase-input': {
          padding: '8px',
          fontFamily: 'Hiragino Sans',
          fontSize: '12px',
          fontWeight: 300,
          lineHeight: '18px',
          borderRadius: 4,
        },
      }}
      value={meta.value}
      onChange={handleChange}
      onBlur={handelBlue}
    />
  );
};
