import { AdArrowDown } from '@/assets/icons/ad-arrow-down';
import { Stack, Button, Typography, Popover } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { AdArrowUp } from '@/assets/icons/ad-arrow-up';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const SelectCheckbox = ({ content, options }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handlePopoverOpen = (e) => setAnchorEl(e.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);

  const [currentSelect, setCurrentSelect] = useState('');
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
        onClick={handlePopoverOpen}
      >
        <AdArrowDown sx={{ width: 8, height: 8, color: 'gray.80' }} />
      </Button>
      <Typography variant="edit_content">{content}</Typography>

      <Popover
        open={open}
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
                key={item.id}
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
                  setCurrentSelect(item.id);
                  handlePopoverClose();
                }}
              >
                <CheckCircleIcon sx={{ fontSize: 20, color: item.id === currentSelect ? 'primary.main' : 'gray.60' }} />
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

SelectCheckbox.propTypes = {
  content: PropTypes.string,
  options: PropTypes.array,
};
