import { useCallback, useMemo } from 'react';
import { useField } from 'formik';
import { Stack, TextField, Typography } from '@mui/material';

export const ApEmailInputField = ({ placeholder, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;

  const isError = useMemo(() => meta.touched && !!meta.error, [meta.touched, meta.error]);
  const isSuccess = useMemo(() => !isError && !!meta.value && meta.value !== '', [isError, meta.value]);

  const handelBlue = useCallback(
    (e) => {
      field.onBlur(e);
      props.onBlur && props.onBlur(e);
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

  return (
    <Stack spacing={'2px'}>
      <TextField
        {...field}
        autoComplete="off"
        placeholder={placeholder}
        value={meta.value}
        error={isError}
        sx={{
          ...(isSuccess && {
            '.MuiInputBase-input': { backgroundColor: (theme) => theme.palette.gray[100], boxShadow: 'none' },
            '&&&& fieldset': { border: 'none' },
          }),
        }}
        onBlur={handelBlue}
        onFocus={handleFocus}
        onChange={handleChange}
      />
      {isError && (
        <Typography variant="note" sx={{ fontWeight: 500, color: (theme) => theme.palette.secondary.main }}>
          ※{meta.error}
        </Typography>
      )}
    </Stack>
  );
};
