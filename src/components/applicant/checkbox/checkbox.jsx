import { useCallback } from 'react';
import { useField } from 'formik';
import { Icons } from '@/assets';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';

export const ApCheckox = ({ label, disabled, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;
  const handleChange = useCallback(
    async (e) => {
      field.onChange(e);
      props.onChange && props.onChange(e);
      await setValue(e.target.checked);
      await setTouched(true);
    },
    [field, meta, props, setValue]
  );
  console.log();
  return (
    <Box>
      <FormControlLabel
        control={
          <Checkbox
            {...field}
            disabled={disabled}
            value={meta.value}
            icon={<Icons.ApCheckboxIcon />}
            checkedIcon={<Icons.ApCheckboxCheckedIcon />}
            checked={!!meta.value}
            onChange={handleChange}
            sx={{ mx: label ? '10px' : 0 }}
          />
        }
        label={
          <Typography variant="radio_checkbox_button" sx={{ color: disabled ? 'primary.60' : 'primary.main' }}>
            {label}
          </Typography>
        }
        labelPlacement="end"
      />
    </Box>
  );
};
