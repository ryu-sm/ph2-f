import { Button } from '@mui/material';

export const ApSecondaryButton = ({ children, width, height, ...props }) => {
  return (
    <Button
      sx={{
        color: (theme) => theme.palette.primary.main,
        backgroundColor: 'white',
        border: (theme) => `1px solid ${theme.palette.primary.main}`,
        width: width || 327,
        height: height || 54,
        boxShadow: '0px 0px 15px rgba(60, 72, 196, 0.1)',
        '&:hover': {
          backgroundColor: 'white',
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
