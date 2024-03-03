import { AdThemeProvider } from '@/styles/ad-theme';
import { Container } from '@mui/material';

export const AdAuthWrapper = ({ children, bgImage }) => {
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
