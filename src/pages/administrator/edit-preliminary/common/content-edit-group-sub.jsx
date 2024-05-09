import { IconButton, Stack, Typography } from '@mui/material';
import { Clear } from '@mui/icons-material';

export const ContentEditGroupSub = ({ children, label, subLabel, handleDeleteItem, ...props }) => {
  return (
    <Stack sx={{ width: 1, height: 1, pb: 3 }}>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{ width: 1, py: 4, px: 2 }}>
        <Stack direction={'row'} alignItems={'flex-end'} justifyContent={'flex-start'} sx={{ height: 24 }}>
          <Typography
            variant="edit_content_title"
            color={'gray.100'}
            fontSize={15}
            lineHeight={'100%'}
            fontWeight={700}
          >
            {label}
          </Typography>
          <Typography variant="edit_content_title" color={'gray.100'} lineHeight={'100%'} fontWeight={600}>
            {subLabel}
          </Typography>
        </Stack>
        <IconButton
          sx={{
            height: 24,
            width: 24,
            bgcolor: 'secondary.main',
            color: (theme) => theme.palette.white,
            '&:hover': { bgcolor: 'secondary.main', color: (theme) => theme.palette.white },
          }}
          onClick={handleDeleteItem}
        >
          <Clear sx={{ width: 16, height: 16 }} />
        </IconButton>
      </Stack>

      <Stack sx={{ width: 1, overflow: 'auto', pb: '10px', borderTop: '1px solid', borderColor: 'gray.70' }}>
        {children}
      </Stack>
    </Stack>
  );
};
