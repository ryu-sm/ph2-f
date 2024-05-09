import { useCallback, useMemo } from 'react';
import { useField } from 'formik';
import { Box, Checkbox, FormControlLabel, Stack, Typography } from '@mui/material';
import { Icons } from '@/assets';

export const ApCheckboxButton = ({ options, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;
  const isError = useMemo(() => meta.touched && !!meta.error, [meta.touched, meta.error]);
  const handleChange = useCallback(
    async (e) => {
      field.onChange(e);
      props.onChange && props.onChange(e);
      const target = e.target.checked ? e.target.value : '0';
      await setValue(target);
      await setTouched(true);
    },
    [field, meta, props, setValue]
  );
  const calcBorderColor = useMemo(() => {
    if (meta.value !== '' && meta.value !== '0') return 'primary.main';
    if (meta.touched && !!meta.error) return 'secondary.main';
    return 'primary.40';
  }, [meta.touched, meta.error, meta.value]);

  return (
    <Stack spacing={'2px'}>
      <Stack
        justifyContent={'center'}
        spacing={'10px'}
        sx={{
          px: 3,
          width: 1,
          bgcolor: meta.value !== '' && meta.value !== '0' ? 'primary.40' : 'white',
          borderRadius: 3,
          boxShadow: '0 0 15px rgba(60, 72, 196, 0.1)',
          border: `1px solid`,
          borderColor: calcBorderColor,
        }}
      >
        <input name={field.name} type="hidden" />
        {options.map((option) => (
          <Box key={option.value} sx={{ height: 36 }}>
            <FormControlLabel
              {...field}
              onChange={handleChange}
              value={option.value}
              control={
                <Checkbox
                  checked={meta.value === option.value}
                  icon={<Icons.ApCheckboxIcon />}
                  checkedIcon={<Icons.ApCheckboxCheckedIcon />}
                  sx={{ mx: '10px' }}
                />
              }
              label={
                <Typography
                  variant="radio_checkbox_button"
                  sx={{ color: 'primary.main', fontWeight: meta.value === option.value ? 700 : 500 }}
                >
                  {option.label}
                </Typography>
              }
              labelPlacement="end"
              sx={{ width: 1 }}
            />
          </Box>
        ))}
      </Stack>

      {isError && (
        <Typography variant="note" sx={{ fontWeight: 500, color: 'secondary.main' }}>
          ※{meta.error}
        </Typography>
      )}
    </Stack>
  );
};
