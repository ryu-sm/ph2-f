import { useTheme } from '@emotion/react';
import { Box, Button, Modal, Stack, Typography, alpha } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const DeleteModal = ({ file_name, open, onClose, onDelete }) => {
  const theme = useTheme();

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      disableAutoFocus
    >
      <Stack
        sx={{
          width: 400,
          maxHeight: '75vh',
          backgroundColor: 'white',
          '&:focus': {
            outline: 'none',
          },
        }}
      >
        <Box ml={'auto'} p={2} onClick={onClose} sx={{ cursor: 'pointer' }}>
          <CloseIcon />
        </Box>
        <Stack px={8} spacing={3}>
          <Typography variant="doc_delete_modal_title" px={3}>
            {`「${file_name}」`}
          </Typography>
          <Typography variant="doc_delete_modal_title" fontWeight={300} px={3}>
            を削除します。よろしいですか？
          </Typography>
        </Stack>

        <Stack direction={'row'} justifyContent={'center'} mt={10} mb={8} spacing={10}>
          <Button
            sx={{
              width: '200px',
              height: '36px',
              bgcolor: 'white',
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
              color: 'primary.main',
              borderRadius: '2px',
              '&:hover': {
                bgcolor: 'white',
                opacity: 0.9,
              },
            }}
            onClick={onClose}
          >
            <Typography variant="doc_download_button">いいえ</Typography>
          </Button>
          <Button
            sx={{
              width: '100px',
              height: '36px',
              mr: 1,
              bgcolor: 'secondary.80',
              borderRadius: '2px',
              '&:hover': {
                bgcolor: 'secondary.80',
                opacity: 0.9,
              },
            }}
            onClick={onDelete}
          >
            <Typography variant="doc_download_button">はい</Typography>
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};
