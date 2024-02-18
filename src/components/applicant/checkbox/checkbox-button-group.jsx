import { useCallback, useMemo } from 'react';
import { useField } from 'formik';
import { Box, Checkbox, FormControlLabel, Stack, Typography } from '@mui/material';
import { Icons } from '@/assets';

export const ApCheckboxButtonGroup = ({ options, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;
  const isError = useMemo(() => meta.touched && !!meta.error, [meta.touched, meta.error]);
  const handleChange = useCallback(
    async (e) => {
      field.onChange(e);
      props.onChange && props.onChange(e);
      const target = e.target.value;
      await setValue(
        meta.value.includes(target) ? meta.value.filter((item) => item !== target) : [...meta.value, target]
      );
      await setTouched(true);
    },
    [field, meta, props, setValue]
  );
  const calcBorderColor = useMemo(() => {
    if (!!meta.value.length) return 'primary.main';
    if (meta.touched && !!meta.error) return 'secondary.main';
    return 'primary.40';
  }, [meta.touched, meta.error, meta.value.length]);

  return (
    <Stack spacing={'2px'}>
      <Stack
        spacing={3}
        sx={{
          px: 3,
          py: 1,
          width: 1,
          bgcolor: 'white',
          borderRadius: 3,
          boxShadow: '0 0 15px rgba(60, 72, 196, 0.1)',
          border: `1px solid`,
          borderColor: calcBorderColor,
        }}
      >
        <input name={field.name} type="hidden" />
        {options.map((option) => (
          <Box key={option.value} sx={{ height: 34 }}>
            <FormControlLabel
              {...field}
              onChange={handleChange}
              value={String(option.value)}
              control={
                <Checkbox
                  checked={meta.value.includes(String(option.value))}
                  icon={<Icons.ApCheckboxIcon />}
                  checkedIcon={<Icons.ApCheckboxCheckedIcon />}
                  sx={{ mx: '10px' }}
                />
              }
              label={
                <Typography
                  variant="radio_checkbox_button"
                  sx={{ color: 'primary.main', fontWeight: meta.value.includes(String(option.value)) ? 700 : 500 }}
                >
                  {option.label}
                </Typography>
              }
              labelPlacement="end"
            />
          </Box>
        ))}
      </Stack>

      {isError && (
        <Typography variant="note" sx={{ fontWeight: 500, color: (theme) => theme.palette.secondary.main }}>
          ※{meta.error}
        </Typography>
      )}
    </Stack>
  );
};
