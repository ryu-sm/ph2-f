export const componentOverrides = (theme) => {
  return {
    MuiButton: {
      defaultProps: { variant: 'contained' },
      styleOverrides: {
        root: {
          p: 0,
          minHeight: 40,
          minWidth: 40,
          borderRadius: '14px',
          fontFamily: 'Hiragino Sans',
          fontStyle: 'normal',
          fontSize: 16,
          fontWeight: 500,
          lineHeight: '100%',
          '.MuiButton-startIcon': {
            position: 'absolute',
            left: 24,
          },
          '.MuiButton-endIcon': {
            position: 'absolute',
            right: 24,
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        InputProps: {
          inputProps: { sx: { p: 4, height: 16, maxHeight: 48, borderRadius: 1 } },
        },
      },
      styleOverrides: {
        root: {
          '.MuiInputBase-input': {
            minHeight: 16,
            fontFamily: 'Hiragino Sans',
            fontSize: 16,
            fontWeight: 300,
            lineHeight: '150%',
            fontStyle: 'normal',
            letterSpacing: 0.4,
            backgroundColor: 'white',
            color: theme.palette.text.main,
            boxShadow: 'inset 0px 4px 6px rgba(44, 54, 156, 0.1)',
            '&::placeholder': {
              color: theme.palette.text.normal,
            },
          },
          '.MuiFormHelperText-root': {
            display: 'none',
          },
          '&&&& .Mui-error': {
            '.MuiInputBase-input': {
              color: theme.palette.secondary.main,
              '&::placeholder': {
                color: theme.palette.secondary.main,
              },
            },
            fieldset: {
              border: `1px solid ${theme.palette.secondary.main}`,
            },
          },
          '&&&& .Mui-focused': {
            '.MuiInputBase-input': {
              backgroundColor: theme.palette.background.focus,
            },
            fieldset: { border: `1px solid ${theme.palette.primary.main}` },
          },
          '&&&& fieldset': {
            border: `1px solid ${theme.palette.primary[40]}`,
          },
        },
      },
    },

    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiPopper: {
      defaultProps: {
        sx: {
          boxShadow: 'none',
          backgroundColor: 'inherit',
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        disableGutters: true,
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          '& .MuiBackdrop-root': {
            backgroundColor: theme.palette.background.overlay,
            opacity: '0.6 !important',
          },
        },
      },
    },
  };
};
