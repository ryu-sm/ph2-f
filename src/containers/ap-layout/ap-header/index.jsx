import { Icons } from '@/assets';
import { Box, Stack } from '@mui/material';
import { ApHeaderMenuIcon } from '@/assets/icons';

export const ApHeader = ({ hasMenu, menu }) => {
  return (
    <Box
      sx={{
        top: 0,
        width: 1,
        maxWidth: 480,
        zIndex: 2,
        bgcolor: 'white',
        position: 'fixed',
      }}
    >
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Box sx={{ px: 4, py: 3, cursor: 'pointer' }}>
          <Icons.ApHeaderLogo />
        </Box>
        {hasMenu && (
          <Box onClick={menu.onTrue} sx={{ cursor: 'pointer' }}>
            <ApHeaderMenuIcon />
          </Box>
        )}
      </Stack>
    </Box>
  );
};
