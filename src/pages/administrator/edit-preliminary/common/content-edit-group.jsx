import { AdSaveButton } from '@/components/administrator/button';
import { Stack, Typography } from '@mui/material';

export const ContentEditGroup = ({ children, label, handleSave, isEditable, maxHeight, ...props }) => {
  return (
    <Stack sx={{ width: 1, height: 1, maxHeight: maxHeight || 1 }}>
      {isEditable && (
        <Stack direction={'row'} justifyContent={'flex-end'} sx={{ width: 1, py: 3 }}>
          <AdSaveButton onClick={handleSave} />
        </Stack>
      )}

      {label && (
        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} sx={{ width: 1 }}>
          <Typography variant="edit_content_title" color={'gray.100'} flex={1} fontWeight={600}>
            {label}
          </Typography>
        </Stack>
      )}

      <Stack
        direction={'row'}
        alignItems={'center'}
        sx={{ width: 1, borderBottom: (theme) => `1px solid ${theme.palette.gray[100]}` }}
      >
        <Typography variant="edit_content_title" color={'gray.100'} flex={1} textAlign={'center'}>
          入力項目
        </Typography>
        <Typography variant="edit_content_title" color={'gray.100'} flex={1} textAlign={'center'}>
          入力内容
        </Typography>
      </Stack>
      <Stack sx={{ width: 1, maxHeight: 'calc(100dvh - 420px)', overflow: 'auto', pb: '10px' }}>{children}</Stack>
    </Stack>
  );
};
