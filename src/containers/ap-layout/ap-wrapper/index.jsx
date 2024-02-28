import { ApThemeProvider } from '@/styles';
import { Container } from '@mui/material';
import Scrollbars from 'react-custom-scrollbars';

export const ApWrapper = ({ children, bgImage, ...props }) => {
  return (
    <ApThemeProvider>
      <Scrollbars autoHeight autoHeightMin={'100dvh'}>
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
      </Scrollbars>
    </ApThemeProvider>
  );
};
