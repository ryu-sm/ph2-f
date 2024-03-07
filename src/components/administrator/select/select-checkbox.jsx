import { AdArrowDown } from '@/assets/icons/ad-arrow-down';
import { AdArrowUp } from '@/assets/icons/ad-arrow-up';
import { usePopoverPositionByClick } from '@/hooks/update-popover-position';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, Popover, Stack, Typography } from '@mui/material';
import { useField } from 'formik';

import { useCallback, useMemo, useState } from 'react';

export const AdSelectCheckbox = ({ options, ...props }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  const handleChange = useCallback(
    async (value) => {
      await setValue(meta.value.includes(value) ? meta.value.filter((item) => item !== value) : [...meta.value, value]);
    },
    [meta, setValue]
  );
  const handlePopoverOpen = (e) => setAnchorEl(e.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);

  const { anchorOrigin, transformOrigin, updatePopoverPosition } = usePopoverPositionByClick();

  return (
    <Stack direction={'row'} alignItems={'center'} spacing={3}>
      <Button
        sx={{
          width: 20,
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
      <Typography variant="edit_content">
        {options
          .map((item) => (meta.value.includes(item.value) ? item.label : null))
          .filter((item) => item)
          .join('・')}
      </Typography>

      <Popover
        open={open}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        sx={{
          top: '0',
          left: -130,
          '.MuiPopover-paper': {
            overflow: 'visible',
            boxShadow: 'none',
            borderRadius: '2px',
          },
        }}
      >
        <Stack
          width={'150px'}
          overflow={'hidden'}
          sx={{
            border: '1px solid',
            borderColor: 'gray.80',
            width: 150,
            borderRadius: '2px',
          }}
        >
          <Stack
            width={'100%'}
            height={20}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'flex-end'}
            borderBottom={'1px solid'}
            borderColor={'gray.80'}
            bgcolor={'white'}
            px={2}
          >
            <AdArrowUp sx={{ width: 8, height: 8, color: 'gray.80', cursor: 'pointer' }} onClick={handlePopoverClose} />
          </Stack>

          <Stack width={'100%'}>
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
                onClick={() => handleChange(item.value)}
              >
                <CheckCircleIcon
                  sx={{ fontSize: 20, color: meta.value.includes(item.value) ? 'primary.main' : 'gray.60' }}
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
  );
};
