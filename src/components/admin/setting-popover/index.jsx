import { AdExportExcelIcon } from '@/assets/icons/ad-export-excel';
import { useTheme } from '@emotion/react';
import { Box, Button, Popover, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export const SettingPopover = ({ open, onClose, anchorEl, itemLabels }) => {
  const theme = useTheme();
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      sx={{ marginTop: 9, '.MuiPopover-paper': { overflow: 'visible', borderRadius: 2 } }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -8,
          right: 8,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderBottom: `10px solid ${theme.palette.primary.main}`,
        }}
      />
      <Stack
        overflow={'hidden'}
        sx={{
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: 2,
        }}
      >
        {itemLabels.map((label, index) => {
          return (
            <Box key={label}>
              <Button
                sx={{
                  justifyContent: 'flex-start',
                  width: '100%',
                  py: '10px',
                  backgroundColor: 'white',
                  color: 'gray.100',
                  borderRadius: 0,
                  borderBottom: index === itemLabels.length - 1 ? 'none' : '1px solid',
                  borderColor: 'gray.80',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                }}
              >
                <Typography variant="setting_popover" marginRight={2}>
                  {label}
                </Typography>
                {(index === 0 || index === 2) && <AdExportExcelIcon />}
              </Button>
            </Box>
          );
        })}
      </Stack>
    </Popover>
  );
};

SettingPopover.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  anchorEl: PropTypes.instanceOf(Element),
  itemLabels: PropTypes.array,
};
