import { convertToFullWidth, convertToHalfWidth } from '@/utils';
import { Stack, TextField, Typography } from '@mui/material';
import { useField } from 'formik';
import { useCallback } from 'react';
import AutosizeInput from 'react-input-autosize';
import './autosize-style.css';
import { useRef } from 'react';

export const AdEditInput = ({ convertFullWidth, convertHalfWidth, showBorder, autoTrim = true, ml, ...props }) => {
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
    },
    [field, props, setValue]
  );

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      sx={{ width: 1, py: 1, pl: '36px', ml: ml || -10 }}
      onClick={handleAutoFocus}
    >
      <AutosizeInput
        ref={inputRef}
        inputClassName={showBorder ? 'custom-input-border-style' : 'custom-input-style'}
        name={field.name}
        value={meta.value}
        onChange={handleChange}
        onBlur={handelBlue}
        onFocus={() => setError('')}
      />
    </Stack>
  );
};
