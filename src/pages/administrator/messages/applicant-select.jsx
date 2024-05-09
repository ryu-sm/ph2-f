import { Icons } from '@/assets';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Popover, Stack, TextField, Typography } from '@mui/material';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

export const ApplicantSelect = ({ options = [], onChange, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [oldValue, setOldValue] = useState(null);
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
    // onChange(value);
    setValue(value);
    setOldValue(null);
    handleClosePopover();
  };

  const filtedOptions = useMemo(() => {
    return searchText ? options.filter((option) => option.name.includes(searchText)) : options;
  }, [options, searchText]);

  return (
    <>
      <Stack
        px={2}
        pt={2}
        // width={160}
        onClick={(e) => {
          handleOpenPopover(e);
          setOldValue(meta.value);
          setSearchText('');
        }}
      >
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          sx={{
            width: '100%',
            ...(meta.value.length > 0
              ? { borderBottom: '1px solid', borderColor: 'gray.100', bgcolor: 'gray.20' }
              : { border: '1px solid #E7EDFF', borderRadius: 1, borderColor: 'primary.40', bgcolor: 'gray.20' }),
            px: 2,
            height: 48,
          }}
        >
          {meta.value.length > 0 ? (
            <Typography padding={1} variant="message_select_render_value">
              {meta.value ? options.find((item) => item.id === meta.value)?.name : ''}
            </Typography>
          ) : (
            <Typography padding={1} variant="message_select_placeholder">
              選択してください
            </Typography>
          )}
          {open ? (
            <Icons.AdArrowUp sx={{ width: 16, height: 16, mt: 1 }} />
          ) : (
            <Icons.AdArrowDown sx={{ width: 16, height: 16, mt: 1 }} />
          )}
        </Stack>
      </Stack>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        sx={{
          // marginTop: 14,
          left: -1,
          '.MuiPopover-paper': {
            borderRadius: 0,
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'gray.70',
          },
        }}
      >
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
                fontSize: '16px',
                fontFamily: 'Noto Sans JP',
                fontWeight: 400,
                lineHeight: '19px',
                height: 36,
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
        <Stack sx={{ textAlign: 'left', maxHeight: 400, overflow: 'auto', bgcolor: 'white', width: 345 }}>
          {filtedOptions.map((item) => (
            <Stack
              key={item.id}
              onClick={() => {
                handleChange(item.id);
              }}
              borderBottom={'1px solid'}
              borderColor={'gray.70'}
              sx={{
                minHeight: 46,
                px: 2,
                justifyContent: 'center',
                bgcolor: item.id === meta?.value ? 'primary.40' : 'white',
                '&:hover': {
                  bgcolor: 'gray.60',
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Hiragino Sans',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: 16,
                  letterSpacing: 0.4,
                  color: 'text.normal',
                }}
              >
                {item.name}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Popover>
    </>
  );
};
