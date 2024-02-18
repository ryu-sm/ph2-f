import { Stack, Typography } from '@mui/material';

export const ApStarHelp = ({ label, sx, ...props }) => {
  return (
    <Stack direction="row" spacing={'2px'} sx={{ ...sx }} {...props}>
      <Typography variant="note" color={'text.main'}>
        ※
      </Typography>
      {label && (
        <Typography variant="note" color={'text.main'}>
          {label}
        </Typography>
      )}
    </Stack>
  );
};
