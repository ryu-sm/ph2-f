import { Stack, Typography } from '@mui/material';

export const ApNotifyTitle = ({ icon, label }) => {
  return (
    <Stack spacing={2} py={6} alignItems={'center'}>
      {icon}
      <Typography variant="page_title" sx={{ color: (theme) => theme.palette.primary.main }}>
        {label}
      </Typography>
    </Stack>
  );
};
