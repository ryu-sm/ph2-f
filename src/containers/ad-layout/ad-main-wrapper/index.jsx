import { AdThemeProvider } from '@/styles/ad-theme';
import { Stack } from '@mui/material';
import { MainFooter } from './main-footer';
import { MainHeader } from './main-header';

export const AdMainWrapper = ({ leftContent, rightAddItems, children }) => {
  return (
    <AdThemeProvider>
      <Stack
        sx={{
          // height: '100dvh',
          minHeight: '100dvh',
          background: (theme) => theme.palette.gray[60],
        }}
      >
        <MainHeader leftContent={leftContent} rightAddItems={rightAddItems} />
        {children}
        <MainFooter />
      </Stack>
    </AdThemeProvider>
  );
};
