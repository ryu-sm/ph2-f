import { convertToHalfWidth } from '@/utils';
import { Stack, TextField, Typography } from '@mui/material';
import { useField } from 'formik';
import { useCallback } from 'react';
import { NumericFormat } from 'react-number-format';

export const FilterNumericInput = ({ placeholder, unit, width, ...props }) => {
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
    <Stack direction={'row'} alignItems={'center'} spacing={1}>
      <NumericFormat
        customInput={TextField}
        thousandSeparator
        name={field.name}
        value={meta.value}
        onInput={(e) => {
          e.target.value = convertToHalfWidth(e.target.value);
          e.target.value = e.target.value.substring(0, maxLength);
          return e;
        }}
        onChange={handleChange}
        onBlur={handelBlue}
        placeholder={placeholder}
        variant="standard"
        sx={{
          height: 44,
          width: width || '100%',
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
      {unit && (
        <Typography variant="edit_content" whiteSpace={'nowrap'} color={'gray.100'}>
          {unit}
        </Typography>
      )}
    </Stack>
  );
};
