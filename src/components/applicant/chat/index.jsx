import { apSmileChat } from '@/assets';
import { ApChatBubbleIcon } from '@/assets/icons/ap-chat-bubble';
import { useBoolean } from '@/hooks';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import { Fragment, useState } from 'react';
import { ApChatModal } from './chat-modal';

export const ApChat = () => {
  const { value: isChatOpen, onTrue: setChatOpen, onFalse: setChatClose } = useBoolean(false);
  const [hasUnread] = useState(false);
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
        onClick={setChatOpen}
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
      {hasUnread && (
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
            <ApChatBubbleIcon />
          </Stack>
        </>
      )}
      <ApChatModal open={isChatOpen} onClose={setChatClose} />
    </Fragment>
  );
};
