import { useBoolean } from '@/hooks';
import { Box, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { UpdateHistoryModal } from '../update-history';

export const EditRow = ({ item, label, requiredSupply, hasDropDown, content, component, supplyComponent }) => {
  const noticeIcon = useMemo(() => {
    return item.isRequired ? '○' : '△';
  }, [item]);

  const { value: open, onTrue: handleOpenModal, onFalse: handleCloseModal } = useBoolean(false);
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
            bgcolor: requiredSupply ? 'secondary.main' : 'gray.20',
            color: requiredSupply ? 'white' : 'gray.100',
            lineHeight: '35px',
            fontSize: '24px',
            textAlign: 'center',
            cursor: item.isUpdated ? 'pointer' : 'default',
          }}
          onClick={handleOpenModal}
        >
          {item.isUpdated && '...'}
        </Box>
        <Stack
          direction={'row'}
          alignItems={'center'}
          bgcolor={'white'}
          p={'10px'}
          flex={1}
          paddingLeft={!hasDropDown ? '25px' : '10px'}
        >
          {supplyComponent
            ? [component, supplyComponent].map((comp, index) => (
                <Stack key={index} flex={0.5}>
                  {comp}
                </Stack>
              ))
            : component || <Typography variant="edit_content">{content}</Typography>}
        </Stack>
      </Stack>

      <UpdateHistoryModal open={open} onClose={handleCloseModal} />
    </Stack>
  );
};

EditRow.propTypes = {
  item: PropTypes.object,
  label: PropTypes.string,
  content: PropTypes.string,
  requiredSupply: PropTypes.bool,
  component: PropTypes.node,
  supplyComponent: PropTypes.node,
  hasDropDown: PropTypes.bool,
};
