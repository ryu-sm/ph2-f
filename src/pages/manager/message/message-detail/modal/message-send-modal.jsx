import { ApWarningIcon } from '@/assets/icons';
import { useTheme } from '@emotion/react';
import { Button, Modal, Stack, Typography, alpha } from '@mui/material';
import PropTypes from 'prop-types';
export const MessageSendModal = ({ open, onClose, setCheckSend }) => {
  const theme = useTheme();
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& .MuiBackdrop-root': {
          backgroundColor: alpha(theme.palette.primary[60], 0.7),
        },
      }}
    >
      <Stack
        sx={{
          width: 494,
          height: 318,
          p: 8,
          borderRadius: 2,
          backgroundColor: 'white',
          '&:focus': {
            outline: 'none',
          },
        }}
        spacing={6}
      >
        <Typography variant="delete_modal_title">{`メッセージを送信します\nよろしいですか？`}</Typography>
        <Stack
          direction="row"
          alignItems="center"
          spacing={3}
          sx={{
            p: '12px 18px',
            bgcolor: '#fff4f7',
            border: (theme) => `1px solid ${theme.palette.secondary.main}`,
            borderRadius: '8px',
          }}
        >
          <ApWarningIcon sx={{ width: 24, height: 24 }} />
          <Typography variant="delete_modal_icon_text" color="secondary.main">
            {`宛先は確認しましたか？\n個人情報漏洩にご注意ください。`}
          </Typography>
        </Stack>
        <Stack alignItems="center" spacing={6}>
          <Button
            sx={{
              width: 148,
              height: 40,
              bgcolor: 'primary.main',
              borderRadius: '2px',
              '&:hover': {
                bgcolor: 'primary.main',
                opacity: 0.8,
              },
            }}
            onClick={() => {
              setCheckSend(true);
              onClose();
            }}
          >
            <Typography variant="delete_modal_text" color="white">
              送信する
            </Typography>
          </Button>
          <Button
            sx={{
              width: 148,
              height: 40,
              bgcolor: 'white',
              border: '1px solid',
              borderColor: 'primary.main',
              borderRadius: '2px',
              '&:hover': {
                bgcolor: 'white',
                opacity: 0.8,
              },
            }}
            onClick={onClose}
          >
            <Typography variant="delete_modal_text" color="primary.main">
              キャンセル
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

MessageSendModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  setCheckSend: PropTypes.func,
};
