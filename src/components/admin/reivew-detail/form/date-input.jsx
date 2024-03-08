import { useState } from 'react';
import InputMask from 'react-input-mask';
import { styled } from '@mui/system';

export const DateInput = () => {
  const [value, setValue] = useState('');
  const handleChange = (event) => {
    const newValue = event.target.value.replace('年', '/').replace('月', '/').replace('日', '');
    setValue(newValue);
  };

  return (
    <PatternFormatStyled value={value} alwaysShowMask mask="9999年99月99日" maskChar="_" onChange={handleChange} />
  );
};

const PatternFormatStyled = styled(InputMask)(({ theme }) => ({
  minHeight: 24,
  marginLeft: -5,
  paddingLeft: 5,
  paddingRight: 0,
  minWidth: 12,
  wordBreak: 'break-all',
  border: 'none',
  letterSpacing: '1px',
  ...theme.typography.edit_content,
  textAlign: 'left',
  maxWidth: 400,
  '&:disabled': {
    backgroundColor: 'transparent',
  },
}));
