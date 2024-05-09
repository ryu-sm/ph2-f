import { useIsManager } from '@/hooks';
import { authAtom } from '@/store';
import { formatAdMessage } from '@/utils';
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
      <Stack
        width={'318px'}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        py={4}
        px={6}
        position={'relative'}
        spacing={8}
      >
        <Stack
          sx={{
            display: 'inline-block',
            textAlign: 'center',
            bgcolor: 'secondary.main',
            width: '31px',
            borderRadius: 1,
          }}
        >
          {item?.unviewed === '1' && (
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
          )}
        </Stack>
        <Stack
          sx={{
            display: 'inline-block',
            textAlign: 'start',
            width: 'calc(100% - 31px)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <Typography variant="message_item_info" color={'primary.main'} textAlign={'start'}>
            {item.name}
          </Typography>
        </Stack>
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
          dangerouslySetInnerHTML={{
            __html: item.content.replace(/<\/br>/g, '').replace(/<br>/g, ''),
          }}
        />
      </Stack>
    </Stack>
  );
};
