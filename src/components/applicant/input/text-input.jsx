import { useCallback, useMemo, useState } from 'react';
import { useField } from 'formik';
import { Stack, TextField, Typography } from '@mui/material';

import { toKatakana } from 'wanakana';
import { convertToFullWidth } from '@/utils';

export const ApTextInputField = ({
  placeholder,
  align,
  convertFullWidth,
  convertKatakana,
  label,
  autoTrim = true,
  sx,
  multiline = false,
  maxRows = 1,
  handleChangeInit,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;

  const isError = useMemo(() => meta.touched && !!meta.error, [meta.touched, meta.error]);
  const isSuccess = useMemo(() => !isError && !!meta.value && meta.value !== '', [isError, meta.value]);
  const [oldValue, setOldValue] = useState(meta.value);

  const handelBlue = useCallback(
    async (e) => {
      field.onBlur(e);
      props.onBlur && props.onBlur(e);
      let value = autoTrim ? e.target.value?.toString().trim() : e.target.value?.toString();
      if (value !== oldValue) {
        handleChangeInit && handleChangeInit();
      }
      if (convertKatakana) {
        value = toKatakana(value);
      }
      if (convertFullWidth) {
        value = convertToFullWidth(value);
      }

      await setValue(value);
    },
    [field, props]
  );

  const handleFocus = useCallback(
    async (e) => {
      setOldValue(meta.value);
      props.onFocus && props.onFocus(e);
      await setTouched(false);
    },
    [props, setTouched]
  );

  const handleChange = useCallback(
    async (e) => {
      field.onChange(e);
      props.onChange && props.onChange(e);
      await setValue(e.target.value);
    },
    [field, props, setValue]
  );

  const handleKeydown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      props.onKeyDown && props.onKeyDown();
    }
  };

  return (
    <Stack spacing={1}>
      {label && (
        <Typography variant="label" color={'text.main'} lineHeight={'130%'}>
          {label}
        </Typography>
      )}
      <Stack spacing={'2px'}>
        <TextField
          {...field}
          autoComplete="off"
          placeholder={placeholder}
          value={meta.value}
          error={isError}
          multiline={multiline}
          maxRows={maxRows}
          sx={{
            '& .MuiInputBase-input': { textAlign: align || 'left' },
            '&&&& fieldset': { border: '1px solid', borderColor: 'primary.40' },
            ...sx,
            ...(isSuccess && {
              '.MuiInputBase-input': { backgroundColor: (theme) => theme.palette.gray[100], boxShadow: 'none' },
              '&&&& fieldset': { border: 'none' },
            }),
          }}
          onBlur={handelBlue}
          onFocus={handleFocus}
          onChange={handleChange}
          onKeyDown={handleKeydown}
        />
        {isError && (
          <Typography variant="note" sx={{ fontWeight: 500, color: (theme) => theme.palette.secondary.main }}>
            ※{meta.error}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
