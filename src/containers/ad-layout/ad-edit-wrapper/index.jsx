import { AdThemeProvider } from '@/styles/ad-theme';
import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { EditHeader } from './edit-header';
import { MainFooter } from '../ad-main-wrapper/MainFooter';
import { useLocation } from 'react-router-dom';
import { useIsManager } from '@/hooks/use-is-manager';
export const AdEditWrapper = ({ children }) => {
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
        <EditHeader isAdmin={isManager} />
        {children}
        <MainFooter />
      </Stack>
    </AdThemeProvider>
  );
};

AdEditWrapper.propTypes = {
  children: PropTypes.node,
};
