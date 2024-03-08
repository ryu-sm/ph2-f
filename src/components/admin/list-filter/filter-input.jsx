import { convertToFullWidth } from '@/utils';
import { TextField } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';
export const FilterInput = ({ placeholder, handleHideOptions }) => {
  const [value, setValue] = useState('');
  const handleBlur = () => {
    setValue(convertToFullWidth(value).trim());
  };
  return (
    <TextField
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        handleHideOptions && handleHideOptions();
      }}
      onBlur={handleBlur}
      placeholder={placeholder}
      variant="standard"
      sx={{
        height: 44,
        width: '100%',
        '.MuiInputBase-input': {
          fontFamily: 'Noto Sans JP',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: 16,
          lineHeight: '34px',
          p: '0px 15px',
          boxShadow: 'none',
          height: '44px',
          color: 'gray.100',
        },
        '.MuiInput-underline:before': {
          borderBottom: '1px solid',
        },
        '.MuiInput-underline:after': {
          borderBottom: '1px solid',
        },
        '.MuiInput-underline:hover:not(.Mui-disabled):before': {
          borderBottom: '1px solid',
        },
      }}
    />
  );
};

FilterInput.propTypes = {
  placeholder: PropTypes.string,
  handleHideOptions: PropTypes.func,
};
