import { useField } from 'formik';
import { useCallback, useMemo, useRef } from 'react';
import { MenuItem, Select, Stack, Typography } from '@mui/material';
import { Icons } from '@/assets';

export const ApSelectField = ({
  options,
  disableOptions = [],
  placeholder,
  unit,
  width,
  iconSx,
  label,
  justifyContent,
  showError = true,
  sx,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;
  const currentValueRef = useRef('');
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
    async (e, child) => {
      currentValueRef.current = e.target.value;
      field.onChange(e);
      props.onChange && props.onChange(e, child);
      await setValue(e.target.value);
    },
    [field, props, setValue]
  );

  const renderIconComponent = useCallback(
    () => (
      <Icons.ApArrowDownIcon
        sx={{
          top: 'calc(50% - 12px)',
          right: 5,
          width: 24,
          height: 24,
          position: 'absolute',
          pointerEvents: 'none',
          color: 'primary.main',
          ...iconSx,
        }}
      />
    ),
    [Icons.ApArrowDownIcon, iconSx]
  );

  const renderValue = useMemo(
    () =>
      !!field.value
        ? () => {
            const selectedOption = options.find((option) => option.value === field.value);
            return (
              <Typography variant="unit" color="text.main">
                {selectedOption?.label}
              </Typography>
            );
          }
        : () => (
            <Typography variant="unit" sx={{ color: 'placeholder' }}>
              {placeholder}
            </Typography>
          ),
    [field.value, placeholder]
  );
  return (
    <Stack spacing={1}>
      {label && (
        <Typography variant="label" color={'text.main'}>
          {label}
        </Typography>
      )}
      <Stack spacing={'2px'}>
        <Stack spacing={1} direction={'row'} alignItems={'center'}>
          <Select
            error={showError && isError}
            {...props}
            {...field}
            sx={{
              width: width || 'auto',
              height: 48,
              minHeight: 16,
              '& .MuiSelect-select': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: justifyContent || 'center',
                pt: '12px',
              },
              '& .MuiInputBase-input': {
                fontFamily: 'Hiragino Sans',
                fontWeight: 300,
                fontSize: 16,
                lineHeight: '100%',
                letterSpacing: 0.6,
                color: 'text.main',
                p: 3,
                '&:focus': {
                  backgroundColor: 'background.focus',
                  boxShadow: '0px 0px 15px rgba(60, 72, 196, 0.1)',
                },
              },
              '&&&& fieldset': {
                border: '1px solid',
                borderColor: 'primary.40',
                boxShadow: 'inset 0px 4px 6px rgba(44, 54, 156, 0.1)',
              },

              '&&&&.Mui-error': {
                '.MuiInputBase-input': {
                  color: 'secondary.main',
                  backgroundColor: 'secondary.20',
                },
                fieldset: {
                  border: '1px solid',
                  borderColor: 'secondary.main',
                },
              },
              ...(isSuccess && {
                '& .MuiInputBase-input': {
                  fontFamily: 'Hiragino Sans',
                  fontWeight: 300,
                  fontSize: 16,
                  lineHeight: '100%',
                  letterSpacing: 0.6,
                  color: 'text.main',
                  p: 3,
                  backgroundColor: 'gray.100',
                  '&:focus': {
                    backgroundColor: 'background.focus',
                    boxShadow: '0px 0px 15px rgba(60, 72, 196, 0.1)',
                    border: '1px solid',
                    borderColor: 'primary.main',
                  },
                },
                '&&&& fieldset': {
                  border: 'none',
                  boxShadow: 'none',
                },
              }),
              ...sx,
            }}
            displayEmpty
            onBlur={handelBlue}
            onFocus={handleFocus}
            onChange={handleChange}
            onClose={() => {
              props?.onClose && props.onClose(currentValueRef.current);
            }}
            IconComponent={renderIconComponent}
            renderValue={props?.renderValue || renderValue}
          >
            {options.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                className={option.className}
                disabled={!!disableOptions.find((item) => item.value === option.value)}
              >
                <Typography
                  sx={{
                    fontFamily: 'Hiragino Sans',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: 24,
                    lineHeight: '130%',
                    letterSpacing: 0.4,
                    '@media (max-width:480px)': {
                      fontSize: 16,
                      lineHeight: '24px',
                    },
                    color: 'text.normal',
                  }}
                >
                  {option.label}
                </Typography>
              </MenuItem>
            ))}
          </Select>
          {!!unit && (
            <Typography variant="unit" sx={{ color: (theme) => theme.palette.text.main }}>
              {unit}
            </Typography>
          )}
        </Stack>
        {showError && isError && (
          <Typography variant="note" sx={{ fontWeight: 500, color: (theme) => theme.palette.secondary.main }}>
            ※{meta.error}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
