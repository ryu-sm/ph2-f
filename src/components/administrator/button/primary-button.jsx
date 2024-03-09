import { Button } from '@mui/material';

export const AdPrimaryButton = ({
  children,
  width,
  height,
  borderRadius,
  borderColor,
  fontWeight,
  fontSize,
  color,
  hover,
  ...props
}) => {
  return (
    <Button
      sx={{
        p: 0,
        bgcolor: 'white',
        boxShadow: 'none',
        minHeight: 25,
        width: width || 1,
        height: height || 25,
        borderRadius: borderRadius || 1,
        border: '1px solid',
        borderColor: (theme) => theme.palette.primary.main,
        '&:hover': {
          bgcolor: 'white',
          border: '1px solid',
          borderColor: (theme) => theme.palette.primary.main,
          opacity: 0.8,
          ...hover,
        },
        //
        fontFamily: 'Hiragino Sans',
        fontWeight: fontWeight || 600,
        fontSize: fontSize || 12,
        lineHeight: '150%',
        letterSpacing: 0.06,
        color: color || 'primary.main',
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
