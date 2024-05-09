import { Button, Modal, Stack, Typography } from '@mui/material';

import { ApplicantSelect } from './applicant-select';
import { FormikProvider, useFormik } from 'formik';
import { yup } from '@/libs';
import { useNavigate } from 'react-router-dom';
import { useIsManager } from '@/hooks';
import { useEffect } from 'react';

export const NewMessageModal = ({ open, onClose, messages }) => {
  const isManager = useIsManager();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      applicantId: '',
    },
    validationSchema: yup.object({
      applicantId: yup.string().required('顧客名を指定してください。'),
    }),
    onSubmit: (values) => {
      const message = messages.find((item) => item.id === values.applicantId);
      isManager
        ? navigate(`/manager/messages-detail?id=${message?.id}&type=${message?.type}`)
        : navigate(`/sale-persons/messages-detail?id=${message?.id}&type=${message?.type}`);
    },
  });
  useEffect(() => {
    formik.resetForm();
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
      disableAutoFocus
    >
      <Stack
        sx={{
          width: 400,
          backgroundColor: 'white',
          borderRadius: 1,
          boxShadow:
            'rgba(0, 0, 0, 0.2) 0px 11px 15px -7px, rgba(0, 0, 0, 0.14) 0px 24px 38px 3px, rgba(0, 0, 0, 0.12) 0px 9px 46px 8px',
          px: 7,
          pb: 4,
          '&:focus': {
            outline: 'none',
          },
        }}
      >
        <Typography
          variant="message_modal_title"
          sx={{
            mt: 8,
            mb: 6,
            textAlign: 'center',
          }}
        >
          メッセージ新規作成
        </Typography>
        <Typography variant="message_modal_select_title" sx={{ mb: 1 }}>
          顧客名
        </Typography>
        <FormikProvider value={formik}>
          <ApplicantSelect options={messages} name="applicantId" />
        </FormikProvider>

        <Stack alignItems={'center'} mt={8} spacing={5}>
          <Button
            sx={{
              width: '148px',
              height: '40px',
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.main',
                opacity: 0.8,
              },
            }}
            disabled={!formik.values.applicantId}
            onClick={formik.handleSubmit}
          >
            <Typography variant="message_modal_button">新規作成</Typography>
          </Button>
          <Button
            sx={{
              width: '148px',
              height: '40px',
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'white',
                opacity: 0.8,
              },
            }}
            onClick={() => {
              formik.values.applicantId = '';
              onClose();
            }}
          >
            <Typography variant="message_modal_button">キャンセル</Typography>
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};
