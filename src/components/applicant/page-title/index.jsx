import { Icons } from '@/assets';
import { Box, Stack, Typography } from '@mui/material';

export const ApPageTitle = ({ children, error, py }) => {
  return (
    <Stack spacing={6} alignItems={'center'} sx={{ py: py || 6 }}>
      <Typography variant="page_title" sx={{ color: (theme) => theme.palette.primary.main }}>
        {children}
      </Typography>
      {!!error && (
        <Stack spacing={6} sx={{ width: 1, px: 4 }}>
          <Box
            sx={{
              py: 2,
              px: 4,
              bgcolor: (theme) => theme.palette.secondary[20],
              border: (theme) => `1px solid ${theme.palette.secondary.main}`,
              borderRadius: 2,
            }}
          >
            <Stack spacing={3} direction={'row'} alignItems={'center'}>
              <Icons.ApWarningIcon />
              <Typography variant="waring" sx={{ color: (theme) => theme.palette.secondary.main, textAlign: 'left' }}>
                {error}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      )}
    </Stack>
  );
};
