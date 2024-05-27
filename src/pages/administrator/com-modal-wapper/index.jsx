import { Icons } from '@/assets';
import { Box, Modal, Stack } from '@mui/material';
import Draggable from 'react-draggable';

export const ComModalWapper = ({ children, open, onClose }) => {
  return (
    <Modal open={open} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} disableAutoFocus>
      <Box>
        <Draggable>
          <Stack
            sx={{
              cursor: 'move',
              bgcolor: 'white',
              boxShadow:
                'rgba(0, 0, 0, 0.2) 0px 11px 15px -7px, rgba(0, 0, 0, 0.14) 0px 24px 38px 3px, rgba(0, 0, 0, 0.12) 0px 9px 46px 8px',
            }}
          >
            <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'} sx={{ p: 3, height: 30 }}>
              {onClose && <Icons.AdCloseIcon sx={{ width: 13, height: 12, cursor: 'pointer' }} onClick={onClose} />}
            </Stack>
            <Stack sx={{ px: 8 }}>{children}</Stack>
          </Stack>
        </Draggable>
      </Box>
    </Modal>
  );
};
