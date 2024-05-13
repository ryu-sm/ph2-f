import { Icons } from '@/assets';
import { Modal, Stack, Typography } from '@mui/material';

export const UnOperateAccessModal = ({ isOpen, onClose }) => {
  return (
    <Modal open={isOpen} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} disableAutoFocus>
      <Stack
        sx={{
          width: 600,
          bgcolor: 'white',
          minWidth: 'auto',
          maxHeight: '75vh',
          borderRadius: 2,
        }}
      >
        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'} sx={{ px: 3, py: 3 }}>
          <Icons.AdCloseIconMain sx={{ width: 13, height: 12, cursor: 'pointer' }} onClick={onClose} />
        </Stack>
        <Stack spacing={6} sx={{ pt: 2, pb: 8 }}>
          <Stack justifyContent={'center'} alignItems={'center'} spacing={6}>
            <Typography variant="dailog_warring">エラーが発生しました。</Typography>
            <Typography variant="dailog_content" color="secondary.main">
              あなたはこの操作権限を持っていません。
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Modal>
  );
};
