import { Button } from '@mui/material';

export const AdSecondaryButton = ({ children, disabled, sx, ...props }) => {
  return (
    <Button
      sx={{
        bgcolor: 'white',
        color: 'primary.main',
        border: 'none',
        boxShadow: 'none',
        minHeight: 25,
        height: 32,
        width: 'auto',
        whiteSpace: 'nowrap',
        '&:hover': {
          backgroundColor: 'white',
          opacity: 0.8,
        },
        '&:disabled': {
          backgroundColor: 'gray.80',
          color: 'gray.100',
        },
        borderRadius: '2px',
        fontFamily: 'Hiragino Sans',
        fontStyle: 'normal',
        fontWeight: 300,
        fontSize: 13,
        lineHeight: '150%',
        ...sx,
      }}
      disabled={disabled}
      {...props}
    >
      {children}
    </Button>
  );
};
