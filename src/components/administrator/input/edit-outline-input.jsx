import { convertToFullWidth, convertToHalfWidth } from '@/utils';
import { Stack, TextField } from '@mui/material';
import { useField } from 'formik';
import { useCallback } from 'react';
import AutosizeInput from 'react-input-autosize';

export const AdEditOutLineInput = ({ width, convertFullWidth, convertHalfWidth, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setError } = helpers;

  const handelBlue = useCallback(
    async (e) => {
      field.onBlur(e);
      props.onBlur && props.onBlur(e);
      let value = e.target.value?.toString().trim();

      if (convertHalfWidth) {
        value = convertToHalfWidth(value);
      }
      if (convertFullWidth) {
        value = convertToFullWidth(value);
      }

      await setValue(value);
    },
    [field, props]
  );

  const handleChange = useCallback(
    async (e) => {
      field.onChange(e);
      props.onChange && props.onChange(e);
      await setValue(e.target.value);
    },
    [field, props, setValue]
  );

  return (
    <Stack direction={'row'} sx={{ width: width, pl: 3 }}>
      <AutosizeInput
        inputClassName={'custom-input-border-style'}
        name={field.name}
        value={meta.value}
        onChange={handleChange}
        onBlur={handelBlue}
        onFocus={() => setError('')}
      />
    </Stack>
  );
};
