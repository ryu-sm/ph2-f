import { AdFileDownload } from '@/assets/icons/ad-file-download';
import { AdMainSettingIcon } from '@/assets/icons/ad-main-setting';
import { AdMessageIcon } from '@/assets/icons/ad-message';
import { SettingPopover } from '@/components/admin/setting-popover';
import { useIsManager } from '@/hooks/use-is-manager';
import { authAtom } from '@/store';
import { Button, Divider, Stack, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
export const MainHeader = ({ isAdmin }) => {
  const theme = useTheme();
  const authInfo = useRecoilValue(authAtom);
  const pathName = useLocation().pathname;
  const isManager = useIsManager(pathName);
  const navigate = useNavigate();

  const [activeButton, setActiveButton] = useState('preReview');
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenPopover = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const casesStatusList = [
    {
      name: 'preReview',
      label: '仮審査中の案件',
    },
    {
      name: 'underReview',
      label: '本審査中の案件',
    },
    {
      name: 'finishedReview',
      label: '過去の案件',
    },
  ];

  return (
    <>
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
          borderTopColor: theme.palette.gray[80],
          boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.15)',
          paddingX: 6,
        }}
      >
        <Stack direction={'row'} spacing={4} alignItems={'center'} py={2}>
          <Typography variant="main_page_title" color="text.normal">
            申込一覧
          </Typography>
          {isAdmin && (
            <Stack
              direction={'row'}
              alignItems={'center'}
              sx={{ cursor: 'pointer' }}
              spacing={1}
              onClick={() => {
                navigate(`${isManager ? '/manager' : '/sale-person'}/docs-upload`);
              }}
            >
              <AdFileDownload sx={{ width: 14, height: 16 }} />
              <Typography variant="main_page_title" color="primary.main">
                書類アップロード
              </Typography>
            </Stack>
          )}
        </Stack>

        <Stack direction={'row'} alignItems={'center'} spacing={'10px'}>
          {casesStatusList.map((item) => (
            <Button
              key={item.name}
              variant="text"
              sx={{
                borderRadius: 0,
                color: 'primary.main',
                boxShadow: 'none',
                px: 10,
                py: 2,
                '&:hover': {
                  opacity: 0.8,
                },
                borderBottom: activeButton === item.name ? `3px solid ${theme.palette.primary.main}` : 'none',
              }}
              onClick={() => handleButtonClick(item.name)}
            >
              <Typography
                variant="main_page_title"
                color={activeButton === item.name ? `${theme.palette.gray[100]}` : `${theme.palette.primary.main}`}
                sx={{
                  fontWeight: activeButton === item.name ? 600 : 400,
                  textWrap: 'nowrap',
                }}
              >
                {item.label}
              </Typography>
            </Button>
          ))}
        </Stack>

        <Stack direction={'row'} alignItems={'center'} spacing={6}>
          <AdMessageIcon sx={{ cursor: 'pointer', width: 18, height: 14 }} />
          <Divider orientation="vertical" variant="middle" flexItem />
          <Typography variant="main_page_auth_info">
            {isManager ? authInfo.manager.name : authInfo.salesPerson.name}
          </Typography>
          <AdMainSettingIcon sx={{ cursor: 'pointer', width: 20, height: 20 }} onClick={handleOpenPopover} />
        </Stack>
      </Stack>

      <SettingPopover open={open} anchorEl={anchorEl} onClose={handleClosePopover} />
    </>
  );
};

MainHeader.propTypes = {
  isAdmin: PropTypes.bool,
};
