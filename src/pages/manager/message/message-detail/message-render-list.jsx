import { Stack } from '@mui/material';
import { useEffect, useRef } from 'react';
import { MessageItem } from './message-item';
import { useRecoilValue } from 'recoil';
import { applicationAtom } from '@/store';

export const MessageRenderListPage = () => {
  const { messages } = useRecoilValue(applicationAtom);
  const bottomRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (open || messages.length) {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [messages.length]);
  return (
    <Stack
      sx={{
        flex: 1,
        maxHeight: 'calc(100vh - 120px)',
        bgcolor: 'white',
        borderRadius: '40px',
        boxShadow: '0px 0px 10px rgba(44, 54, 156, 0.1)',
        pr: '10px',
        py: '10px',
      }}
    >
      <Stack
        sx={{
          pt: 12,
          pb: '90px',
          overflowY: 'auto',
          '&::-webkit-scrollbar-thumb': {
            bgcolor: '#666666',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar': {
            width: '5px',
          },
          '&::-webkit-scrollbar-track': {
            border: 'none',
          },
        }}
        spacing={3}
      >
        {messages.map((message, index) => (
          <MessageItem key={index} messageInfo={message} />
        ))}
        <Stack ref={bottomRef} />
      </Stack>
    </Stack>
  );
};
