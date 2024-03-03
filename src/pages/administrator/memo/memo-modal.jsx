import { Icons } from '@/assets';
import { Box, Button, Divider, Modal, Stack, TextField, Typography } from '@mui/material';

export const AdMemoModal = ({ isOpen, onClose, id, content, onChange, handleSave }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      disableAutoFocus
    >
      <Stack
        sx={{
          width: 660,
          bgcolor: 'white',
          minWidth: 'auto',
          maxHeight: '75vh',
          borderRadius: 1,
        }}
      >
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{ px: 3 }}>
          <Box width={13} />
          <Stack sx={{ width: '100%', py: 3 }}>
            <Typography variant="main_page_title" color="gray.100" sx={{ textAlign: 'center' }}>
              {id ? 'メモ詳細' : 'メモ作成'}
            </Typography>
          </Stack>
          <Icons.AdCloseIcon sx={{ width: 13, height: 12, cursor: 'pointer' }} onClick={onClose} />
        </Stack>
        <Divider />
        <Stack spacing={2}>
          <Stack alignItems={'center'} sx={{ px: 2, pt: 2 }}>
            <TextField
              fullWidth
              multiline
              rows={13}
              name="memo"
              value={content}
              placeholder="連絡する事項を入力してください。"
              InputProps={{
                sx: {
                  bgcolor: 'bg_off',
                  'textarea::placeholder': {
                    color: 'placeholder',
                    fontFamily: 'Noto Sans JP',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: '23px',
                    letterSpacing: 0.15,
                  },
                  '&& .MuiInputBase-input': {
                    fontFamily: 'Noto Sans JP',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: '23px',
                    letterSpacing: 0.15,
                  },
                  '&&&&&&& .MuiInputBase-input': {
                    borderRadius: 0,
                    height: '390px',
                  },
                  '&&&&&&&&& fieldset': {
                    border: '1px solid',
                    borderColor: 'gray.80',
                    boxShadow: '4px 4px 10px 0px rgba(197, 200, 227, 0.30) inset',
                  },
                  py: 2,
                  height: '100%',
                  borderRadius: 0,
                },
              }}
              onChange={onChange}
            />
          </Stack>
          <Stack
            alignItems={'center'}
            justifyContent={'center'}
            sx={{ height: 54, bgcolor: 'primary.20', borderRadius: '0px 0px 4px 4px' }}
          >
            <Button
              disabled={!content}
              sx={{
                bgcolor: 'white',
                boxShadow: 'none',
                width: '200px',
                height: '36px',
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
              onClick={handleSave}
            >
              <Typography variant="login_button" color="primary.main">
                保存
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Modal>
  );
};
