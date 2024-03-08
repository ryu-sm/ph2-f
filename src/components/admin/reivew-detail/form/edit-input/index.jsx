import { convertToFullWidth, convertToHalfWidth } from '@/utils';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import PropTypes from 'prop-types';
import { useState } from 'react';
import AutosizeInput from 'react-18-input-autosize';
import './style.css';
export const EditInput = ({ content, isFullWidth, isHalfWidth, isMultiline }) => {
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
    <>
      {isMultiline ? (
        <TextareaAutosize
          onBlur={handleBlur}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{
            border: 'none',
            overflow: 'hidden',
            resize: 'none',
            width: '100%',
            height: 26,
            padding: 4,
            fontFamily: 'Hiragino Sans',
            fontSize: 12,
            fontWeight: '300',
            color: '#333333',
            backgroundColor: 'transparent',
          }}
        />
      ) : (
        <AutosizeInput
          inputClassName="custom-input-style"
          handleBlur={handleBlur}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
    </>
  );
};

EditInput.propTypes = {
  content: PropTypes.string,
  isMultiline: PropTypes.bool,
  isHalfWidth: PropTypes.bool,
  isFullWidth: PropTypes.bool,
};
