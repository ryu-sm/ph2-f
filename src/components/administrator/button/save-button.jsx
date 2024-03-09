import { Button } from '@mui/material';

export const AdSaveButton = ({ onClick, ...props }) => {
  return (
    <Button
      sx={{
        width: 200,
        padding: '6px 16px',
        bgcolor: 'secondary.main',
        color: 'white',
        boxShadow: 'none',
        fontWeight: 500,
        '&:hover': { bgcolor: 'secondary.main', opacity: 0.8 },
      }}
      onClick={onClick}
      {...props}
    >
      保存
    </Button>
  );
};
