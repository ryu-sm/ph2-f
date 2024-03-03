import PropTypes from 'prop-types';
export const componentOverrides = (theme) => {
  return {
    MuiButton: {
      defaultProps: { variant: 'contained' },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          '& .MuiBackdrop-root': {
            backgroundColor: theme.palette.overlay,
            opacity: '0.4 !important',
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        root: {
          '& .MuiBackdrop-root': {
            backgroundColor: theme.palette.overlay,
            opacity: '0.0 !important',
          },
        },
      },
    },
  };
};

componentOverrides.propTypes = {
  theme: PropTypes.object,
};
