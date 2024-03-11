import { AdArrowDown } from '@/assets/icons/ad-arrow-down';
import { useTheme } from '@emotion/react';
import { Box, MenuItem, Select, Stack, Typography, alpha } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
export const FilterSelect = ({ isDate, options, label, value, handleChange }) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const theme = useTheme();
  const renderIconComponent = () => (
    <AdArrowDown
      sx={{
        width: 10,
        height: 10,
        position: 'absolute',
        right: 3,
        top: 'calc(50% - 4px)',
        pointerEvents: 'none',
      }}
    />
  );

  const renderValue = (selectedValue) => {
    const selectedOption = options.find((option) => option.value === selectedValue);
    return value ? (
      <Typography padding={1} variant="filter_select_render_value">
        {label === '年' ? selectedOption.label.slice(0, 4) : selectedOption.label}
      </Typography>
    ) : (
      <Typography padding={1} variant="filter_select_placeHolder">
        ー
      </Typography>
    );
  };

  return (
    <Stack direction={'row'} alignItems={'flex-end'} spacing={'2px'}>
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
        variant="standard"
        displayEmpty
        onChange={handleChange}
        sx={{
          height: 30,
          width: isDate ? 64 : 100,
          '& .MuiSelect-select.MuiSelect-standard.MuiInputBase-input.MuiInput-input': {
            paddingRight: 0,
          },
        }}
        IconComponent={renderIconComponent}
        renderValue={renderValue}
        onOpen={() => setIsSelectOpen(true)}
        onClose={() => setIsSelectOpen(false)}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
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
      <Typography variant="fliter_select">{label}</Typography>
    </Stack>
  );
};

FilterSelect.propTypes = {
  isDate: PropTypes.bool,
  options: PropTypes.array,
  label: PropTypes.string,
  value: PropTypes.string || PropTypes.number,
  handleChange: PropTypes.func,
};
