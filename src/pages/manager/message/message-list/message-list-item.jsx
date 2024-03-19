import { SectionDivider } from '@/components/admin/common/Divider';
import { convertMessageDate } from '@/utils';
import { Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
export const MessageListItem = ({ item, isManager }) => {
  const navigator = useNavigate();
  const handleToMessageDetail = () => {
    isManager
      ? navigator(`/manager/message-detail?preliminary_id=${item.id}`)
      : navigator(`/sale-person/message-detail?preliminary_id=${item.id}`);
  };
  return (
    <Stack
      bgcolor={'white'}
      width={'100%'}
      direction={'row'}
      alignItems={'center'}
      height={'60px'}
      borderBottom={(theme) => `1px solid ${theme.palette.gray[80]}`}
      sx={{ cursor: 'pointer' }}
      onClick={handleToMessageDetail}
    >
      <Stack width={'318px'} direction={'row'} alignItems={'center'} py={4} px={6} position={'relative'}>
        {!item.viewed && (
          <Stack
            sx={{
              display: 'inline-block',
              textAlign: 'center',
              bgcolor: 'secondary.main',
              width: '31px',
              borderRadius: 1,
            }}
          >
            <Typography
              sx={{
                color: 'white',
                fontSize: 12,
                fontFamily: 'Noto Sans JP',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '20.02px',
              }}
            >
              新着
            </Typography>
          </Stack>
        )}
        <Typography variant="message_item_info" color={'primary.main'} marginLeft={item.viewed ? '100px' : '75px'}>
          {item.appliant_name}
        </Typography>
        <SectionDivider orientation="vertical" height="55%" top="25%" />
      </Stack>
      <Stack
        width={'190px'}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        p={4}
        position={'relative'}
      >
        <Typography variant="message_item_info">{convertMessageDate(item.created_at)}</Typography>
        <SectionDivider orientation="vertical" height="55%" top="25%" />
      </Stack>
      <Stack width={'calc(100% - 508px)'} p={4} alignItems={'center'} justifyContent={'center'}>
        <Typography variant="message_item_info" width={'100%'}>
          {item.message}
        </Typography>
      </Stack>
    </Stack>
  );
};

MessageListItem.propTypes = {
  item: PropTypes.object,
  isManager: PropTypes.bool,
};
