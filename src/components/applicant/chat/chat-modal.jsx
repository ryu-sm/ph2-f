import { authAtom } from '@/store';
import { formatApMessage } from '@/utils';
import { Box, Button, Drawer, Stack, Typography } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';

import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ApTextInputField } from '../input';
import { Icons } from '@/assets';
import { ChatMessage } from './chat-message';
import { apGetMessages, insertNewMessage } from '@/services';
import { toast } from 'react-toastify';
import { API_500_ERROR } from '@/constant';

export const ApChatModal = ({ open, onClose }) => {
  const { user } = useRecoilValue(authAtom);

  const [messages, setMessages] = useState([]);

  const fetchData = async () => {
    try {
      const res = await apGetMessages();
      setMessages(res.data);
    } catch (error) {
      console.log(error);
      // toast.error(API_500_ERROR);
    }
  };
  useEffect(() => {
    fetchData();
  }, [open]);

  const firstUnViewedIndex = useMemo(() => {
    return messages.findIndex((item) => {
      return !item?.viewed?.find((i) => i.viewed_account_type === 1);
    });
  }, [messages.length, open]);

  const pApplicationHeaderIdIndex = useMemo(() => {
    return messages.findIndex((item) => !!item?.p_application_header_id);
  }, [messages.length]);

  const initialValues = {
    message: '',
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      if (!values.message) return;
      const data = {
        c_user_id: user.id,
        p_application_header_id:
          pApplicationHeaderIdIndex === -1 ? null : messages[pApplicationHeaderIdIndex]?.p_application_header_id,
        content: formatApMessage(values.message),
      };

      try {
        await insertNewMessage(data);
        await fetchData();
        formik.resetForm();
      } catch (error) {
        console.log(error);
        // toast.error(API_500_ERROR);
      }
    },
  });

  const bottomRef = useRef(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (open || messages.length) {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [messages.length, open]);

  return (
    <Drawer
      sx={{
        '.MuiDrawer-paper': {
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
          maxWidth: 480,
          mx: 'auto',
        },
      }}
      open={open}
      anchor="bottom"
    >
      <Stack
        sx={{
          height: '100vh',
          width: '100%',
          maxWidth: 480,
          backgroundColor: 'background.neutral',
        }}
      >
        {/* title */}
        <Stack
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bgcolor: 'white',
            boxShadow: '0px 2px 10px rgba(60, 72, 196, 0.1)',
            py: '11px',
            borderRadius: '14px 14px 0px 0px',
            maxWidth: 480,
            mx: 'auto',
            zIndex: 9999,
          }}
        >
          <Stack
            sx={{
              position: 'relative',
              width: '100%',
              maxWidth: 480,
              mx: 'auto',
            }}
          >
            <Typography variant="modal_title" color="primary.main">
              メッセージ
            </Typography>
            <Box
              sx={{
                borderRadius: '2px',
                bgcolor: 'transparent',
                minHeight: 44,
                minWidth: 44,
                position: 'absolute',
                right: 0,
                boxShadow: 'none',
                cursor: 'pointer',
              }}
              onClick={async () => await onClose(messages.slice(firstUnViewedIndex).map((item) => item?.id))}
            >
              <Icons.ApArrowCircleDownIcon />
            </Box>
          </Stack>
        </Stack>

        {/* messages */}
        <Stack spacing={3} pt={15} pb={'90px'} bgcolor={'background.neutral'}>
          {messages.map((message, index) => (
            <Fragment key={index}>
              <ChatMessage messageInfo={message} unViewed={index === firstUnViewedIndex} />
            </Fragment>
          ))}
        </Stack>

        {/* input */}
        <Stack ref={bottomRef} />
        <Stack
          direction={'row'}
          alignItems={'flex-end'}
          sx={{
            position: 'fixed',
            bottom: 0,
            px: 4,
            py: 3,
            bgcolor: 'white',
            width: '100%',
            maxWidth: 480,
          }}
          spacing={3}
        >
          <Stack sx={{ width: '100%' }}>
            <FormikProvider value={formik}>
              <ApTextInputField
                placeholder="メッセージを入力"
                name="message"
                multiline={true}
                maxRows={5}
                onKeyDown={formik.handleSubmit}
                sx={{
                  '&.MuiTextField-root': {
                    maxHeight: 'none',
                    width: '100%',
                  },
                  '&& .MuiInputBase-multiline': {
                    padding: 0,
                    alignItems: 'flex-end',
                    maxHeight: 'none',
                    textarea: {
                      py: 3,
                    },
                  },
                  '&&& .MuiInputBase-input': {
                    maxHeight: 'none',
                  },
                }}
              />
            </FormikProvider>
          </Stack>
          <Stack sx={{ pb: 1 }}>
            <Button
              sx={{ borderRadius: '7px', height: 40, width: 40, bgcolor: 'primary.main', color: 'white' }}
              disabled={!formik.values.message}
              onClick={formik.handleSubmit}
            >
              <Icons.ApSendMessageIcon />
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Drawer>
  );
};
