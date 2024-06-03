import { Icons } from '@/assets';
import { Sledding } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Popover, Stack, TextField, Typography } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Done, CheckCircleOutline } from '@mui/icons-material';
import { convertToFullWidth } from '@/utils';

export const ApOrgItem = ({ showInput, inputName, inputValue, selectName, selectValue, options = [], ...props }) => {
  const formik = useFormikContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const inputRef = useRef(null);
  const itemRef = useRef(null);
  const [itemWdith, setItemWdith] = useState(0);
  const [showDone, setShowDone] = useState(false);
  useEffect(() => {
    const updateWidth = () => {
      if (itemRef.current) {
        setItemWdith(itemRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const handleOpenPopover = async (e) => {
    const tempOrg = options.find((org) => org.label === inputValue && inputValue !== '');
    if (tempOrg) {
      formik.setFieldValue(selectName, tempOrg.value);
      formik.setFieldValue(inputName, '');
    }
    setAnchorEl(e.currentTarget);
  };
  const handleClosePopover = () => {
    const tempOrg = options.find((org) => org.label === inputValue && inputValue !== '');
    if (tempOrg) {
      formik.setFieldValue(selectName, tempOrg.value);
      formik.setFieldValue(inputName, '');
    }
    setAnchorEl(null);
  };

  const handleChange = async (value) => {
    formik.setFieldValue(selectName, value);
    formik.setFieldValue(inputName, '');

    handleClosePopover();
  };

  return (
    <Stack>
      <Stack
        ref={itemRef}
        pl={2}
        pr={1}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        sx={{
          height: 48,
          width: 1,
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'primary.40',
          boxShadow: 'inset 0px 4px 6px rgba(44, 54, 156, 0.1)',
          ...(selectValue || inputValue
            ? {
                border: 'none',
                boxShadow: 'none',
                backgroundColor: 'gray.100',
              }
            : {}),
        }}
        onClick={(e) => {
          handleOpenPopover(e);
        }}
      >
        {inputValue && !selectValue && (
          <Typography
            sx={{
              fontFamily: 'Hiragino Sans',
              fontWeight: 300,
              fontSize: 16,
              lineHeight: '100%',
              letterSpacing: 0.6,
              color: 'text.main',
            }}
          >
            {inputValue}
          </Typography>
        )}
        {!inputValue && selectValue && (
          <Typography
            sx={{
              fontFamily: 'Hiragino Sans',
              fontWeight: 300,
              fontSize: 16,
              lineHeight: '100%',
              letterSpacing: 0.6,
              color: 'text.main',
            }}
          >
            {selectValue ? options.find((item) => item.value === selectValue)?.label : ''}
          </Typography>
        )}
        {!inputValue && !selectValue && (
          <Typography
            sx={{
              fontFamily: 'Hiragino Sans',
              fontWeight: 300,
              fontSize: 16,
              lineHeight: '100%',
              letterSpacing: 0.6,
              color: 'placeholder',
            }}
          >
            選択してください。
          </Typography>
        )}

        <Icons.ApArrowDownIcon
          sx={{
            width: 24,
            height: 24,
            pointerEvents: 'none',
            color: 'primary.main',
          }}
        />
      </Stack>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        sx={{
          left: -1,
          '.MuiPopover-paper': {
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'primary.40',
            boxShadow: 'inset 0px 4px 6px rgba(44, 54, 156, 0.1)',
          },
        }}
      >
        <Stack spacing={1} sx={{ textAlign: 'left', overflow: 'auto', bgcolor: 'white', width: itemWdith, py: 1 }}>
          {showInput && (
            <Stack py={'2px'} px={2} direction={'row'} alignItems={'center'} spacing={1}>
              <Box sx={{ display: 'inline-block', position: 'relative', width: 1 }}>
                <TextField
                  ref={inputRef}
                  placeholder={'選択対象が存在しない場合は、入力してください。'}
                  fullWidth
                  value={inputValue}
                  onChange={(e) => {
                    formik.setFieldValue(inputName, e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key !== 'Escape') {
                      e.stopPropagation();
                    }
                  }}
                  onBlur={(e) => {
                    console.log(e);

                    if (e.target.value) {
                      let value = e.target.value?.toString().trim();
                      value = convertToFullWidth(value);
                      formik.setFieldValue(inputName, value);
                      formik.setFieldValue(selectName, '');
                    }

                    setShowDone(false);
                    handleClosePopover();
                  }}
                  onFocus={() => {
                    setShowDone(true);
                  }}
                />
                {showDone && (
                  <Done
                    sx={{
                      cursor: 'pointer',
                      top: 12,
                      right: 8,
                      width: 24,
                      height: 24,
                      position: 'absolute',
                      color: (theme) => theme.palette.primary.main,
                    }}
                  />
                )}
              </Box>
            </Stack>
          )}

          {options.map((item) => (
            <Stack
              key={item.value}
              onClick={() => {
                handleChange(item.value);
              }}
              sx={{
                minHeight: 48,
                px: 3,
                justifyContent: 'center',
                bgcolor: item.value === selectValue ? 'primary.40' : 'white',
                '&:hover': {
                  bgcolor: 'gray.100',
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Hiragino Sans',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: 24,
                  lineHeight: '130%',
                  letterSpacing: 0.4,
                  '@media (max-width:480px)': {
                    fontSize: 16,
                    lineHeight: '24px',
                  },
                  color: 'text.normal',
                }}
              >
                {item.label}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Popover>
    </Stack>
  );
};
