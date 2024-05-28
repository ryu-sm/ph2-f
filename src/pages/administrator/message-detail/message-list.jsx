import { Stack } from '@mui/material';
import { useEffect, useRef } from 'react';
import { MessageItem } from './message-item';
import { useIsManager } from '@/hooks';
import { updateMessages } from '@/services';
import { toast } from 'react-toastify';

export const MessageList = ({ messages = [], applicant, fetchData }) => {
  const isManager = useIsManager();
  const bottomRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (open || messages.length) {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [messages.length]);

  const firstUnViewedIndex = () => {
    if (isManager) {
      return messages.findIndex((item) => {
        return !item?.viewed?.find((i) => i.viewed_account_type === 3);
      });
    } else {
      return messages.findIndex((item) => {
        return !item?.viewed?.find((i) => i.viewed_account_type === 2);
      });
    }
  };

  const updateMessagesStatus = async () => {
    try {
      const index = firstUnViewedIndex();

      if (index === -1) return;
      const messages_ids = messages.slice(index).map((item) => item['id']);
      if (messages_ids.length > 0) {
        await updateMessages({ messages_ids });
      }
    } catch (error) {
      console.log(error);
      // toast.error(API_500_ERROR);
    }
  };

  useEffect(() => {
    updateMessagesStatus();
  }, [messages.length]);

  return (
    <Stack
      sx={{
        flex: 1,
        minHeight: 'calc(100vh - 120px)',
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
          flex: 1,
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
          <MessageItem
            key={index}
            messageInfo={message}
            unViewed={index === firstUnViewedIndex()}
            applicant={applicant}
            fetchData={fetchData}
          />
        ))}
        <Stack ref={bottomRef} />
      </Stack>
    </Stack>
  );
};
