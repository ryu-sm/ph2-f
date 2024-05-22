import { convertToHalfWidth } from '@/utils';
import { Stack, Typography } from '@mui/material';
import { useField } from 'formik';
import { useCallback } from 'react';
import InputMask from 'react-input-mask';
import { styled } from '@mui/system';

const PatternFormatStyled = styled(InputMask)(({ theme }) => ({
  minHeight: 24,
  paddingLeft: 5,
  paddingRight: 0,
  minWidth: 12,
  wordBreak: 'break-all',
  border: 'none',
  letterSpacing: '1px',
  ...theme.typography.edit_content,
  textAlign: 'left',
  maxWidth: 130,
  '&:disabled': {
    backgroundColor: 'transparent',
  },
}));

export const AdYmdInput = ({ width, ml, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;
  const handelBlue = useCallback(
    (e) => {
      setTouched(true);
    },
    [field, props]
  );

  const handleChange = useCallback(
    (e) => {
      const newValue = e.target.value.replace('年', '/').replace('月', '/').replace('日', '');
      setValue(newValue === '____/__/__' ? '' : newValue);
    },
    [field, props, setValue]
  );

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      flex={1}
      spacing={2}
      sx={{ ml: ml || -10 }}
    >
      <Stack direction={'row'} alignItems={'center'} sx={{ width: 1, py: 1, pl: '36px' }}>
        <PatternFormatStyled
          name={field.name}
          alwaysShowMask
          mask="9999年99月99日"
          maskChar="_"
          value={meta.value}
          onChange={handleChange}
          onBlur={handelBlue}
          onFocus={() => setTouched(false)}
        />
      </Stack>
      {meta.touched && meta.error && (
        <Stack direction={'row'} alignItems={'center'} justifyContent={'end'} minWidth={350}>
          <Typography variant="edit_content" textAlign={'start'} color={'secondary.main'}>
            {meta.error}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};
