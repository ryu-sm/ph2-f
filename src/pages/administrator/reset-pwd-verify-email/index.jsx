import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';

import { useNavigate } from 'react-router-dom';

import { validationSchema } from './validationSchema';
import { useIsManager } from '@/hooks';
import { Icons, adBackground, adLogoCompany } from '@/assets';
import { AdEmailInput } from '@/components/administrator';
import { AdAuthWrapper } from '@/containers';
import { useState } from 'react';
import { adManagerResetPasswordVerifyEmail, adSalesPersonResetPasswordVerifyEmail } from '@/services';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export const AdOrSpResetPasswordVerifyEmailPage = () => {
  const navigate = useNavigate();
  const isManager = useIsManager();
  const [sended, setSended] = useState(false);
  const [warningText, setWarningText] = useState('');
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (isManager) {
          await adManagerResetPasswordVerifyEmail(values);
          setSended(true);
          return;
        }
        await adSalesPersonResetPasswordVerifyEmail(values);
        setSended(true);
      } catch (error) {
        switch (error?.status) {
          case 400:
            toast.error('このメールアドレスは登録されません。');
            break;
          default:
            toast.error('サーバーとの通信に失敗しました。再度お試しください。');
        }
      }
    },
  });

  return (
    <AdAuthWrapper bgImage={`url(${adBackground})`}>
      {!sended ? (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} minHeight={'100vh'}>
          <Stack
            boxShadow={'0px 2px 8px rgba(0, 0, 0, 0.15)'}
            bgcolor={'white'}
            borderRadius={'5px'}
            width={'430px'}
            justifyContent={'center'}
            alignItems={'center'}
            p={10}
          >
            <Avatar src={adLogoCompany} variant="square" sx={{ height: '64px', width: '272px' }} />
            <Typography variant="login_title" my={5}>
              パスワード再設定
            </Typography>
            <Typography variant="annotation_01">ご登録のメールアドレスを入力してください。</Typography>
            <Typography variant="annotation_01" mb={10}>
              パスワード再設定用のメールをお送りします。
            </Typography>
            <FormikProvider value={formik}>
              <Stack alignItems={'flex-start'} width={'100%'} mb={10}>
                <Typography variant="login_input">メールアドレス</Typography>
                <AdEmailInput placeholder="入力してください" name="email" />
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
                再設定メールを送信
              </Typography>
            </Button>
          </Stack>
        </Box>
      ) : (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} minHeight={'100vh'}>
          <Stack
            boxShadow={'0px 2px 8px rgba(0, 0, 0, 0.15)'}
            bgcolor={'white'}
            borderRadius={'5px'}
            width={'430px'}
            justifyContent={'center'}
            alignItems={'center'}
            p={10}
          >
            <Avatar src={adLogoCompany} variant="square" sx={{ height: '64px', width: '272px' }} />
            <Typography variant="login_title" my={5}>
              メールを送信しました
            </Typography>
            <Typography variant="annotation_01">メールに記載されているURLにアクセスし</Typography>
            <Typography variant="annotation_01">パスワード再設定を完了してください。</Typography>
          </Stack>
        </Box>
      )}
    </AdAuthWrapper>
  );
};
