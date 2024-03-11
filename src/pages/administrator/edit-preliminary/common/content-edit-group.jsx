import { AdSaveButton } from '@/components/administrator/button';
import { IconButton, Stack, Typography } from '@mui/material';
import { Clear } from '@mui/icons-material';

export const ContentEditGroup = ({
  children,
  label,
  subLabel,
  handleSave,
  handleDeleteItem,
  isEditable,
  maxHeight,
  hiddenTitle,
  ...props
}) => {
  return (
    <Stack sx={{ width: 1, height: 1, maxHeight: maxHeight || 1 }}>
      {isEditable && (
        <Stack direction={'row'} justifyContent={'flex-end'} sx={{ width: 1, py: 3 }}>
          <AdSaveButton onClick={handleSave} />
        </Stack>
      )}

      {label && (
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{ width: 1, py: 2 }}>
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
            {subLabel && (
              <Typography variant="edit_content_title" color={'gray.100'} lineHeight={'100%'} fontWeight={600}>
                {subLabel}
              </Typography>
            )}
          </Stack>
          {handleDeleteItem && (
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
          )}
        </Stack>
      )}

      <Stack
        direction={'row'}
        alignItems={'center'}
        sx={{ width: 1, borderBottom: (theme) => `1px solid ${theme.palette.gray[100]}` }}
      >
        {!hiddenTitle && (
          <Typography variant="edit_content_title" color={'gray.100'} flex={1} fontWeight={600} textAlign={'center'}>
            入力項目
          </Typography>
        )}
        {!hiddenTitle && (
          <Typography variant="edit_content_title" color={'gray.100'} flex={1} fontWeight={600} textAlign={'center'}>
            入力内容
          </Typography>
        )}
      </Stack>
      <Stack sx={{ width: 1, maxHeight: 'calc(100dvh - 420px)', overflow: 'auto', pb: '10px' }}>{children}</Stack>
    </Stack>
  );
};
