import { Icons } from '@/assets';
import { Box, Stack } from '@mui/material';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { authAtom, localApplication } from '@/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { routeNames } from '@/router/settings';
import { useIsSalesPerson } from '@/hooks';

export const ApHeader = ({ hasMenu, menu }) => {
  const navigate = useNavigate();
  const isSalesPerson = useIsSalesPerson();

  const resetLocalApplicationInfo = useResetRecoilState(localApplication);
  const { isLogined, roleType } = useRecoilValue(authAtom);
  const {
    p_application_headers: { apply_no },
  } = useRecoilValue(localApplication);
  const setAuthInfo = useSetRecoilState(authAtom);
  const { pathname } = useLocation();
  const publicPath = [
    routeNames.apStartPage,
    routeNames.apRegisterVerifyEmailPage,
    routeNames.apRegisterPage,
    routeNames.apLoginPage,
    routeNames.apResetPasswordVerifyEmailPage,
    routeNames.apResetPasswordPage,
  ];

  return (
    <Box
      sx={{
        top: 0,
        width: 1,
        maxWidth: 480,
        zIndex: 2,
        bgcolor: 'white',
        position: 'fixed',
      }}
    >
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Box
          sx={{ px: 4, py: 3, cursor: isSalesPerson ? 'auto' : 'pointer' }}
          onClick={() => {
            if (isLogined) {
              if (roleType === 1) {
                if (!publicPath.find((item) => item.path === pathname)) {
                  navigate(routeNames.apTopPage.path);
                }
                if (!!apply_no) {
                  if (
                    window.confirm(
                      'トップページへ遷移します。\nご入力いただいた情報をまだ保存していない場合、破棄しますが、宜しいでしょうか。'
                    )
                  ) {
                    navigate(routeNames.apTopPage.path);
                  }
                }
              }
            } else {
              if (roleType === 1) {
                navigate(routeNames.apStartPage.path);
              }
            }
          }}
        >
          <Icons.ApHeaderLogo />
        </Box>
        {hasMenu && !isSalesPerson && (
          <Box onClick={menu.onTrue} sx={{ cursor: 'pointer' }}>
            <Icons.ApHeaderMenuIcon />
          </Box>
        )}
        {isSalesPerson && (
          <Stack
            onClick={() => {
              if (
                window.confirm(
                  '管理ページへ遷移します。\nご入力いただいた情報をまだ保存していない場合、破棄しますが、宜しいでしょうか。'
                )
              ) {
                setAuthInfo((pre) => {
                  return {
                    ...pre,
                    agentSended: false,
                  };
                });
                resetLocalApplicationInfo();
                navigate(routeNames.adSalesPersonDashboardPage.path);
              }
            }}
            sx={{ cursor: 'pointer', width: 40, height: 40 }}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Icons.AdHomeIcon sx={{ width: 17, height: 19 }} />
          </Stack>
        )}
      </Stack>
    </Box>
  );
};
