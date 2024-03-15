import { AdHomeIcon } from '@/assets/icons/ad-home-icon';
import { AdMainSettingIcon } from '@/assets/icons/ad-main-setting';
import { AdMessageIcon } from '@/assets/icons/ad-message';
import { SettingPopover } from '@/components/admin/setting-popover';
import { useIsManager } from '@/hooks/use-is-manager';
import { authAtom } from '@/store';
import { AdThemeProvider } from '@/styles/ad-theme';
import { Divider, Stack, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { MainFooter } from '../ad-main-wrapper/MainFooter';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
export const AdDocsWrapper = ({ children, isDetailPage, secondTitle }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const authInfo = useRecoilValue(authAtom);
  const pathName = useLocation().pathname;
  const isManager = useIsManager(pathName);

  const handleOpenPopover = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  return (
    <AdThemeProvider>
      <Stack
        sx={{
          height: '100dvh',
          minHeight: '100dvh',
          background: (theme) => theme.palette.gray[20],
        }}
      >
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
            zIndex: theme.zIndex.drawer + 1,
            borderTop: '1px solid',
            borderTopColor: (theme) => theme.palette.gray[80],
            boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.15)',
            padding: '8px 20px',
          }}
        >
          <Stack direction={'row'} alignItems={'center'} sx={{ cursor: 'pointer' }} spacing={2}>
            <Typography variant="main_page_title" color={isDetailPage ? 'primary.main' : '#333333'}>
              アップロード書類一覧
            </Typography>
            {isDetailPage && (
              <>
                <KeyboardArrowRightIcon
                  sx={{
                    width: '18px',
                    height: '18px',
                    color: 'rgb(102, 102, 102)',
                  }}
                />
                <Typography variant="main_page_title">{secondTitle}</Typography>
              </>
            )}
          </Stack>

          <Stack direction={'row'} alignItems={'center'} spacing={6}>
            {!isDetailPage && (
              <AdHomeIcon
                sx={{ cursor: 'pointer', width: 16, height: 18 }}
                onClick={() => navigator(`/${isManager ? 'manager/cases-review' : 'agent/cases-review'}`)}
              />
            )}
            <AdMessageIcon sx={{ cursor: 'pointer', width: 18, height: 14 }} />
            <Divider orientation="vertical" variant="middle" flexItem />
            <Typography variant="main_page_auth_info">
              {isManager ? authInfo.manager.name : authInfo.salesPerson.name}
            </Typography>
            <AdMainSettingIcon sx={{ cursor: 'pointer', width: 20, height: 20 }} onClick={handleOpenPopover} />
          </Stack>
        </Stack>
        {children}
        <MainFooter />
      </Stack>

      <SettingPopover open={open} anchorEl={anchorEl} onClose={handleClosePopover} />
    </AdThemeProvider>
  );
};

AdDocsWrapper.propTypes = {
  children: PropTypes.node,
  isDetailPage: PropTypes.bool,
  secondTitle: PropTypes.string,
};
