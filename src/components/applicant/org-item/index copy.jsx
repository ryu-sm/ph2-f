import { useField, useFormikContext } from 'formik';
import { useCallback, useMemo, useRef, useState } from 'react';
import { MenuItem, Select, Stack, Typography } from '@mui/material';
import { Icons } from '@/assets';

export const ApOrgItem = ({
  inputName,
  inputValue,
  selectName,
  selectValue,
  options,
  disableOptions = [],
  placeholder,
  unit,
  width,
  iconSx,
  label,
  justifyContent,
  showError = true,
  handleChangeInit,
  sx,
  ...props
}) => {
  const formik = useFormikContext();

  const handelBlue = useCallback(
    (e) => {
      props.onBlur && props.onBlur(e);
    },
    [props]
  );

  const handleFocus = useCallback(
    async (e) => {
      props.onFocus && props.onFocus(e);

      formik.setFieldTouched(selectName, false);
    },
    [props, formik.setFieldTouched]
  );

  const handleChange = useCallback(
    async (e, child) => {
      props.onChange && props.onChange(e, child);
      formik.setFieldValue(selectName, e.target.value);
    },
    [props, formik.setFieldValue]
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
      !!selectValue
        ? () => {
            const selectedOption = options.find((option) => option.value === selectValue);
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
    [selectValue, placeholder]
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
            value={selectValue}
            {...props}
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
              ...sx,
            }}
            displayEmpty
            onBlur={handelBlue}
            onFocus={handleFocus}
            onChange={handleChange}
            IconComponent={renderIconComponent}
            renderValue={props?.renderValue || renderValue}
          >
            <Stack>{inputValue}</Stack>
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
        </Stack>
      </Stack>
    </Stack>
  );
};
