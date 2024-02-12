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
            overscrollBehaviorY: 'none',
            backgroundColor: theme.palette.background.wrapper,
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
