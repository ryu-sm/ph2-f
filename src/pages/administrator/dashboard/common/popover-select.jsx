import { Icons } from '@/assets';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Popover, Stack, TextField, Typography } from '@mui/material';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

export const PopoverSelect = ({ options = [], onChange, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [oldValue, setOldValue] = useState(meta.value);
  const { setValue } = helpers;
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState('');
  const open = Boolean(anchorEl);

  const handleOpenPopover = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleChange = (value) => {
    if (oldValue === value) {
      handleClosePopover();
      return;
    }
    onChange(value);
    setValue(value);
    setOldValue(value);
    handleClosePopover();
  };

  const filtedOptions = useMemo(() => {
    return searchText ? options.filter((option) => option.label.includes(searchText)) : options;
  }, [options, searchText]);

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
            {meta.value ? options.find((item) => item.value === meta.value)?.label : ''}
          </Typography>
          {open ? (
            <Icons.AdArrowUp sx={{ width: 16, height: 16 }} />
          ) : (
            <Icons.AdArrowDown sx={{ width: 14, height: 14 }} />
          )}
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
            <Stack sx={{ pl: 1 }}>
              <SearchIcon sx={{ color: 'primary.main', fontSize: 22 }} />
            </Stack>
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
            />
          </Stack>

          {[{ value: '', label: '' }, ...filtedOptions]?.map((item) => (
            <Stack
              key={item.value}
              onClick={() => {
                handleChange(item.value);
              }}
              borderBottom={'1px solid'}
              borderColor={'gray.70'}
              sx={{
                minHeight: 46,
                px: 2,
                justifyContent: 'center',
                bgcolor: item.value === meta?.value ? 'primary.40' : 'white',
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
