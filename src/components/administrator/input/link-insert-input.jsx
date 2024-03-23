import { Stack, TextField, Typography } from '@mui/material';
import { useField } from 'formik';
import { useMemo } from 'react';

export const AdLinkInsertInput = ({ placeholder, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  const isError = useMemo(() => meta.touched && !!meta.error, [meta.touched, meta.error]);
  const isSuccess = useMemo(() => meta.touched && !isError && meta.value !== '', [isError, meta.value, meta.touched]);
  return (
    <Stack spacing={1}>
      <TextField
        {...field}
        autoComplete="off"
        placeholder={placeholder}
        value={meta.value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        error={isError}
        sx={{
          '& .MuiInputBase-input': {
            textAlign: 'left',
            padding: 3,
            fontFamily: 'Hiragino Sans',
            fontWeight: 300,
            fontSize: '16px',
            lineHeight: '30px',
            letterSpacing: '0.4px',
            color: 'rgb(68, 68, 68)',
          },
          '&&&& fieldset': {
            border: '1px solid',
            borderColor: 'primary.40',
            boxShadow: 'inset 0px 4px 6px rgba(44, 54, 156, 0.1)',
          },
          '&&&& .Mui-focused': {
            '.MuiInputBase-input': {
              bgcolor: '#FFF9C5',
              color: '#333333',
            },
            fieldset: {
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
              boxShadow: 'inset 0px 4px 6px rgba(44, 54, 156, 0.1)',
            },
          },
          ...(isSuccess && {
            '.MuiInputBase-input': {
              backgroundColor: (theme) => theme.palette.gray[40],
              boxShadow: 'none',
              borderRadius: 1,
            },
            '&&&& fieldset': { border: 'none' },
          }),
          ...(isError && {
            '.MuiInputBase-input': {
              borderRadius: 1,
              color: (theme) => theme.palette.secondary.main,
            },
            '&&&& fieldset': {
              border: (theme) => `1px solid ${theme.palette.secondary.main}`,
              boxShadow: 'inset 0px 4px 6px rgba(44, 54, 156, 0.1)',
            },
          }),
        }}
      />
      {isError && (
        <Typography variant="reset_pwd_note" sx={{ color: (theme) => theme.palette.secondary.main }}>
          ※{meta.error}
        </Typography>
      )}
    </Stack>
  );
};
