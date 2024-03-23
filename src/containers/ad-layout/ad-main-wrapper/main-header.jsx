import { Icons } from '@/assets';
import { AdSettingPopover } from '@/containers/ad-layout/ad-main-wrapper/setting-popover';
import { useBoolean, useIsManager } from '@/hooks';
import { routeNames } from '@/router/settings';
import { applicationAtom, authAtom, dashboardTabStatusAtom } from '@/store';
import { Button, Divider, Stack, Typography, useTheme } from '@mui/material';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { AdChangePasswordModal } from './chang-password';

export const MainHeader = ({ leftContent, rightAddItems }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const resetApplication = useResetRecoilState(applicationAtom);
  const [authInfo, setAuthInfo] = useRecoilState(authAtom);
  const [dashboardTabStatus, setDashboardTabStatus] = useRecoilState(dashboardTabStatusAtom);
  const isManager = useIsManager();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const changPasswordModal = useBoolean(false);

  const handleOpenPopover = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const isDashboard = useMemo(() => {
    const pathSegments = pathname?.split('/').filter(Boolean);
    return pathSegments.includes('preliminaries');
  }, [pathname]);

  const tabStatusList = [
    {
      status: 1,
      label: '仮審査中の案件',
    },
    {
      status: 2,
      label: '本審査中の案件',
    },
    {
      status: 3,
      label: '過去の案件',
    },
  ];

  return (
    <>
      <Stack
        flex={1}
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
        {!leftContent && (
          <Stack
            flex={1}
            direction={'row'}
            spacing={4}
            alignItems={'center'}
            py={2}
            sx={{ maxWidth: 'clac(50% -250px)' }}
          >
            <Typography variant="main_page_title" color="text.normal">
              申込一覧
            </Typography>
            <Stack
              direction={'row'}
              alignItems={'center'}
              sx={{ cursor: 'pointer' }}
              spacing={1}
              onClick={() =>
                navigate(
                  isManager ? routeNames.adManagerDocumentsPage.path : routeNames.adSalesPersonDocumentsPage.path
                )
              }
            >
              <Icons.AdFileDownload sx={{ width: 14, height: 16 }} />
              <Typography variant="main_page_title" color="primary.main">
                書類アップロード
              </Typography>
            </Stack>
            {!isManager && (
              <Stack
                direction={'row'}
                alignItems={'center'}
                sx={{ cursor: 'pointer' }}
                spacing={1}
                onClick={() => {
                  setAuthInfo((pre) => {
                    return {
                      ...pre,
                      applyNo: null,
                      agentSended: false,
                    };
                  });
                  resetApplication();
                  navigate(routeNames.adSalesPersonAgreementPage.path);
                }}
              >
                <Icons.AdNewApply sx={{ width: 14, height: 16 }} />
                <Typography variant="main_page_title" color="primary.main">
                  新規申込
                </Typography>
              </Stack>
            )}
          </Stack>
        )}
        {leftContent && (
          <Stack
            flex={1}
            direction={'row'}
            spacing={4}
            alignItems={'center'}
            py={2}
            sx={{ maxWidth: 'clac(50% -250px)' }}
          >
            {leftContent}
          </Stack>
        )}

        {isDashboard && (
          <Stack flex={1} direction={'row'} alignItems={'center'} spacing={'10px'}>
            {tabStatusList.map((item) => (
              <Button
                key={item.status}
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
                  borderBottom: dashboardTabStatus === item.status ? `3px solid ${theme.palette.primary.main}` : 'none',
                }}
                onClick={() => setDashboardTabStatus(item.status)}
              >
                <Typography
                  variant="main_page_title"
                  color={
                    dashboardTabStatus === item.status ? `${theme.palette.gray[100]}` : `${theme.palette.primary.main}`
                  }
                  sx={{
                    fontWeight: dashboardTabStatus === item.status ? 600 : 400,
                    textWrap: 'nowrap',
                  }}
                >
                  {item.label}
                </Typography>
              </Button>
            ))}
          </Stack>
        )}

        <Stack
          flex={1}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'flex-end'}
          spacing={6}
          sx={{ maxWidth: 'clac(50% -250px)' }}
        >
          {!isDashboard && (
            <Icons.AdHomeIcon
              sx={{ cursor: 'pointer', width: 17, height: 19 }}
              onClick={() => {
                isManager
                  ? navigate(routeNames.adManagerDashboardPage.path)
                  : navigate(routeNames.adSalesPersonDashboardPage.path);
              }}
            />
          )}
          {!pathname.includes('messages') && (
            <Icons.AdMessageIcon
              sx={{ cursor: 'pointer', width: 18, height: 14 }}
              onClick={() => {
                isManager
                  ? navigate(routeNames.adManagerMessagesPage.path)
                  : navigate(routeNames.adSalesPersonMessagesPage.path);
              }}
            />
          )}
          {rightAddItems}
          <Divider orientation="vertical" variant="middle" flexItem />
          <Typography variant="main_page_auth_info">
            {isManager ? authInfo.manager.name : authInfo.salesPerson.name}
          </Typography>
          <Icons.AdMainSettingIcon sx={{ cursor: 'pointer', width: 20, height: 20 }} onClick={handleOpenPopover} />
        </Stack>
      </Stack>

      <AdSettingPopover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        openChangePassword={() => {
          handleClosePopover();
          changPasswordModal.onTrue();
        }}
      />
      <AdChangePasswordModal open={changPasswordModal.value} onClose={changPasswordModal.onFalse} />
    </>
  );
};
