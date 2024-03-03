import { AdPwdInput } from '@/components/administrator';
import { Avatar, Button, Modal, Stack, Typography } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { validationSchema } from './validationSchema';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useIsManager } from '@/hooks';
import { adManagerUpdatePassword, adSalesPersonUpdatePassword } from '@/services';
import { Icons } from '@/assets';

export const AdChangePasswordModal = ({ open, onClose }) => {
  const isManager = useIsManager();
  const [warningText, setWarningText] = useState('');
  const formik = useFormik({
    initialValues: {
      password: '',
      new_password: '',
      new_password_confirm: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (isManager) {
          await adManagerUpdatePassword(values);
        } else {
          await adSalesPersonUpdatePassword(values);
        }
        toast.success('パスワードを変更しました。');
        onClose();
      } catch (error) {
        switch (error?.status) {
          case 412:
            setWarningText('現在のパスワードが正しくありません。再度ご確認ください。');
            break;
          default:
            toast.error('サーバーとの通信に失敗しました。再度お試しください。');
        }
      }
    },
  });
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
        boxShadow={'0px 2px 8px rgba(0, 0, 0, 0.15)'}
        bgcolor={'white'}
        borderRadius={'5px'}
        width={'430px'}
        justifyContent={'center'}
        alignItems={'center'}
        p={10}
      >
        <Typography variant="login_title" my={5}>
          パスワード変更
        </Typography>
        {warningText && (
          <Stack mb={5} direction="row" justifyContent="center" alignItems="center" spacing={1}>
            <Typography variant="login_error" fontSize={12} fontWeight={300} whiteSpace={'nowrap'}>
              {warningText}
            </Typography>
          </Stack>
        )}
        <FormikProvider value={formik}>
          <Stack alignItems={'flex-start'} width={'100%'} pb={4}>
            <Typography variant="login_input">現在のパスワード</Typography>
            <AdPwdInput placeholder="入力してください" name="password" />
          </Stack>
          <Stack alignItems={'flex-start'} width={'100%'}>
            <Typography variant="login_input">新しいパスワード</Typography>
            <AdPwdInput placeholder="入力してください" name="new_password" showPwdVerify={true} />
          </Stack>
          <Stack alignItems={'flex-start'} width={'100%'} mb={10}>
            <Typography variant="login_input">新しいパスワード（確認用）</Typography>
            <AdPwdInput placeholder="入力してください" name="new_password_confirm" />
          </Stack>
        </FormikProvider>
        <Button
          disabled={formik.isSubmitting}
          sx={{
            bgcolor: 'white',
            boxShadow: 'none',
            width: '200px',
            height: '36px',
            borderRadius: '2px',
            minHeight: '36px',
            border: '1px solid',
            borderColor: (theme) => theme.palette.primary.main,
            '&:hover': {
              bgcolor: 'white',
              border: '1px solid',
              borderColor: (theme) => theme.palette.primary.main,
              opacity: 0.8,
            },
          }}
          onClick={() => formik.handleSubmit()}
        >
          <Typography variant="login_button" color="primary.main">
            変更する
          </Typography>
        </Button>
      </Stack>
    </Modal>
  );
};
