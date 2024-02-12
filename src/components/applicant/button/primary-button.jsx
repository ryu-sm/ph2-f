import { Button } from '@mui/material';

export const ApPrimaryButton = ({ children, width, height, ...props }) => {
  return (
    <Button
      sx={{
        px: 0,
        color: 'white',
        backgroundColor: (theme) => theme.palette.primary.main,
        width: width || 327,
        height: height || 54,
        boxShadow: '0px 0px 15px rgba(60, 72, 196, 0.1)',
        '&.Mui-disabled': {
          backgroundColor: (theme) => theme.palette.primary.main,
          opacity: 0.15,
          color: 'white',
        },
        '&:hover': {
          backgroundColor: (theme) => theme.palette.primary.main,
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
