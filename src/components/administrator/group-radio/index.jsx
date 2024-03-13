import { Icons } from '@/assets';
import { FormControl, FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { useField } from 'formik';
import { useCallback } from 'react';

export const AdGroupRadio = ({ options, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  const handleChange = useCallback(
    async (e) => {
      field.onChange(e);
      props.onChange && props.onChange(e);
      await setValue(e.target.value);
    },
    [field, props, setValue]
  );
  return (
    <Stack ml={8}>
      <FormControl>
        <RadioGroup {...field} value={meta.value} onChange={handleChange}>
          {options.map(({ label, value }) => (
            <FormControlLabel
              key={label}
              value={value}
              control={
                <Radio
                  size="small"
                  icon={<Icons.AdPulldownCheckIcon sx={{ width: 16, height: 16 }} />}
                  checkedIcon={<Icons.AdPulldownCheckedIcon sx={{ width: 16, height: 16 }} />}
                />
              }
              label={<Typography variant="files_subtitle">{label}</Typography>}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Stack>
  );
};
