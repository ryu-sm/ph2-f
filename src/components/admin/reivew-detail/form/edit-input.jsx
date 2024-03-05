import { convertToFullWidth, convertToHalfWidth } from '@/utils';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
export const EditInput = ({ content, isMultiline, isFullWidth, isHalfWidth }) => {
  const [value, setValue] = useState(content);

  const handleBlur = () => {
    if (isFullWidth) {
      setValue(convertToFullWidth(value));
    }
    if (isHalfWidth) {
      setValue(convertToHalfWidth(value));
    }
  };
  return (
    <TextField
      multiline={isMultiline}
      sx={{
        paddingLeft: 2,
        width: isMultiline ? '100%' : 60,
        '& .MuiOutlinedInput-root': {
          padding: 0,
          '& fieldset': {
            border: 'none',
          },
          '&:hover fieldset': {
            border: 'none',
          },
          '&.Mui-focused fieldset': {
            border: '2px solid #1976d2',
          },
        },
        '& .MuiInputBase-input': {
          padding: '8px',
          fontFamily: 'Hiragino Sans',
          fontSize: '12px',
          fontWeight: 300,
          lineHeight: '18px',
          borderRadius: 4,
        },
      }}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
    />
  );
};

EditInput.propTypes = {
  content: PropTypes.string,
  isMultiline: PropTypes.bool,
  isHalfWidth: PropTypes.bool,
  isFullWidth: PropTypes.bool,
};
