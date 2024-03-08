import { AdArrowDown } from '@/assets/icons/ad-arrow-down';
import { useTheme } from '@emotion/react';
import { Box, MenuItem, Select, Typography, alpha } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
export const FilterSelect = ({ isDate, options }) => {
  const [value, setValue] = useState();
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const theme = useTheme();
  const renderIconComponent = () => (
    <AdArrowDown
      sx={{
        width: 10,
        height: 10,
        position: 'absolute',
        right: 5,
        top: 'calc(50% - 8px)',
        pointerEvents: 'none',
      }}
    />
  );

  const renderValue = (selectedValue) => {
    const selectedOption = options.find((option) => option.value === selectedValue);
    return (
      <Typography
        sx={{
          fontFamily: 'Hiragino Sans',
          fontSize: '16px',
          fontWeight: 300,
          lineHeight: '16px',
          letterSpacing: '0.6px',
        }}
      >
        {selectedOption ? selectedOption.label : ''}
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
        variant="standard"
        displayEmpty
        onChange={(e) => setValue(e.target.value)}
        sx={{
          height: 30,
          width: isDate ? 62 : 100,
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
                minHeight: '48px',
                fontFamily: 'Hiragino Sans',
                fontStyle: 'normal',
                fontWeight: 600,
                fontSize: 24,
                lineHeight: '130%',
                letterSpacing: 0.4,
                color: 'text.normal',
                '&:hover': {
                  bgcolor: 'gray.40',
                },
              }}
            >
              {option.label}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

FilterSelect.propTypes = {
  isDate: PropTypes.bool,
  options: PropTypes.array,
};
