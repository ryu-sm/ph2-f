import { useBoolean } from '@/hooks';
import { ApWrapper } from './ap-wrapper';
import { ApMenu } from './ap-header/ap-menu';
import { ApHeader } from './ap-header';
import { ApFooter } from './ap-footer';
import { useEffect, useMemo } from 'react';
import { Stack } from '@mui/material';
import { ApStepBar } from './ap-step-bar';
import { authAtom } from '@/store';
import { jwtDecode } from 'jwt-decode';
import { pathGroup01, pathGroup02, pathGroup03 } from '@/router/settings';
import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';

export const ApLayout = ({ children, hasMenu, hasFooter, hasStepBar, bottomContent }) => {
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
  const menu = useBoolean();
  const pt = useMemo(() => {
    if (hasStepBar) return 26;
    return 11;
  }, [hasStepBar]);
  return (
    <ApWrapper>
      <Stack spacing={0} sx={{ pt: pt, height: '100dvh', minHeight: '100dvh' }}>
        <ApMenu menu={menu} />
        <ApHeader hasMenu={hasMenu} menu={menu} />
        {hasStepBar && <ApStepBar />}
        <Stack flex={1} sx={{ pb: bottomContent ? 18 : 0 }}>
          <Stack flex={1} sx={{ minHeight: 'calc(100dvh - 72px)' }}>
            {children}
          </Stack>
          {bottomContent}
        </Stack>

        {hasFooter && <ApFooter hasMenu={hasMenu} />}
      </Stack>
    </ApWrapper>
  );
};
