import { Icons, apSmileChat } from '@/assets';
import { useBoolean } from '@/hooks';
import { apGetMessages, updateMessages } from '@/services';
import { authAtom } from '@/store';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ApChatModal } from './chat-modal';
import { toast } from 'react-toastify';
import { API_500_ERROR } from '@/constant';

export const ApChat = () => {
  const modal = useBoolean(false);
  const authInfo = useRecoilValue(authAtom);
  const [messages, setMessages] = useState([]);

  const fetchData = async () => {
    try {
      const res = await apGetMessages();
      setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hasUnViewed = useMemo(() => {
    return messages.map((item) => !item['viewed'].includes(authInfo?.user?.id)).filter(Boolean);
  }, [messages]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleClose = async (messages_ids) => {
    try {
      await updateMessages({ messages_ids });
      await fetchData();
      modal.onFalse();
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };

  return (
    <Fragment>
      <Button
        sx={{
          px: 5,
          py: '10px',
          width: 272,
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translate(-50%, 0)',
          background: 'linear-gradient(44.71deg, #3C48C4 18%, #6A75DE 56.8%, #AD92D0 94.79%, #AD92D0 94.79%)',
          borderTop: '6px solid #F1F6FD',
          borderLeft: '6px solid #F1F6FD',
          borderRight: '6px solid #F1F6FD',
          borderRadius: '20px 20px 0px 0px',
        }}
        onClick={modal.onTrue}
      >
        <Stack spacing={2} direction={'row'} alignItems={'center'} justifyContent={'center'}>
          <Avatar
            variant="square"
            src={apSmileChat}
            sx={{
              width: 22,
              height: 22,
              '.MuiAvatar-img': {
                objectFit: 'contain',
              },
            }}
          />
          <Typography variant="label" sx={{ color: 'white' }}>
            みらいバンクとチャット連絡
          </Typography>
        </Stack>
      </Button>
      {hasUnViewed.length > 0 && (
        <>
          <Stack
            sx={{
              position: 'fixed',
              bottom: 48,
              left: '50%',
              transform: 'translate(-50%, 0)',
              zIndex: 1,
              bgcolor: 'secondary.main',
              py: 1,
              borderRadius: '6px',
              width: 200,
              textAlign: 'center',
            }}
          >
            <Typography variant="chat_new_message" color={'white'}>
              新着メッセージが届いています！
            </Typography>
          </Stack>
          <Stack
            sx={{
              position: 'fixed',
              bottom: 40,
              left: '50%',
              transform: 'translate(-50%, 0)',
            }}
          >
            <Icons.ApChatBubbleIcon />
          </Stack>
        </>
      )}
      <ApChatModal open={modal.value} onClose={handleClose} />
    </Fragment>
  );
};
