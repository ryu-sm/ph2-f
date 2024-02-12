import { Fragment, useCallback, useMemo, useState } from 'react';
import { useField } from 'formik';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { Icons } from '@/assets';

export const ApPwdInputField = ({ placeholder, showPwdPower, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;
  const [showPwd, setShowPwd] = useState(false);

  const isError = useMemo(() => meta.touched && !!meta.error, [meta.touched, meta.error]);
  const isSuccess = useMemo(() => !isError && !!meta.value && meta.value !== '', [isError, meta.value]);
  const isLengthValid = useMemo(() => meta.value?.length >= 8 && meta.value?.length <= 20, [meta.value]);
  const isContentValid = useMemo(() => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/.test(meta.value), [meta.value]);

  const handelBlue = useCallback(
    (e) => {
      field.onBlur(e);
      props.onBlur && props.onBlur(e);
    },
    [field, props]
  );

  const handleFocus = useCallback(
    (e) => {
      props.onFocus && props.onFocus(e);
      setTouched(false);
    },
    [props, setTouched]
  );

  const handleChange = useCallback(
    (e) => {
      field.onChange(e);
      props.onChange && props.onChange(e);
      setValue(e.target.value);
    },
    [field, props]
  );

  return (
    <Fragment>
      <Stack spacing={'2px'}>
        <Box sx={{ display: 'inline-block', position: 'relative' }}>
          <TextField
            {...field}
            fullWidth
            type={showPwd ? 'text' : 'password'}
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
          {showPwd ? (
            <Icons.ApViewOn
              sx={{
                top: 16,
                right: 8,
                width: 18,
                height: 16,
                position: 'absolute',
                color: (theme) => (isError ? theme.palette.secondary.main : theme.palette.primary.main),
              }}
              onClick={() => setShowPwd(false)}
            />
          ) : (
            <Icons.ApViewOff
              sx={{
                top: 16,
                right: 8,
                width: 18,
                height: 16,
                position: 'absolute',
                color: (theme) => (isError ? theme.palette.secondary.main : theme.palette.primary.main),
              }}
              onClick={() => setShowPwd(true)}
            />
          )}
        </Box>

        {isError && (
          <Typography variant="note" sx={{ fontWeight: 500, color: (theme) => theme.palette.secondary.main }}>
            ※{meta.error}
          </Typography>
        )}

        {showPwdPower && (
          <Box py={'6px'}>
            <Stack spacing={2}>
              <Typography variant="note" sx={{ color: (theme) => theme.palette.text.main }}>
                パスワードの条件
              </Typography>
              <Stack spacing={1} direction={'row'} alignItems={'center'}>
                {isLengthValid ? <Icons.ApCheckPwdCheckedIcon /> : <Icons.ApCheckPwdIcon />}
                <Typography
                  variant="note"
                  sx={{
                    color: (theme) =>
                      !!meta.value && !isLengthValid ? theme.palette.secondary.main : theme.palette.text.main,
                  }}
                >
                  8文字以上20文字以下
                </Typography>
              </Stack>
              <Stack spacing={1} direction={'row'} alignItems={'center'}>
                {isContentValid ? <Icons.ApCheckPwdCheckedIcon /> : <Icons.ApCheckPwdIcon />}
                <Typography
                  variant="note"
                  sx={{
                    color: (theme) =>
                      !!meta.value && !isLengthValid ? theme.palette.secondary.main : theme.palette.text.main,
                  }}
                >
                  大文字英字・小文字英字・数字の3種混在
                </Typography>
              </Stack>
            </Stack>
          </Box>
        )}
      </Stack>
    </Fragment>
  );
};
