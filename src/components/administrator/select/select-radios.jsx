import { AdArrowDown } from '@/assets/icons/ad-arrow-down';
import { AdArrowUp } from '@/assets/icons/ad-arrow-up';
import { usePopoverPositionByClick } from '@/hooks/update-popover-position';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, Popover, Stack, Typography } from '@mui/material';
import { useField } from 'formik';

import { useCallback, useMemo, useState } from 'react';

export const AdSelectRadios = ({ options, unit, cancelable, ...props }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [field, meta, helpers] = useField(props);

  const { setValue, setTouched } = helpers;
  const handleChange = useCallback(
    async (value) => {
      props.onChange && props.onChange(value);
      if (cancelable && value === meta.value) {
        await setValue('');
        return;
      }
      await setValue(value);
    },
    [props, setValue, cancelable, meta.value]
  );
  const handlePopoverOpen = (e) => {
    setAnchorEl(e.currentTarget);
    setTouched(false);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
    setTouched(true);
  };

  const { anchorOrigin, transformOrigin, updatePopoverPosition } = usePopoverPositionByClick();

  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} flex={1} spacing={2}>
      <Stack direction={'row'} alignItems={'center'} spacing={'10px'}>
        <Button
          name={field.name}
          sx={{
            width: open ? 150 : 20,
            height: 20,
            minWidth: 0,
            padding: 0,
            boxShadow: 'none',
            border: (theme) => `1px solid ${theme.palette.gray[80]}`,
            bgcolor: 'white',
            color: 'gray.80',
            '&:hover': {
              backgroundColor: 'white',
            },
          }}
          onClick={(e) => {
            handlePopoverOpen(e);
            updatePopoverPosition(e);
          }}
        >
          <AdArrowDown sx={{ width: 8, height: 8, color: 'gray.80' }} />
        </Button>
        <Stack direction={'row'} alignItems={'center'}>
          <Typography variant="edit_content" whiteSpace={'nowrap'}>
            {options.find((item) => meta.value === item.value)?.label}
          </Typography>
          {unit && <Typography variant="edit_content">{unit}</Typography>}
        </Stack>

        <Popover
          open={open}
          anchorOrigin={anchorOrigin}
          transformOrigin={transformOrigin}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          sx={{
            top: 0,
            left: 0,
            '.MuiPopover-paper': {
              overflow: 'visible',
              boxShadow: 'none',
              borderRadius: '2px',
            },
          }}
        >
          <Stack
            sx={{
              width: 150,
              overflow: 'hidden',
              borderRadius: '2px',
              border: (theme) => `1px solid ${theme.palette.gray[80]}`,
            }}
          >
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'flex-end'}
              sx={{
                px: 2,
                width: 1,
                height: 20,
                bgcolor: 'white',
                cursor: 'pointer',
                borderBottom: (theme) => `1px solid ${theme.palette.gray[80]}`,
              }}
              onClick={handlePopoverClose}
            >
              <AdArrowUp sx={{ width: 8, height: 8, color: 'gray.80' }} />
            </Stack>

            <Stack width={'100%'} maxHeight={'40dvh'} overflow={'auto'}>
              {options.map((item, index) => (
                <Stack
                  key={item.value}
                  direction={'row'}
                  alignItems={'center'}
                  p={1}
                  spacing={2}
                  borderBottom={index !== options.length - 1 ? '1px solid' : 'none'}
                  borderColor={'gray.80'}
                  sx={{
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    handleChange(item.value);
                    handlePopoverClose();
                  }}
                >
                  <CheckCircleIcon
                    sx={{ fontSize: 20, color: meta.value === item.value ? 'primary.main' : 'gray.60' }}
                  />
                  <Typography variant="select_options" color={'text.normal'}>
                    {item.label}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Popover>
      </Stack>
      {meta.touched && meta.error && (
        <Stack direction={'row'} alignItems={'center'} justifyContent={'end'} minWidth={320}>
          <Typography variant="edit_content" textAlign={'start'} color={'secondary.main'}>
            {meta.error}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};
