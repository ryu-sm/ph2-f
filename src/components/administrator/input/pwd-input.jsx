import { Icons } from '@/assets';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { useField } from 'formik';
import { useCallback, useMemo, useState } from 'react';

export const AdPwdInput = ({ placeholder, showPwdVerify, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setTouched } = helpers;

  const handleFocus = useCallback(() => setTouched(false), [setTouched]);
  const isError = useMemo(() => meta.touched && !!meta.error, [meta.touched, meta.error]);
  const isLengthValid = useMemo(() => meta.value?.length >= 8 && meta.value?.length <= 20, [meta.value]);
  const isContentValid = useMemo(() => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/.test(meta.value), [meta.value]);
  const [showPwd, setShowPwd] = useState(false);

  return (
    <Stack mt={2} width="100%">
      <Box sx={{ display: 'inline-block', position: 'relative' }}>
        <TextField
          fullWidth
          variant="standard"
          sx={{
            height: 44,
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

            ...(isError && {
              '.MuiInputBase-input': {
                backgroundColor: 'secondary.20',
                color: 'secondary.main',
                fontFamily: 'Noto Sans JP',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: 16,
                lineHeight: '34px',
                p: '0px 15px',
                boxShadow: 'none',
                height: '44px',
              },
              '.MuiInput-underline:before': {
                borderBottom: '1px solid',
                color: 'secondary.main',
              },
              '.MuiInput-underline:after': {
                borderBottom: '1px solid',
                color: 'secondary.main',
              },
              '.MuiInput-underline:hover:not(.Mui-disabled):before': {
                borderBottom: '1px solid',
                borderColor: 'red',
              },
            }),
          }}
          type={showPwd ? 'text' : 'password'}
          autoComplete="off"
          placeholder={placeholder}
          value={meta.value}
          error={isError}
          onChange={field.onChange}
          onBlur={field.onBlur}
          onFocus={handleFocus}
          {...field}
        />
        {showPwd ? (
          <Icons.AdViewOn
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
          <Icons.AdViewOff
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
        <Typography variant="login_valid_error" marginTop={4}>
          ※{meta.error}
        </Typography>
      )}
      {showPwdVerify && (
        <Box my={'15px'}>
          <Stack spacing={3}>
            <Typography variant="reset_pwd_note">パスワードの条件</Typography>
            <Stack spacing={1} direction={'row'} alignItems={'center'}>
              {isLengthValid ? <Icons.ApCheckPwdCheckedIcon /> : <Icons.ApCheckPwdIcon />}
              <Typography variant="reset_pwd_note">8文字以上20文字以下</Typography>
            </Stack>
            <Stack spacing={1} direction={'row'} alignItems={'center'}>
              {isContentValid ? <Icons.ApCheckPwdCheckedIcon /> : <Icons.ApCheckPwdIcon />}
              <Typography variant="reset_pwd_note">大文字英字・小文字英字・数字の3種混在</Typography>
            </Stack>
          </Stack>
        </Box>
      )}
    </Stack>
  );
};
