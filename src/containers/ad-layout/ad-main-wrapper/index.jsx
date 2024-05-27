import { AdThemeProvider } from '@/styles/ad-theme';
import { Stack } from '@mui/material';
import { MainFooter } from './main-footer';
import { MainHeader } from './main-header';
import { authAtom } from '@/store';
import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { pathGroup01, pathGroup02, pathGroup03 } from '@/router/settings';
import { jwtDecode } from 'jwt-decode';

export const AdMainWrapper = ({ leftContent, rightAddItems, children, style }) => {
  const { isLogined } = useRecoilValue(authAtom);
  const { pathname } = useLocation();

  // useEffect(() => {
  //   if (isLogined) {
  //     const token = localStorage.getItem('accessToken') || null;
  //     const payload = jwtDecode(token);
  //     if (payload?.role_type === 1 && !pathGroup01.includes(pathname)) {
  //       window.location.reload();
  //     }
  //     if (payload?.role_type === 2 && !pathGroup02.includes(pathname)) {
  //       window.location.reload();
  //     }
  //     if (payload?.role_type === 3 && !pathGroup03.includes(pathname)) {
  //       window.location.reload();
  //     }
  //   }
  // }, [pathname]);
  return (
    <AdThemeProvider>
      <Stack
        sx={{
          overflowX: 'auto',
          minHeight: '100dvh',
          background: (theme) => theme.palette.gray[60],
          ...style,
        }}
      >
        <MainHeader leftContent={leftContent} rightAddItems={rightAddItems} />
        <Stack flex={1} pt={10} overflow={'auto'}>
          {children}
        </Stack>
        <MainFooter />
      </Stack>
    </AdThemeProvider>
  );
};
