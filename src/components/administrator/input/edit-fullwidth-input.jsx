import { convertToFullWidth, convertToHalfWidth } from '@/utils';
import { Stack, TextField, Typography } from '@mui/material';
import { useField } from 'formik';
import { useCallback } from 'react';
import { useRef } from 'react';

export const AdEditFullWidthInput = ({ convertFullWidth, convertHalfWidth, autoTrim = true, ml, ...props }) => {
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
      let value = autoTrim ? e.target.value?.toString().trim() : e.target.value?.toString();

      if (convertHalfWidth) {
        value = convertToHalfWidth(value);
      }
      if (convertFullWidth) {
        value = convertToFullWidth(value);
      }
      await setTouched(true);
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
      justifyContent={'space-between'}
      flex={1}
      spacing={2}
      sx={{ ml: ml || -10 }}
    >
      <Stack direction={'row'} alignItems={'center'} sx={{ width: 1, py: 1, pl: '36px' }} onClick={handleAutoFocus}>
        <TextField
          fullWidth
          ref={inputRef}
          sx={{
            '.MuiInputBase-input': {
              minHeight: 16,
              height: 26,
              p: 0,
              pl: 1,
              fontFamily: 'Noto Sans JP',
              fontSize: 12,
              fontWeight: 300,
              lineHeight: '26px',
              fontStyle: 'normal',
              letterSpacing: 0.4,
              color: '#333333',
            },
            '.MuiFormHelperText-root': {
              display: 'none',
            },
            '&&&& .Mui-focused': {
              fieldset: { border: '2px solid #0160CC' },
            },
            '&&&& fieldset': {
              border: `none`,
            },
          }}
          name={field.name}
          value={meta.value}
          onChange={handleChange}
          onBlur={handelBlue}
          onFocus={() => setTouched(false)}
        />
      </Stack>
      {meta.touched && meta.error && (
        <Stack direction={'row'} alignItems={'center'} justifyContent={'end'} minWidth={320}>
          <Typography variant="edit_content" textAlign={'start'} color={'secondary.main'}>
            {meta.error}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};
