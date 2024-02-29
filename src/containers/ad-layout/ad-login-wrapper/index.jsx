import { AdThemeProvider } from '@/styles/ad-theme';
import { Container } from '@mui/material';
import PropTypes from 'prop-types';
export const AdLoginWrapper = ({ children, bgImage }) => {
  return (
    <AdThemeProvider>
      <Container
        maxWidth={'tablet'}
        sx={{
          height: '100dvh',
          minHeight: '100dvh',
          width: 1,
          backgroundSize: 'cover',
          backgroundImage: bgImage,
          backgroundPosition: 'center',
        }}
      >
        {children}
      </Container>
    </AdThemeProvider>
  );
};

AdLoginWrapper.propTypes = {
  children: PropTypes.node,
  bgImage: PropTypes.string,
};
