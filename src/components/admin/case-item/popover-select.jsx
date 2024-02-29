import { AdArrowDown } from '@/assets/icons/ad-arrow-down';
import { AdArrowUp } from '@/assets/icons/ad-arrow-up';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Popover, Stack, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const PopoverSelect = ({ options, value }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState('');
  const open = Boolean(anchorEl);

  const handleOpenPopover = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleChange = (item) => {
    setSearchText('');
    handleClosePopover();
    console.log(item);
    // TODO change value
  };
  return (
    <>
      <Stack
        px={2}
        pt={2}
        width={160}
        onClick={(e) => {
          handleOpenPopover(e);
          setSearchText('');
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderBottom: '1px solid',
            borderColor: 'gray.100',
            px: 2,
            pb: 2,
          }}
        >
          <Typography variant="case_select_text" color={'primary.main'} mr={1}>
            {value}
          </Typography>
          {open ? <AdArrowUp sx={{ width: 16, height: 16 }} /> : <AdArrowDown sx={{ width: 14, height: 14 }} />}
        </Box>
      </Stack>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        sx={{
          marginTop: 8,
          left: -1,
          '.MuiPopover-paper': {
            borderRadius: 0,
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'gray.70',
          },
        }}
      >
        <Stack sx={{ textAlign: 'left', maxHeight: 300, overflow: 'auto', bgcolor: 'white', width: '160px' }}>
          <Stack
            py={'2px'}
            direction={'row'}
            alignItems={'center'}
            borderBottom={'1px solid'}
            borderColor={'gray.70'}
            spacing={1}
          >
            <SearchIcon sx={{ color: 'primary.main', fontSize: 22, ml: 1 }} />
            <TextField
              variant="standard"
              autoFocus
              fullWidth
              sx={{
                '& .MuiInput-underline:after': {
                  borderBottom: 'none',
                },
                '& .MuiInput-underline:before': {
                  borderBottom: 'none',
                },
                '.MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottom: 'none',
                },
                '& .MuiInputBase-input': {
                  fontSize: '13px',
                  fontFamily: 'Noto Sans JP',
                  fontWeight: 400,
                  lineHeight: '19px',
                },
              }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== 'Escape') {
                  e.stopPropagation();
                }
              }}
            ></TextField>
          </Stack>

          {options?.map((item) => (
            <Stack
              key={item.label}
              onClick={() => {
                handleChange(item);
              }}
              borderBottom={'1px solid'}
              borderColor={'gray.70'}
              sx={{
                minHeight: 46,
                px: 2,
                justifyContent: 'center',
                bgcolor: item.id === value ? 'primary.40' : 'white',
                '&:hover': {
                  bgcolor: 'gray.60',
                },
              }}
            >
              <Typography variant="case_select_text" color={'gray.100'}>
                {item.label}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Popover>
    </>
  );
};

PopoverSelect.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  anchorEl: PropTypes.instanceOf(Element),
};
