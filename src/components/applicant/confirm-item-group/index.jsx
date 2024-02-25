import { Stack, Typography } from '@mui/material';

export const ApConfirmItemGroup = ({ children, label, sx, ...props }) => {
  return (
    <Stack>
      <Stack sx={{ py: '3px', px: 4, bgcolor: (theme) => theme.palette.primary[40], width: 1 }}>
        <Typography variant="label" color={'text.main'} lineHeight={'130%'} whiteSpace={'break-spaces'}>
          {label}
        </Typography>
      </Stack>
      <Stack sx={{ px: 6, py: 3, bgcolor: 'white', ...sx }} alignItems={'start'}>
        {typeof children === 'string' ? (
          <Typography variant="modal_label" color={'text.main'}>
            {children}
          </Typography>
        ) : (
          children
        )}
      </Stack>
    </Stack>
  );
};
