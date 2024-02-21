import { ApArrowCircleDownIcon } from '@/assets/icons/ap-arrow-circle-down';
import { ApSendMessageIcon } from '@/assets/icons/ap-send-message';
import { ROLE } from '@/constant';
import { authAtom } from '@/store';
import { formatMessageInput } from '@/utils';
import { Box, Button, Drawer, Stack, Typography } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import PropTypes from 'prop-types';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ApTextInputField } from '../input';
import { ChatMessage } from './chat-message';

export const ApChatModal = ({ open, onClose }) => {
  const { user } = useRecoilValue(authAtom);

  const initialValues = {
    message: '',
    messages: [
      {
        id: 1,
        sender_id: 1,
        senderType: ROLE.ADMIN,
        viewed: [],
        createdAt: String(Date.now()),
        content: 'xxdefegexx',
      },
      {
        id: 2,
        sender_id: 2,
        senderType: ROLE.USER,
        viewed: [],
        createdAt: '',
        content: 'xxgegegexx',
      },
      {
        id: 3,
        sender_id: 3,
        senderType: ROLE.AGENT,
        viewed: [],
        createdAt: String(Date.now()),
        content: 'xxdefegexx',
      },
      { senderType: ROLE.USER, viewed: [], createdAt: '', content: 'xxxx', id: 4, sender_id: 4 },
      { senderType: ROLE.USER, viewed: [], createdAt: '', content: 'xxxx', id: 5, sender_id: 5 },
    ],
  };
  const formik = useFormik({
    initialValues,
  });

  const bottomRef = useRef(null);
  const handleSendMessage = (value) => {
    formik.setFieldValue('messages', [
      ...formik.values.messages,
      {
        senderType: ROLE.USER,
        viewed: [user.id],
        createdAt: String(Date.now()),
        content: formatMessageInput(value),
        sender_id: user.id,
      },
    ]);
    formik.setFieldValue('message', '');
  };

  const [disabledSubmit, setDisabledSubmit] = useState(false);
  useEffect(() => {
    formik.values.message ? setDisabledSubmit(false) : setDisabledSubmit(true);
  }, [formik.values.message]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (open || formik.values.messages.length) {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [formik.values.messages.length, open]);

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
      onClose={onClose}
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
              onClick={onClose}
            >
              <ApArrowCircleDownIcon />
            </Box>
          </Stack>
        </Stack>

        {/* messages */}
        <Stack spacing={3} pt={15} pb={'90px'} bgcolor={'background.neutral'}>
          {formik.values.messages.map((message, index) => (
            <Fragment key={index}>
              <ChatMessage messageInfo={message} userId={user.id} />
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
                onKeyDown={handleSendMessage}
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
              disabled={disabledSubmit}
              onClick={() => handleSendMessage(formik.values.message)}
            >
              <ApSendMessageIcon />
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Drawer>
  );
};

ApChatModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
