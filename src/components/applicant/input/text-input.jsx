import { Stack, TextField, Typography } from '@mui/material';
import { useField } from 'formik';
import { useCallback, useMemo } from 'react';

import { convertToFullWidth } from '@/utils';
import PropTypes from 'prop-types';
import { toKatakana } from 'wanakana';

export const ApTextInputField = ({
  placeholder,
  align,
  convertFullWidth,
  convertKatakana,
  label,
  autoTrim = true,
  sx,
  multiline = false,
  maxRows = 5,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;

  const isError = useMemo(() => meta.touched && !!meta.error, [meta.touched, meta.error]);
  const isSuccess = useMemo(() => !isError && !!meta.value && meta.value !== '', [isError, meta.value]);

  const handelBlue = useCallback(
    async (e) => {
      field.onBlur(e);
      props.onBlur && props.onBlur(e);
      let value = autoTrim ? e.target.value?.toString().trim() : e.target.value?.toString();

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
      if (meta.value.trim()) {
        props.onKeyDown(meta.value);
      }
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

ApTextInputField.propTypes = {
  placeholder: PropTypes.string,
  align: PropTypes.string,
  convertFullWidth: PropTypes.bool,
  convertKatakana: PropTypes.bool,
  label: PropTypes.string,
  autoTrim: PropTypes.bool,
  sx: PropTypes.object,
  multiline: PropTypes.bool,
  maxRows: PropTypes.number,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
};
