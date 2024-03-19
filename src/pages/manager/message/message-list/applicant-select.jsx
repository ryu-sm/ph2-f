import { AdArrowDown } from '@/assets/icons/ad-arrow-down';
import { useTheme } from '@emotion/react';
import { Box, MenuItem, Select, Typography, alpha } from '@mui/material';
import { useField } from 'formik';
import PropTypes from 'prop-types';
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

  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const theme = useTheme();
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  const { value } = field;

  const isError = useMemo(() => meta.touched && !!meta.error, [meta.touched, meta.error]);
  const renderValue = (selectedValue) => {
    const selectedOption = options.find((option) => option.value === selectedValue);
    return value.length > 0 ? (
      <Typography padding={1} variant="message_select_render_value">
        {selectedOption.label}
      </Typography>
    ) : (
      <Typography padding={1} variant="message_select_placeholder">
        選択してください
      </Typography>
    );
  };
  return (
    <>
      {isSelectOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: alpha(theme.palette.primary[60], 0.7),
            zIndex: 999,
          }}
          onClick={() => setIsSelectOpen(false)}
        />
      )}
      <Select
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        renderValue={renderValue}
        displayEmpty
        sx={{
          textAlign: 'left',
          height: 48,
          bgcolor: 'gray.20',
          ...(value &&
            value.length > 0 && {
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
        className={value.length > 0 ? 'Mui-success' : ''}
        onOpen={() => setIsSelectOpen(true)}
        onClose={() => {
          setIsSelectOpen(false);
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              width: '500px',
            }}
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
              {option.label}
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

ApplicantSelect.propTypes = {
  options: PropTypes.array,
};
