import { Icons } from '@/assets';
import { Box, Stack } from '@mui/material';
import { ApHeaderMenuIcon } from '@/assets/icons';
import { useRecoilValue } from 'recoil';
import { applyNoSelector, authAtom } from '@/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { routeNames } from '@/router/settings';
import { applicantRoutes } from '@/router/applicant-routes';

export const ApHeader = ({ hasMenu, menu }) => {
  const navigate = useNavigate();
  const { isLogined, loginType } = useRecoilValue(authAtom);
  const applyNo = useRecoilValue(applyNoSelector);
  const { pathname } = useLocation();

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
          sx={{ px: 4, py: 3, cursor: 'pointer' }}
          onClick={() => {
            if (isLogined) {
              if (loginType === 1) {
                if (
                  applicantRoutes.find((item) => item.path === pathname).path &&
                  pathname !== routeNames.apAgreementPage.path
                ) {
                  navigate(routeNames.apTopPage.path);
                }
                if (applyNo) {
                  if (
                    window.confirm(
                      'トップページへ遷移します。\nご入力いただいた情報をまだ保存していない場合、破棄しますが、宜しいでしょうか。'
                    )
                  ) {
                    navigate(routeNames.apTopPage.path);
                  }
                }
              } else {
                // TODO

                navigate(routeNames.apStartPage.path);
              }
            } else {
              if (loginType === 1) {
                navigate(routeNames.apStartPage.path);
              } else {
                // TODO
                navigate(routeNames.apStartPage.path);
              }
            }
          }}
        >
          <Icons.ApHeaderLogo />
        </Box>
        {hasMenu && (
          <Box onClick={menu.onTrue} sx={{ cursor: 'pointer' }}>
            <ApHeaderMenuIcon />
          </Box>
        )}
      </Stack>
    </Box>
  );
};
