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
    MuiSelect: {
      styleOverrides: {
        root: {
          '&::after': {
            borderBottom: '2px solid #1976d2', // 您希望的样式
          },
        },
      },
    },
  };
};

componentOverrides.propTypes = {
  theme: PropTypes.object,
};
