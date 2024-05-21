import { Icons } from '@/assets';
import { Box, Button, Divider, MenuItem, Modal, Select, Stack, Typography } from '@mui/material';

export const UpAfterResultModal = ({ isOpen, onClose, onConfirm, provisional_after_result, pair_loan_id }) => {
  return (
    <Modal open={isOpen} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} disableAutoFocus>
      <Stack
        sx={{
          width: 660,
          bgcolor: 'white',
          minWidth: 'auto',
          maxHeight: '75vh',
          borderRadius: 2,
        }}
      >
        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'} sx={{ px: 3, py: 3 }}>
          <Icons.AdCloseIcon sx={{ width: 13, height: 12, cursor: 'pointer' }} onClick={onClose} />
        </Stack>
        {!!pair_loan_id ? (
          <Stack spacing={6} sx={{ pt: 4, pb: 8 }}>
            <Stack justifyContent={'center'} alignItems={'center'} direction={'row'} spacing={6}>
              <Typography variant="dailog_warring">
                {`ペアローンをセットで更新します。よろしいですか？\nセットで更新しない場合は、先に「ペアローン解除」をしてください。`}
              </Typography>
            </Stack>

            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={3}>
              <Button
                sx={{
                  bgcolor: 'white',
                  boxShadow: 'none',
                  width: 100,
                  height: '36px',
                  marginBottom: 5,
                  borderRadius: '2px',
                  minHeight: '36px',
                  border: '1px solid',
                  borderColor: (theme) => theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: 'white',
                    border: '1px solid',
                    borderColor: (theme) => theme.palette.primary.main,
                    opacity: 0.8,
                  },
                }}
                onClick={onConfirm}
              >
                <Typography variant="login_button" color="primary.main">
                  OK
                </Typography>
              </Button>
              <Button
                sx={{
                  bgcolor: 'white',
                  boxShadow: 'none',
                  width: 100,
                  height: '36px',
                  marginBottom: 5,
                  borderRadius: '2px',
                  minHeight: '36px',
                  border: '1px solid',
                  borderColor: (theme) => theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: 'white',
                    border: '1px solid',
                    borderColor: (theme) => theme.palette.primary.main,
                    opacity: 0.8,
                  },
                }}
                onClick={onClose}
              >
                <Typography variant="login_button" color="primary.main">
                  キャンセル
                </Typography>
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Stack spacing={6} sx={{ pt: 4, pb: 8 }}>
            <Stack justifyContent={'center'} alignItems={'center'} direction={'row'} spacing={6}>
              <Typography>
                {provisional_after_result === '0'
                  ? '本件は仮審査中の案件から過去の案件に変更しますが、宜しいでしょうか。'
                  : provisional_after_result === '1'
                  ? '本件は仮審査中の案件から本審査中の案件に変更しますが、宜しいでしょうか。'
                  : '本件は本審査中の案件から過去の案件に変更しますが、宜しいでしょうか。'}
              </Typography>
            </Stack>

            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={3}>
              <Button
                sx={{
                  bgcolor: 'white',
                  boxShadow: 'none',
                  width: 100,
                  height: '36px',
                  marginBottom: 5,
                  borderRadius: '2px',
                  minHeight: '36px',
                  border: '1px solid',
                  borderColor: (theme) => theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: 'white',
                    border: '1px solid',
                    borderColor: (theme) => theme.palette.primary.main,
                    opacity: 0.8,
                  },
                }}
                onClick={onConfirm}
              >
                <Typography variant="login_button" color="primary.main">
                  セットで更新する
                </Typography>
              </Button>
              <Button
                sx={{
                  bgcolor: 'white',
                  boxShadow: 'none',
                  width: 100,
                  height: '36px',
                  marginBottom: 5,
                  borderRadius: '2px',
                  minHeight: '36px',
                  border: '1px solid',
                  borderColor: (theme) => theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: 'white',
                    border: '1px solid',
                    borderColor: (theme) => theme.palette.primary.main,
                    opacity: 0.8,
                  },
                }}
                onClick={onClose}
              >
                <Typography variant="login_button" color="primary.main">
                  キャンセル
                </Typography>
              </Button>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Modal>
  );
};
