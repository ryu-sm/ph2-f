import { useCallback, useMemo } from 'react';
import { useField } from 'formik';
import { Stack, TextField, Typography } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { convertToHalfWidth } from '@/utils';

export const ApNumberInputField = ({
  placeholder,
  label,
  unit,
  align,
  maxLength,
  width,
  autoTrim = true,
  sx,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;

  const isError = useMemo(() => meta.touched && !!meta.error, [meta.touched, meta.error]);
  const isSuccess = useMemo(() => !isError && !!meta.value && meta.value !== '', [isError, meta.value]);

  const handelBlue = useCallback(
    async (e) => {
      e.target.value = e.target.value.replaceAll(',', '');
      field.onBlur(e);
      props.onBlur && props.onBlur(e);
      let value = autoTrim ? e.target.value?.toString().trim() : e.target.value?.toString();
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
      e.target.value = e.target.value.replaceAll(',', '');
      props.onChange && props.onChange(e);
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
        <NumericFormat
          {...field}
          {...props}
          customInput={TextField}
          thousandSeparator
          autoComplete="off"
          placeholder={placeholder}
          value={meta.value}
          name={field.name}
          error={isError}
          sx={{
            '& .MuiInputBase-input': { textAlign: align || 'right', width: width || 1 },
            '&&&& fieldset': { border: '1px solid', borderColor: 'primary.40' },
            ...sx,
            ...(isSuccess && {
              '.MuiInputBase-input': { backgroundColor: (theme) => theme.palette.gray[100], boxShadow: 'none' },
              '&&&& fieldset': { border: 'none' },
            }),
          }}
          onInput={(e) => {
            e.target.value = convertToHalfWidth(e.target.value);
            e.target.value = e.target.value.substring(0, maxLength);
            e.target.value = e.target.value.replace(/^(0+)|[^\d ,]+/g, '');
            return e;
          }}
          onBlur={handelBlue}
          onFocus={handleFocus}
          onChange={handleChange}
          inputProps={{
            readOnly: props.readOnly,
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
