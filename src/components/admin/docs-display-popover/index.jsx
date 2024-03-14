import { AdExportDocsIcon } from '@/assets/icons/ad-export-docs';
import { useIsManager } from '@/hooks/use-is-manager';
import { routeNames } from '@/router/settings';
import { applicationAtom } from '@/store';
import { useTheme } from '@emotion/react';
import { Popover, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
export const DocsDisplayPopover = ({ open, onClose, anchorEl, isIncomeTotalizer }) => {
  const theme = useTheme();
  const pathName = useLocation().pathname;
  const isManager = useIsManager(pathName);

  const handleClick = (item) => {
    const path = `${isManager ? routeNames.adPreviewImage.path : routeNames.spPreviewImage.path}?category=${
      isIncomeTotalizer ? 1 : 0
    }&id=${item.label}`;
    window.open(path);
  };
  const { docs_list: items } = useRecoilValue(applicationAtom);

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
              key={item.label}
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
              sx={{
                cursor: 'pointer',
                p: '10px',
                borderBottom: index !== items.length - 1 ? `1px solid ${theme.palette.gray[80]}` : 'none',
              }}
              onClick={() => handleClick(item)}
            >
              <Stack direction={'row'} alignItems={'center'} spacing={2}>
                <Typography variant="edit_header_tools" color={'primary.main'}>
                  {item.label}
                </Typography>
                <Typography variant="edit_header_tools" whiteSpace={'nowrap'}>
                  {item.title}
                </Typography>
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
  isIncomeTotalizer: PropTypes.bool,
};
