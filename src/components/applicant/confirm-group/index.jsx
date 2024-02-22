import { Stack, Typography } from '@mui/material';

export const ApConfirmGroup = ({ children, label, ...props }) => {
  return (
    <Stack>
      <Stack
        sx={{
          pt: '5px',
          pb: '6px',
          px: 4,
          bgcolor: 'primary.main',
        }}
      >
        <Typography variant="form_item_label" color={'white'}>
          {label}
        </Typography>
      </Stack>
      <Stack>{children}</Stack>
    </Stack>
  );
};
