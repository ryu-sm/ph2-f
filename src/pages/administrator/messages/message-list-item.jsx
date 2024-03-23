import { useIsManager } from '@/hooks';
import { authAtom } from '@/store';
import { Divider, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
export const MessageListItem = ({ item }) => {
  const navigator = useNavigate();
  const isManager = useIsManager();
  const { manager, salesPerson } = useRecoilValue(authAtom);
  const handleToMessageDetail = () => {
    isManager
      ? navigator(`/manager/messages-detail?id=${item.id}&type=${item.type}`)
      : navigator(`/sales-person/messages-detail?id=${item.id}&type=${item.type}`);
  };
  const isNew = useMemo(() => {
    if (isManager) {
      return !item.viewed.includes(manager?.id);
    } else {
      return !item.viewed.includes(salesPerson?.id);
    }
  }, [item]);
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
      py={4}
      divider={<Divider orientation="vertical" flexItem />}
    >
      <Stack width={'318px'} direction={'row'} alignItems={'center'} py={4} px={6} position={'relative'}>
        {isNew && (
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
          {item.name}
        </Typography>
      </Stack>
      <Stack
        width={'190px'}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        p={4}
        position={'relative'}
      >
        <Typography variant="message_item_info">{item.created_at.split(' ')[0]}</Typography>
      </Stack>
      <Stack
        width={'calc(100% - 508px)'}
        maxWidth={'calc(100% - 508px)'}
        p={4}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Typography
          variant="message_item_info"
          width={'100%'}
          overflow={'hidden'}
          whiteSpace={'nowrap'}
          textOverflow={'ellipsis'}
        >
          {item.content
            .replace(/<span[^>]*>/g, '')
            .replace(/<\/span>/g, '')
            .replace(/<\/br>/g, '')}
        </Typography>
      </Stack>
    </Stack>
  );
};
