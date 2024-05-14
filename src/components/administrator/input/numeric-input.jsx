import { convertToFullWidth, convertToHalfWidth } from '@/utils';
import { Stack, TextField, Typography } from '@mui/material';
import { useField } from 'formik';
import { useCallback } from 'react';
import { NumericFormat } from 'react-number-format';
import AutosizeInput from 'react-input-autosize';
import './autosize-style.css';
import { useRef } from 'react';

export const AdNumericInput = ({ unit, maxLength, width, defaultZero, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setError } = helpers;

  const inputRef = useRef(null);

  const handleAutoFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handelBlue = useCallback(
    async (e) => {
      field.onBlur(e);
      props.onBlur && props.onBlur(e);
      if (defaultZero) {
        if (e.target.value === '') {
          await setValue('0');
        }
      }
    },
    [field, props, setValue]
  );

  const handleChange = useCallback(
    async (value) => {
      props.onChange && props.onChange(value);
      await setValue(value);
    },
    [field, props, setValue]
  );

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      flex={1}
      spacing={2}
      sx={{ ml: -10 }}
    >
      <Stack direction={'row'} alignItems={'center'} sx={{ width: 1, py: 1, pl: '36px' }} onClick={handleAutoFocus}>
        <NumericFormat
          customInput={AutosizeInput}
          thousandSeparator
          getInputRef={inputRef}
          inputClassName="custom-input-style"
          name={field.name}
          value={meta.value}
          // onInput={(e) => {
          //   e.target.value = convertToHalfWidth(e.target.value);
          //   e.target.value = e.target.value.replace(/[^\d]+/g, '');
          //   e.target.value = e.target.value.substring(0, maxLength);
          //   return e;
          // }}
          maxLength={maxLength}
          onBlur={handelBlue}
          onFocus={() => setError('')}
          onValueChange={async (values) => handleChange(values.value)}
        />
        {unit && meta.value && (
          <Typography variant="edit_content" whiteSpace={'nowrap'} color={'gray.100'}>
            {unit}
          </Typography>
        )}
      </Stack>
      {meta.touched && meta.error && (
        <Stack direction={'row'} alignItems={'center'} justifyContent={'end'} minWidth={320}>
          <Typography variant="edit_content" textAlign={'start'} color={'secondary.main'}>
            {meta.error}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};
