import { Box, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import PropTypes from 'prop-types';

export const EditRow = ({ item, label, requiredSupply, content, component }) => {
  const noticeIcon = useMemo(() => {
    return item.isRequired ? '○' : '△';
  }, [item]);
  return (
    <Stack
      direction={'row'}
      width={'100%'}
      height={49}
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
            bgcolor: requiredSupply ? 'secondary.main' : 'gray.20',
            color: requiredSupply ? 'white' : 'gray.100',
            lineHeight: '35px',
            fontSize: '24px',
            textAlign: 'center',
            cursor: item.isUpdated ? 'pointer' : 'default',
          }}
        >
          {item.isUpdated && '...'}
        </Box>
        <Stack direction={'row'} alignItems={'center'} bgcolor={'white'} p={'10px'}>
          {component ? component : <Typography variant="edit_content">{content}</Typography>}
        </Stack>
      </Stack>
    </Stack>
  );
};

EditRow.propTypes = {
  item: PropTypes.object,
  label: PropTypes.string,
  content: PropTypes.string,
  component: PropTypes.node,
  requiredSupply: PropTypes.bool,
};
