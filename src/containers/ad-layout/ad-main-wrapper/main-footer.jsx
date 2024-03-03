import { Icons } from '@/assets';
import { Box, Stack } from '@mui/material';

export const MainFooter = () => {
  return (
    <Box zIndex={2}>
      <Stack
        direction={'row'}
        sx={{
          backgroundColor: (theme) => theme.palette.gray[40],
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        px={5}
        py={1}
      >
        <Icons.AdFooterLeftLogo sx={{ width: 131, height: 24 }} />
        <Icons.AdFooterRightLogo sx={{ width: 70, height: 14 }} />
      </Stack>
    </Box>
  );
};
