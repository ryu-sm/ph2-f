import { convertToHalfWidth } from '@/utils';
import { Stack, TextField, Typography } from '@mui/material';
import { useField } from 'formik';
import { useCallback, useMemo } from 'react';
import { NumberFormatInput } from '../number-format';
export const ApNumberInputField = ({
  placeholder,
  label,
  unit,
  align,
  maxLength,
  width,
  autoTrim = true,
  sx,
  thousandSeparator = true,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;

  const isError = useMemo(() => meta.touched && !!meta.error, [meta.touched, meta.error]);
  const isSuccess = useMemo(() => !isError && !!meta.value && meta.value !== '', [isError, meta.value]);

  const handleBlur = useCallback(
    async (e) => {
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
      props.onChange && props.onChange(e);
      setValue(e.target.value);
    },
    [field, props, setValue]
  );

  return (
    <Stack spacing={'2px'}>
      {label && (
        <Typography variant="label" color={'text.main'} lineHeight={'130%'}>
          {label}
        </Typography>
      )}
      <Stack spacing={2} direction={'row'} alignItems={'center'}>
        <TextField
          {...field}
          {...props}
          value={meta.value}
          autoComplete="off"
          name={field.name}
          error={isError}
          placeholder={placeholder}
          sx={{
            '& .MuiInputBase-input': {
              textAlign: align || 'right',
              width: width || 1,
            },
            '&&&& fieldset': { border: '1px solid', borderColor: 'primary.40' },
            ...sx,
            ...(isSuccess && {
              '.MuiInputBase-input': { backgroundColor: (theme) => theme.palette.gray[100], boxShadow: 'none' },
              '&&&& fieldset': { border: 'none' },
            }),
          }}
          InputProps={{
            inputComponent: NumberFormatInput,
            onBlur: handleBlur,
            onFocus: handleFocus,
            onChange: handleChange,
          }}
          inputProps={{
            inputMode: 'numeric',
          }}
          onInput={(e) => {
            e.target.value = convertToHalfWidth(e.target.value);
            e.target.value = e.target.value.replace(/[^\d]+/g, '');
            e.target.value = e.target.value.substring(0, maxLength);
            return e;
          }}
        />

        {typeof unit === 'string' ? (
          <Typography variant="unit" color={'text.main'} whiteSpace={'nowrap'}>
            {unit}
          </Typography>
        ) : (
          unit
        )}
      </Stack>

      {isError && (
        <Typography variant="note" sx={{ fontWeight: 500, color: (theme) => theme.palette.secondary.main }}>
          ※{meta.error}
        </Typography>
      )}
    </Stack>
  );
};
