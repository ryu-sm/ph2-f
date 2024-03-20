import { useCallback, useMemo } from 'react';
import { useField } from 'formik';
import { FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';

export const ApRadioRowGroup = ({ options, disabled, height, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;
  const isError = useMemo(() => meta.touched && !!meta.error, [meta.touched, meta.error]);

  const handleChange = useCallback(
    async (e) => {
      field.onChange(e);
      props.onChange && props.onChange(e);
      await setValue(e.target.value);
      await setTouched(true);
    },
    [field, props, setValue]
  );
  const handleClick = useCallback(
    async (e, option) => {
      if (option.value === meta.value) {
        await setValue('');
        await setTouched(false);
      } else {
        await setValue(e.target.value);
        await setTouched(true);
      }
    },
    [field, props, setValue]
  );
  const MockIcon = ({ children }) => (
    <Stack sx={{ height: height }} alignItems={'center'} justifyContent={'center'}>
      <Typography
        variant="radio_checkbox_button"
        whiteSpace={'break-spaces'}
        textAlign={'center'}
        sx={{ color: (theme) => theme.palette.primary.main }}
      >
        {children}
      </Typography>
    </Stack>
  );
  return (
    <Stack spacing={'6px'}>
      <RadioGroup field={field}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={4} sx={{ width: 1 }}>
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              sx={{ width: 1, height: 1 }}
              value={option.value}
              control={
                <Radio
                  name={props?.name}
                  disabled={disabled}
                  icon={<MockIcon>{option.label}</MockIcon>}
                  checkedIcon={<MockIcon>{option.label}</MockIcon>}
                  checked={meta.value == option.value}
                  sx={{
                    flex: 1,
                    minHeight: 48,
                    bgcolor: 'white',
                    borderRadius: '14px',
                    border: (theme) =>
                      `1px solid ${isError ? theme.palette.secondary.main : theme.palette.primary[20]}`,
                    boxShadow: '0px 0px 15px rgba(60, 72, 196, 0.1)',
                    '&:hover': {
                      bgcolor: 'white',
                      boxShadow: 'none',
                    },
                    '&.Mui-checked': {
                      border: (theme) => `1px solid ${theme.palette.primary.main}`,
                      bgcolor: (theme) => theme.palette.primary[40],
                    },
                    '&.Mui-disabled': {
                      bgcolor: (theme) => theme.palette.background.disabled,
                      boxShadow: 'none',
                      border: 'none',
                      opacity: 0.5,
                    },
                  }}
                  onChange={handleChange}
                  onClick={(e) => handleClick(e, option)}
                />
              }
            />
          ))}
        </Stack>
      </RadioGroup>

      {isError && (
        <Typography variant="note" sx={{ fontWeight: 500, color: (theme) => theme.palette.secondary.main }}>
          ※{meta.error}
        </Typography>
      )}
    </Stack>
  );
};
