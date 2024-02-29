import { GlobalStyles, ThemeProvider, createTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { typography } from './typography';
import { palette } from './palette';
import { componentOverrides } from './component';

export const AdThemeProvider = ({ children }) => {
  const theme = createTheme({
    typography: typography,
    spacing: Array.from({ length: 60 }, (_, i) => i * 4),
    palette: palette,
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
          },
        }}
      />
      {children}
    </ThemeProvider>
  );
};

AdThemeProvider.propTypes = {
  children: PropTypes.node,
};
