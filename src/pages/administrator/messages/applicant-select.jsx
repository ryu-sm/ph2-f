import { AdArrowDown } from '@/assets/icons/ad-arrow-down';
import { useTheme } from '@emotion/react';
import { Box, MenuItem, Modal, Select, Typography, alpha } from '@mui/material';
import { useField } from 'formik';
import { useMemo, useState } from 'react';

export const ApplicantSelect = ({ options, ...props }) => {
  const renderIconComponent = () => (
    <AdArrowDown
      sx={{
        width: 10,
        height: 10,
        position: 'absolute',
        right: 15,
        top: 'calc(50% - 4px)',
        pointerEvents: 'none',
      }}
    />
  );

  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  const isError = useMemo(() => meta.touched && !!meta.error, [meta.touched, meta.error]);

  const renderValue = (selectedValue) => {
    const selectedOption = options.find((option) => option.id === selectedValue);
    return meta.value.length > 0 ? (
      <Typography padding={1} variant="message_select_render_value">
        {selectedOption.name}
      </Typography>
    ) : (
      <Typography padding={1} variant="message_select_placeholder">
        選択してください
      </Typography>
    );
  };
  return (
    <>
      <Select
        name={field.name}
        value={meta.value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        renderValue={renderValue}
        displayEmpty
        sx={{
          textAlign: 'left',
          height: 48,
          bgcolor: 'gray.20',
          ...(meta.value &&
            meta.value.length > 0 && {
              fieldset: {
                border: 'none',
                borderRadius: 0,
                borderBottom: 1,
                borderColor: '#333333 !important',
              },
            }),
          '& .MuiTypography-placeHolder_style': {
            color: 'gray.70',
            fontWeight: 300,
            fontSize: 16,
          },

          '&&&& fieldset': {
            borderWidth: 1,
            borderColor: 'primary.50',
          },
          '&&&&& .MuiTypography-input_style': {
            fontSize: '13px',
            fontFamily: 'Noto Sans JP',
            fontWeight: 400,
            lineHeight: '19px',
            color: 'primary.main',
          },
        }}
        IconComponent={renderIconComponent}
        className={meta.value.length > 0 ? 'Mui-success' : ''}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            value={option?.id}
            sx={{
              width: '500px',
            }}
            onClick={() => setValue(option?.id)}
          >
            <Typography
              sx={{
                fontFamily: 'Hiragino Sans',
                fontStyle: 'normal',
                fontWeight: 600,
                fontSize: 24,
                letterSpacing: 0.4,
                color: 'text.normal',
              }}
            >
              {option.name}
            </Typography>
          </MenuItem>
        ))}
      </Select>
      {isError && (
        <Typography
          sx={{
            fontSize: 14,
          }}
          variant="message_select_error"
        >
          {meta.error}
        </Typography>
      )}
    </>
  );
};
