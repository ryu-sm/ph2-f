import { GlobalStyles, ThemeProvider, createTheme } from '@mui/material';
import { futura } from '@/assets/fonts';
import { palette } from './palette';
import { typography } from './typography';
import { componentOverrides } from './component';

export const ApThemeProvider = ({ children }) => {
  const theme = createTheme({
    typography: typography,
    palette: palette,
    spacing: Array.from({ length: 60 }, (_, i) => i * 4),
    breakpoints: { values: { mobile: 0, tablet: 480, md: 940, desktop: 1200, xl: 1536 } },
  });

  theme.components = componentOverrides(theme);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          '*': {
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
          },
          body: {
            overscrollBehavior: 'none',
            backgroundColor: theme.palette.background.wrapper,

            '.day-of-week-0, .day-of-week-6': {
              backgroundColor: '#E7E7E7',
            },
            '.is-public-holiday, .is-public-holiday:hover': {
              backgroundColor: '#FF8F8F',
            },
            '.is-public-holiday-desired, .is-public-holiday-desired:hover': {
              backgroundColor: '#E7E7E7',
            },
          },
          '.react-html5-camera-photo-fullscreen>video': {
            objectFit: 'cover',
          },
          '#container-circles': {
            bottom: '15%',
          },

          '@font-face': [
            {
              fontFamily: futura,
              src: `url(${futura}) format('ttf')`,
            },
          ],
        }}
      />
      {children}
    </ThemeProvider>
  );
};
