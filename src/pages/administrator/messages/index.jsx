import { AdSortListButton } from '@/components/administrator/button';
import AddIcon from '@mui/icons-material/Add';
import { API_500_ERROR } from '@/constant';
import { AdMainWrapper } from '@/containers';
import { useBoolean, useIsManager } from '@/hooks';
import { adGetManagerMessages, adGetSalesPersonMessages } from '@/services';
import { Button, Divider, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MessageListItem } from './message-list-item';
import { NewMessageModal } from './new-message-modal';

export const AdMessagesPages = () => {
  const [messages, setMessages] = useState([]);
  const isManager = useIsManager();
  const { value: open, onTrue: handleOpenModal, onFalse: handleCloseModal } = useBoolean(false);
  const fetchData = async () => {
    try {
      if (isManager) {
        const res = await adGetManagerMessages();
        setMessages(res.data);
      } else {
        const res = await adGetSalesPersonMessages();
        setMessages(res.data);
      }
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdMainWrapper
      leftContent={
        <Stack direction={'row'} spacing={4}>
          <Typography variant="main_page_title" color="text.normal">
            お客様とのメッセージ一覧
          </Typography>
          {isManager && (
            <Button
              sx={{
                width: '93px',
                height: '25px',
                bgcolor: 'white',
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
                color: 'primary.main',
                borderRadius: 1,
                '&:hover': {
                  bgcolor: 'white',
                  opacity: 0.9,
                },
              }}
              onClick={handleOpenModal}
            >
              <AddIcon sx={{ width: 16, height: 16 }} />
              <Typography variant="new_message_button" whiteSpace={'nowrap'}>
                新規作成
              </Typography>
            </Button>
          )}
          <NewMessageModal open={open} onClose={handleCloseModal} messages={messages} />
        </Stack>
      }
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        height={'40px'}
        sx={{ py: '10px' }}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} width={'318px'} position={'relative'}>
          <Typography variant="message_filter">申込人</Typography>
          <AdSortListButton />
        </Stack>

        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} width={'190px'} position={'relative'}>
          <Typography variant="message_filter">日付</Typography>
          <AdSortListButton />
        </Stack>

        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          width={'calc(100% - 508px)'}
          position={'relative'}
        >
          <Typography variant="message_filter">連絡内容</Typography>
        </Stack>
      </Stack>
      {messages.map((item) => (
        <MessageListItem key={item?.id} item={item} />
      ))}
    </AdMainWrapper>
  );
};
