import { useBoolean } from '@/hooks';
import { Box, Stack, Typography } from '@mui/material';

import { useMemo } from 'react';
// import { UpdateHistoryModal } from '../update-history';

export const EditRow = ({ label, isAddendum, isRequired, isLogicRequired, hasPleft, children, error }) => {
  const noticeIcon = useMemo(() => {
    return isRequired ? '○' : isLogicRequired ? '△' : '';
  }, [isRequired, isLogicRequired]);

  const isUpdated = false;

  const updatedModal = useBoolean(false);

  return (
    <Stack
      direction={'row'}
      width={'100%'}
      minHeight={49}
      alignItems={'center'}
      borderBottom={'1px solid'}
      borderColor={'gray.70'}
    >
      <Stack direction={'row'} flex={1} height={'100%'}>
        <Box bgcolor={'gray.20'} width={40} padding={'10px'} color={'gray.100'}>
          <Typography variant="edit_notice_icon">{noticeIcon}</Typography>
        </Box>
        <Box bgcolor={'white'} p={'10px'}>
          <Typography variant="edit_content">{label}</Typography>
        </Box>
      </Stack>

      <Stack direction={'row'} flex={2} height={'100%'}>
        <Box
          sx={{
            width: 44,
            bgcolor: isAddendum ? 'secondary.main' : 'gray.20',
            color: isAddendum ? 'white' : 'gray.100',
            lineHeight: '35px',
            fontSize: '24px',
            textAlign: 'center',
            cursor: isUpdated ? 'pointer' : 'default',
          }}
          onClick={updatedModal.onTrue}
        >
          {isUpdated && '...'}
        </Box>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          bgcolor={'white'}
          p={'10px'}
          flex={1}
          sx={{ pl: hasPleft ? '10px' : '42px', width: 1 }}
        >
          {typeof children === 'string' ? <Typography variant="edit_content">{children}</Typography> : children}
          {error && (
            <Stack sx={{ width: 200 }}>
              <Typography variant="edit_content" color={'secondary.main'}>
                {error}
              </Typography>
            </Stack>
          )}
        </Stack>
      </Stack>

      {/* <UpdateHistoryModal open={open} onClose={handleCloseModal} /> */}
    </Stack>
  );
};
