import { convertToFullWidth, convertToHalfWidth } from '@/utils';
import { Stack, TextField, Typography } from '@mui/material';
import { useField } from 'formik';
import { useCallback } from 'react';
import { NumericFormat } from 'react-number-format';

export const AdNumericInput = ({ unit = '万円', maxLength, width, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  const handelBlue = useCallback(
    async (e) => {
      field.onBlur(e);
      props.onBlur && props.onBlur(e);
    },
    [field, props]
  );

  const handleChange = useCallback(
    async (e) => {
      e.target.value = e.target.value.replaceAll(',', '');
      props.onChange && props.onChange(e);
    },
    [field, props, setValue]
  );

  return (
    <NumericFormat
      {...field}
      {...props}
      customInput={TextField}
      thousandSeparator
      autoComplete="off"
      suffix={meta.value ? ' 万円' : ''}
      type="tel"
      multiline={true}
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
      onInput={(e) => {
        e.target.value = convertToHalfWidth(e.target.value);
        e.target.value = e.target.value.substring(0, maxLength);
        return e;
      }}
      value={meta.value}
      onChange={handleChange}
      onBlur={handelBlue}
      onValueChange={async (values) => await setValue(values.value)}
    />
  );
};
