import { convertToFullWidth, convertToHalfWidth } from '@/utils';
import { Stack, TextField, Typography } from '@mui/material';
import { useField } from 'formik';
import { useCallback, useEffect } from 'react';
import { NumericFormat } from 'react-number-format';
import AutosizeInput from 'react-input-autosize';
import './autosize-style.css';
import { useRef } from 'react';

export const AdNumericInput = ({ unit, maxLength, width, defaultZero, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setError, setTouched } = helpers;

  const inputRef = useRef(null);

  const handleAutoFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handelBlue = useCallback(
    async (e) => {
      props.onBlur && props.onBlur(e);
      if (defaultZero) {
        if (e.target.value === '') {
          await setValue('0');
        }
      }
      await setTouched(true);
    },
    [field, props, setValue]
  );

  const handleChange = useCallback(
    async (e) => {
      props.onChange && props.onChange(e.target.value.replaceAll(',', ''));
      setValue(e.target.value.replaceAll(',', ''));
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
          autoComplete="off"
          type="tel"
          inputMode="tel"
          inputClassName="custom-input-style"
          name={field.name}
          value={meta.value}
          onInput={(e) => {
            e.target.value = e.target.value.replaceAll(',', '');
            e.target.value = e.target.value.replace(/[^\d]+/g, '');
            e.target.value = e.target.value.substring(0, maxLength);
            return e;
          }}
          onCompositionUpdate={async (e) => {
            e.target.value =
              convertToHalfWidth(e.target.value).replaceAll(',', '') +
              convertToHalfWidth(e.nativeEvent.data).replace(/[^\d]+/g, '');
            return e;
          }}
          onBlur={handelBlue}
          onFocus={() => {
            setError('');
          }}
          onChange={handleChange}
        />
        {unit && meta.value && (
          <Typography variant="edit_content" whiteSpace={'nowrap'} color={'gray.100'}>
            {unit}
          </Typography>
        )}
      </Stack>
      {meta.touched && meta.error && (
        <Stack direction={'row'} alignItems={'center'} justifyContent={'end'} minWidth={350}>
          <Typography variant="edit_content" textAlign={'start'} color={'secondary.main'}>
            {meta.error}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};
