import { useTheme } from '@emotion/react';
import { Button, Modal, Stack, Typography, alpha } from '@mui/material';
import PropTypes from 'prop-types';
import { ApplicantSelect } from './applicant-select';
import { FormikProvider, useFormik } from 'formik';
import { yup } from '@/libs';
import { useNavigate } from 'react-router-dom';
export const NewMessageModal = ({ open, onClose, isManager }) => {
  const theme = useTheme();
  const options = [
    {
      value: 'user@gmail.com',
      label: '山田 太郎',
    },
    {
      value: 'user123@gmail.com',
      label: 'user123@gmail.com',
    },
    {
      value: 'user456@gmail.com',
      label: 'user456@gmail.com',
    },
    {
      value: 'user789@gmail.com',
      label: 'user789@gmail.com',
    },
    {
      value: 'user78dd9@gmail.com',
      label: 'user7dd89@gmail.com',
    },
  ];
  const formik = useFormik({
    initialValues: {
      applicant: '',
    },
    validationSchema: yup.object({
      applicant: yup.string().required('顧客名を指定してください。'),
    }),
  });

  const navigator = useNavigate();
  const handleNewMessage = () => {
    formik.submitForm();
    navigator(isManager ? '/manager/message/message-detail' : '/sale-person/message/message-detail');
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        '& .MuiBackdrop-root': {
          backgroundColor: alpha(theme.palette.primary[60], 0.7),
        },
      }}
    >
      <Stack
        sx={{
          width: 400,
          height: 330,
          backgroundColor: 'white',
          borderRadius: 1,
          boxShadow:
            'rgba(0, 0, 0, 0.2) 0px 11px 15px -7px, rgba(0, 0, 0, 0.14) 0px 24px 38px 3px, rgba(0, 0, 0, 0.12) 0px 9px 46px 8px',
          px: 7,
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
          <ApplicantSelect options={options} value="user@gmail.com" name="applicant" />
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
            onClick={handleNewMessage}
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
              formik.values.applicant = '';
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
NewMessageModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  isManager: PropTypes.bool,
};
