import { AdLinkIcon } from '@/assets/icons/ad-link-icon';
import { ROLE } from '@/constant';
import { useBoolean } from '@/hooks';
import { useIsManager } from '@/hooks/use-is-manager';
import { applicationAtom } from '@/store';
import { formatAdMessage } from '@/utils/formatAdMessage';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { MessageLinkModal } from './modal/message-link-modal';
import { MessageSendModal } from './modal/message-send-modal';

export const MessageSendPage = () => {
  const { value: openLinkModal, onTrue: handleOpenLinkModal, onFalse: handleCloseLinkModal } = useBoolean(false);
  const setValues = useSetRecoilState(applicationAtom);
  const [messageValue, setMessageValue] = useState('');
  const [checkSend, setCheckSend] = useState(false);
  const { value: openSendModal, onTrue: handleOpenSendModal, onFalse: handleCloseSendModal } = useBoolean(false);

  const pathName = useLocation().pathname;
  const isManager = useIsManager(pathName);
  useEffect(() => {
    if (checkSend) {
      setValues((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            senderType: isManager ? ROLE.ADMIN : ROLE.AGENT,
            viewed: [],
            createdAt: String(Date.now()),
            content: formatAdMessage(messageValue),
            sender_id: '',
          },
        ],
      }));
      setMessageValue('');
    }
  }, [checkSend]);
  return (
    <>
      <Stack flex={1}>
        <Stack
          sx={{
            height: '70%',
            borderRadius: 1,
            border: '1px solid ',
            borderColor: 'primary.40',
            boxShadow: 'inset 0px 4px 6px rgba(44, 54, 156, 0.1)',
            bgcolor: 'white',
            p: 4,
          }}
        >
          <TextField
            multiline
            name="message"
            placeholder="メッセージを入力してください。"
            value={messageValue}
            onChange={(e) => {
              setMessageValue(e.target.value);
            }}
            sx={{
              height: '420px',
              overflowY: 'auto',
              mb: 4,
              '.MuiInputBase-input': {
                color: '#333333',
                border: 'none',
                bgcolor: 'white',
              },
              '&&&& .Mui-focused': {
                '.MuiInputBase-input': {
                  border: 'none',
                },
                fieldset: {
                  border: 'none',
                  boxShadow: 'none',
                },
              },
              '&&&& .Mui-success': {
                '.MuiInputBase-input': {
                  border: 'none',
                },
                fieldset: {
                  border: 'none',
                  boxShadow: 'none',
                },
              },
              '&&&& fieldset': {
                border: 'none',
                boxShadow: 'none',
              },
            }}
            InputProps={{
              sx: {
                'textarea::placeholder': {
                  color: '#BDBDBD',
                  fontFamily: 'Noto Sans JP',
                  fontWeight: 400,
                  lineHeight: '23px',
                  letterSpacing: 0.15,
                  fontSize: 16,
                },

                '&& .MuiInputBase-input': {
                  fontFamily: 'Noto Sans JP',
                  fontWeight: 400,
                  lineHeight: '23px',
                  letterSpacing: 0.15,
                  fontSize: 16,
                  width: '100%',
                },
                p: 0,
              },
            }}
          />
          <Button
            sx={{
              width: 148,
              height: 36,
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
              bgcolor: 'white',
              '&:hover': { opacity: 0.8, bgcolor: 'white' },
            }}
            onClick={handleOpenLinkModal}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <AdLinkIcon />
              <Typography variant="delete_tooltip_text" color="primary.main" sx={{ whiteSpace: 'nowrap' }}>
                リンクを挿入
              </Typography>
            </Stack>
          </Button>
        </Stack>

        <Button
          sx={{
            marginTop: 3,
            marginLeft: 'auto',
            width: 148,
            height: 36,
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': { opacity: 0.8, bgcolor: 'primary.main' },
          }}
          disabled={!messageValue}
          onClick={handleOpenSendModal}
        >
          送信する
        </Button>
      </Stack>

      <MessageLinkModal open={openLinkModal} onClose={handleCloseLinkModal} setMessageValue={setMessageValue} />
      <MessageSendModal open={openSendModal} onClose={handleCloseSendModal} setCheckSend={setCheckSend} />
    </>
  );
};
