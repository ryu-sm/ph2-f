import { Icons } from '@/assets';
import { useBoolean, useIsManager } from '@/hooks';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { MessageSendModal } from './message-send-modal';
import { formatAdMessage } from '@/utils';
import { authAtom } from '@/store';
import { insertNewMessage } from '@/services';
import { MessageLinkModal } from './message-link-modal';

export const MessageSend = ({ fetchData, applicant }) => {
  const isManager = useIsManager();
  const { manager, salesPerson } = useRecoilValue(authAtom);
  const { value: openLinkModal, onTrue: handleOpenLinkModal, onFalse: handleCloseLinkModal } = useBoolean(false);
  const { value: openSendModal, onTrue: handleOpenSendModal, onFalse: handleCloseSendModal } = useBoolean(false);

  const initialValues = {
    message: '',
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      handleOpenSendModal();
    },
  });
  const handleSendMessage = async () => {
    const data = {
      c_user_id: applicant?.type === '0' ? applicant?.id : null,
      viewed: [isManager ? manager?.id : salesPerson?.id],
      p_application_header_id: applicant?.type === '1' ? applicant?.id : null,
      content: formatAdMessage(formik.values.message),
    };
    try {
      await insertNewMessage(data);
      await fetchData();
      handleCloseSendModal();
      formik.resetForm();
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };
  const handleInsertLink = (linkValue) => {
    formik.setFieldValue('message', `${formik.values?.message}${linkValue}`);
  };
  return (
    <FormikProvider value={formik}>
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
            value={formik.values.message}
            onChange={(e) => {
              formik.setFieldValue('message', e.target.value);
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
              <Icons.AdLinkIcon />
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
          disabled={!formik.values.message}
          onClick={formik.handleSubmit}
        >
          送信する
        </Button>
      </Stack>

      <MessageLinkModal open={openLinkModal} onClose={handleCloseLinkModal} onConfirm={handleInsertLink} />
      <MessageSendModal open={openSendModal} onClose={handleCloseSendModal} onConfirm={handleSendMessage} />
    </FormikProvider>
  );
};
