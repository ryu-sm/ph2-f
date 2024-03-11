import { useBoolean } from '@/hooks';
import { Box, Stack, Typography } from '@mui/material';

import { useMemo } from 'react';
// import { UpdateHistoryModal } from '../update-history';

export const EditRow = ({ label, isAddendum, isRequired, isLogicRequired, hasPleft, field, subField, error }) => {
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
      height={49}
      alignItems={'center'}
      borderBottom={'1px solid'}
      borderColor={'gray.70'}
    >
      <Stack direction={'row'} flex={1} height={'100%'}>
        <Box bgcolor={'gray.20'} width={40} padding={'10px'} color={'gray.100'}>
          <Typography variant="edit_notice_icon">{noticeIcon}</Typography>
        </Box>
        <Stack bgcolor={'white'} justifyContent={'center'} p={'10px'}>
          <Typography variant="edit_content">{label}</Typography>
        </Stack>
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
          bgcolor={'white'}
          p={'10px'}
          flex={1}
          sx={{ pl: hasPleft ? '10px' : 10, width: 1 }}
        >
          {[field, subField]
            .filter((i) => !!i)
            .map((item, index) => (
              <Stack key={index} flex={subField ? 0.5 : 1}>
                {typeof item === 'string' ? <Typography variant="edit_content">{item}</Typography> : item}
              </Stack>
            ))}
          {error && (
            <Stack sx={{ width: 300, minWidth: 300 }}>
              <Typography variant="edit_content" whiteSpace={'normal'} color={'secondary.main'}>
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
