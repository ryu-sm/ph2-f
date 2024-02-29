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
  };
};

componentOverrides.propTypes = {
  theme: PropTypes.object,
};
