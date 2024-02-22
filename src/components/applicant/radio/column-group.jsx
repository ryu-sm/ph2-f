import { Children, useCallback, useMemo } from 'react';
import { useField } from 'formik';
import { FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { Icons } from '@/assets';

export const ApRadioColumnGroup = ({ options, disabled, cancelable, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;
  const isError = useMemo(() => meta.touched && !!meta.error, [meta.touched, meta.error]);

  const handleChange = useCallback(
    (e) => {
      props.onChange && props.onChange(e);
    },
    [props]
  );

  const handleClick = useCallback(
    async (e, option) => {
      if (!cancelable) {
        await setValue(e.target.value);
        await setTouched(true);
        return;
      }
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
  return (
    <Stack spacing={'6px'}>
      {isError && (
        <Typography variant="note" sx={{ fontWeight: 500, color: (theme) => theme.palette.secondary.main }}>
          ※{meta.error}
        </Typography>
      )}
      <RadioGroup field={field}>
        <Stack
          direction={'column'}
          alignItems={'center'}
          justifyContent={'space-between'}
          spacing={3}
          sx={{ width: 1 }}
        >
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              sx={{ width: 1, height: 1 }}
              value={option.value}
              control={
                <Radio
                  name={props?.name}
                  disabled={disabled}
                  icon={
                    <Stack spacing={'10px'} direction={'row'} alignItems={'center'}>
                      <Icons.ApRadioIcon />
                      <Typography variant="radio_checkbox_button" sx={{ color: 'primary.main' }}>
                        {option.label}
                      </Typography>
                    </Stack>
                  }
                  checkedIcon={
                    <Stack spacing={'10px'} direction={'row'} alignItems={'center'}>
                      <Icons.ApRadioCheckedIcon />
                      <Typography variant="radio_checkbox_button" sx={{ color: 'primary.main', fontWeight: 700 }}>
                        {option.label}
                      </Typography>
                    </Stack>
                  }
                  value={option.value}
                  checked={option.value == meta.value}
                  onChange={handleChange}
                  onClick={(e) => handleClick(e, option)}
                  sx={{
                    flex: 1,
                    minHeight: 48,
                    bgcolor: 'white',
                    borderRadius: '14px',
                    border: `1px solid`,
                    borderColor: isError ? 'secondary.main' : 'primary.40',
                    boxShadow: '0px 0px 15px rgba(60, 72, 196, 0.1)',
                    alignItems: 'center',
                    justifyContent: 'start',
                    textAlign: 'left',
                    '.MuiSvgIcon-root': {
                      position: 'relative',
                    },
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
    </Stack>
  );
};
