import { convertToHalfWidth } from '@/utils';
import { Stack, Typography } from '@mui/material';
import { useField } from 'formik';
import { useCallback } from 'react';
import { NumericFormat } from 'react-number-format';
import AutosizeInput from 'react-input-autosize';

import './autosize-style.css';
import { useRef } from 'react';

export const AdAreaInput = ({ unit, maxLength, width, ml, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;

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
      await setTouched(true);
    },
    [field, props]
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
      sx={{ ml: ml || -10 }}
    >
      <Stack direction={'row'} alignItems={'center'} sx={{ width: 1, py: 1, pl: '36px' }} onClick={handleAutoFocus}>
        <NumericFormat
          customInput={AutosizeInput}
          thousandSeparator
          decimalScale={2}
          getInputRef={inputRef}
          inputClassName="custom-input-style"
          type="tel"
          name={field.name}
          value={meta.value}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^\d|^\.]+/g, '');
            return e;
          }}
          onCompositionUpdate={async (e) => {
            e.target.value = convertToHalfWidth(e.target.value) + convertToHalfWidth(e.nativeEvent.data);
            return e;
          }}
          isAllowed={(values) => +values.value <= 9999999.99}
          onBlur={handelBlue}
          onFocus={() => setTouched(false)}
          onValueChange={async (values) => handleChange(values.value)}
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
