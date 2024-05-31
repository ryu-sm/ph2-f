import { AdThemeProvider } from '@/styles/ad-theme';
import { Stack } from '@mui/material';
import { MainFooter } from './main-footer';
import { MainHeader } from './main-header';

export const AdMainWrapper = ({ leftContent, rightAddItems, children, style }) => {
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
