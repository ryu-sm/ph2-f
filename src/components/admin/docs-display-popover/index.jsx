import { AdExportDocsIcon } from '@/assets/icons/ad-export-docs';
import { useTheme } from '@emotion/react';
import { Popover, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
export const DocsDisplayPopover = ({ open, onClose, anchorEl, items }) => {
  const theme = useTheme();
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      sx={{
        marginTop: 6,
        left: -17,
        '.MuiPopover-paper': {
          overflow: 'visible',
          boxShadow: 'none',
          borderBottomLeftRadius: 2,
          borderBottomRightRadius: 2,
        },
      }}
    >
      <Stack
        overflow={'hidden'}
        sx={{
          border: `1px solid ${theme.palette.gray[80]}`,
          width: 193,
          borderBottomLeftRadius: 2,
          borderBottomRightRadius: 2,
        }}
      >
        {items.map((item, index) => {
          return (
            <Stack
              key={item.code}
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
              sx={{
                cursor: 'pointer',
                p: '10px',
                borderBottom: index !== items.length - 1 ? `1px solid ${theme.palette.gray[80]}` : 'none',
              }}
            >
              <Stack direction={'row'} alignItems={'center'} spacing={2}>
                <Typography variant="edit_header_tools" color={'primary.main'}>
                  {item.code}
                </Typography>
                <Typography variant="edit_header_tools">{item.label}</Typography>
              </Stack>
              <AdExportDocsIcon />
            </Stack>
          );
        })}
      </Stack>
    </Popover>
  );
};

DocsDisplayPopover.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  anchorEl: PropTypes.instanceOf(Element),
  items: PropTypes.array,
};
