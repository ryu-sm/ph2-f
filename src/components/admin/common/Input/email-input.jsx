import { Stack, TextField, Typography } from '@mui/material';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';
export const AdEmailInput = ({ placeholder, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setTouched } = helpers;

  const isError = useMemo(() => meta.touched && !!meta.error, [meta.touched, meta.error]);
  const handleFocus = useCallback(() => setTouched(false), [setTouched]);

  return (
    <Stack width={'100%'} mt={2}>
      <TextField
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        onFocus={handleFocus}
        placeholder={placeholder}
        variant="standard"
        error={isError}
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
        {...field}
      />
      {isError && (
        <Typography variant="login_valid_error" marginTop={4}>
          ※{meta.error}
        </Typography>
      )}
    </Stack>
  );
};

AdEmailInput.propTypes = {
  placeholder: PropTypes.string,
  isPassword: PropTypes.bool,
};
