import { useBoolean } from '@/hooks';
import { ApWrapper } from './ap-wrapper';
import { ApMenu } from './ap-header/ap-menu';
import { ApHeader } from './ap-header';

import { ApFooter } from './ap-footer';
import { useMemo } from 'react';
import { Stack } from '@mui/material';
import { ApStepBar } from './ap-step-bar';

export const ApLayout = ({ children, hasMenu, hasFooter, hasStepBar, pb }) => {
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
        <Stack flex={1} sx={{ pb: pb || 0 }}>
          {children}
        </Stack>
        {hasFooter && <ApFooter hasMenu={hasMenu} />}
      </Stack>
    </ApWrapper>
  );
};
