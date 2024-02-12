import { ApThemeProvider } from '@/styles';
import { Container } from '@mui/material';

export const ApWrapper = ({ children, bgImage, ...props }) => {
  return (
    <ApThemeProvider>
      <Container
        maxWidth={'tablet'}
        sx={{
          height: '100dvh',
          minHeight: '100dvh',
          width: 1,
          minWidth: 375,
          background: (theme) => theme.palette.background.neutral,
          backgroundSize: 'cover',
          backgroundImage: bgImage,
          backgroundPosition: 'center',
        }}
      >
        {children}
      </Container>
    </ApThemeProvider>
  );
};
