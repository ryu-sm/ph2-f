import { useIsManager } from '@/hooks/use-is-manager';
import { AdThemeProvider } from '@/styles/ad-theme';
import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { MainFooter } from './MainFooter';
import { MainHeader } from './MainHeader';

export const AdMainWrapper = ({ children }) => {
  const pathName = useLocation().pathname;
  const isManager = useIsManager(pathName);
  return (
    <AdThemeProvider>
      <Stack
        sx={{
          height: '100dvh',
          minHeight: '100dvh',
          background: (theme) => theme.palette.gray[60],
        }}
      >
        <MainHeader isAdmin={isManager} />
        {children}
        <MainFooter />
      </Stack>
    </AdThemeProvider>
  );
};

AdMainWrapper.propTypes = {
  children: PropTypes.node,
};
