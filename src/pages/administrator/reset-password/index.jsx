import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { validationSchema } from './validationSchema';
import { AdAuthWrapper } from '@/containers';
import { adBackground, adLogoCompany } from '@/assets';
import { AdPwdInput } from '@/components/administrator';
import { useCurrSearchParams, useIsManager } from '@/hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '@/router/settings';
import { adManagerResetPassword, adSalesPersonResetPassword } from '@/services';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

export const AdOrSpResetPasswordPage = () => {
  const navigate = useNavigate();
  const token = useCurrSearchParams().get('token');
  const [isValidToken, setIsValidToken] = useState(true);
  const isManager = useIsManager();
  const formik = useFormik({
    initialValues: {
      password: '',
      password_confirm: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const data = { password: values.password, token: token };
        if (isManager) {
          await adManagerResetPassword(data);
          navigate(routeNames.adManagerResetPasswordFinishedPage.path);
          return;
        }
        await adSalesPersonResetPassword(data);
        navigate(routeNames.adSalesPersonResetPasswordFinishedPage.path);
      } catch (error) {
        switch (error?.status) {
          case 400:
            setIsValidToken(false);
            break;
          default:
            toast.error('サーバーとの通信に失敗しました。再度お試しください。');
        }
      }
    },
  });

  useEffect(() => {
    try {
      const { exp } = jwtDecode(token);
      setIsValidToken(exp * 1000 - Date.now() > 0);
    } catch (error) {
      setIsValidToken(false);
    }
  }, [token]);

  useEffect(() => {
    console.log(isManager);
  }, [isManager]);

  return (
    <AdAuthWrapper bgImage={`url(${adBackground})`}>
      {isValidToken ? (
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

            <FormikProvider value={formik}>
              <Stack alignItems={'flex-start'} width={'100%'}>
                <Typography variant="login_input">新しいパスワード</Typography>
                <AdPwdInput placeholder="入力してください" name="password" showPwdVerify={true} />
              </Stack>
              <Stack alignItems={'flex-start'} width={'100%'} mb={10}>
                <Typography variant="login_input">新しいパスワード（確認用）</Typography>
                <AdPwdInput placeholder="入力してください" name="password_confirm" />
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
              メールの有効期限が切れています
            </Typography>
            <Typography variant="annotation_02">
              メール受信後、一定時間内での
              <br />
              操作が確認できなかったため
              <br />
              パスワードの再設定に失敗しました
              <br />
            </Typography>
            <Typography variant="annotation_02" my={5}>
              恐れ入りますが、
              <br />
              再度パスワード再設定の手続きを
              <br />
              お願いいたします。
              <br />
            </Typography>
            <Button
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
              onClick={() => {
                isManager
                  ? navigate(routeNames.adManagerResetPasswordVerifyEmailPage.path)
                  : navigate(routeNames.adSalesPersonResetPasswordVerifyEmailPage.path);
              }}
            >
              <Typography variant="login_button" color="primary.main">
                パスワードの再設定はこちら
              </Typography>
            </Button>
          </Stack>
        </Box>
      )}
    </AdAuthWrapper>
  );
};
