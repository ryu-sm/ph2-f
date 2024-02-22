import { useCallback, useMemo } from 'react';
import { useField } from 'formik';
import { Box, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { Icons } from '@/assets';

export const ApRadioColumnGroupUpload = ({ options, disabled, cancelable, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;
  const isError = useMemo(
    () => meta.touched && !!meta.error && meta.value === '',
    [meta.touched, meta.error, meta.value]
  );

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
      <RadioGroup field={field} sx={{ width: 1 }}>
        <Stack direction={'column'} alignItems={'center'} justifyContent={'space-between'} spacing={3}>
          {options.map((option) => (
            <Box
              key={option.value}
              sx={{
                pb: option.value == meta.value && 2,
                width: 1,
                height: 1,
                background: 'white',
                borderRadius: '14px',
                border: `1px solid`,
                borderColor: isError ? 'secondary.main' : 'primary.40',
                boxShadow: '0px 0px 15px rgba(60, 72, 196, 0.1)',
              }}
            >
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
                  width: 1,
                  minHeight: 48,
                  borderRadius: '14px',
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
                }}
              />
              {meta.touched && !!meta.error && meta.value === option.value && option.touched && (
                <Stack sx={{ px: 3, pb: 3 }}>
                  <Typography variant="waring" color={'secondary.main'}>
                    ※書類をアップロードしてください。
                  </Typography>
                </Stack>
              )}
              {option.value == meta.value && option.imgUpload}
            </Box>
          ))}
        </Stack>
      </RadioGroup>
    </Stack>
  );
};
