import { Icons } from '@/assets';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { useField } from 'formik';
import { useCallback, useMemo, useState } from 'react';

export const AdFieldInput = ({ placeholder, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setTouched } = helpers;

  const handleFocus = useCallback(() => setTouched(false), [setTouched]);
  const isError = useMemo(() => meta.touched && !!meta.error, [meta.touched, meta.error]);

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
          type={'text'}
          autoComplete="off"
          placeholder={placeholder}
          value={meta.value}
          error={isError}
          onChange={field.onChange}
          onBlur={field.onBlur}
          onFocus={handleFocus}
          {...field}
        />
      </Box>
      {isError && (
        <Typography variant="login_valid_error" marginTop={4}>
          ※{meta.error}
        </Typography>
      )}
    </Stack>
  );
};
