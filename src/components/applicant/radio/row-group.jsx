import { useCallback, useEffect, useMemo } from 'react';
import { useField } from 'formik';
import { FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';

export const ApRadioRowGroup = ({ options, disabled, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  const isError = useMemo(() => !!meta.error, [meta.error]);

  const handleChange = useCallback(
    (e) => {
      field.onChange(e);
      props.onChange && props.onChange(e);
      setValue(e.target.value);
    },
    [field, props, setValue]
  );
  return (
    <Stack spacing={'6px'}>
      <RadioGroup field={field} onChange={handleChange}>
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
                  sx={{
                    flex: 1,
                    minHeight: 48,
                    bgcolor: 'white',
                    borderRadius: '14px',
                    border: (theme) => `1px solid ${theme.palette.primary[20]}`,
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

const MockIcon = ({ children }) => (
  <Typography variant="radio_checkbox_button" sx={{ color: (theme) => theme.palette.primary.main }}>
    {children}
  </Typography>
);
