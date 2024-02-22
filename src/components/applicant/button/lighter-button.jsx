import { Button } from '@mui/material';

export const ApLighterButton = ({ children, width, height, sx, ...props }) => {
  return (
    <Button
      sx={{
        px: 0,
        color: (theme) => theme.palette.primary.main,
        backgroundColor: (theme) => theme.palette.primary[20],

        width: width || 327,
        height: height || 54,
        boxShadow: '0px 0px 15px rgba(60, 72, 196, 0.1)',
        '&:hover': {
          backgroundColor: (theme) => theme.palette.primary[20],
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
