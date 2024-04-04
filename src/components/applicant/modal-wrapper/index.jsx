import { Box, Modal, Stack, Typography } from '@mui/material';

export const ApModalWrapper = ({ open, children, icon, label, maxWidth }) => {
  return (
    <Modal open={open} disableAutoFocus>
      <Stack alignItems={'center'} justifyContent={'center'} sx={{ width: 1, height: 1, maxHeight: '100dvh' }}>
        <Box px={4} sx={{ width: 1, maxWidth: maxWidth || 480 }}>
          <Box sx={{ py: 8, borderRadius: 2, bgcolor: 'white' }}>
            <Stack spacing={6} alignItems={'center'}>
              <Stack spacing={4} alignItems={'center'}>
                {icon}
                <Typography variant="modal_title" sx={{ color: (theme) => theme.palette.primary.main }}>
                  {label}
                </Typography>
              </Stack>
              {children}
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Modal>
  );
};
