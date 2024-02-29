import { AdCircleNotice } from '@/assets/icons/ad-circle-notice';
import background from '@/assets/images/ad-background.png';
import logoCompany from '@/assets/images/logo-company.png';
import { AdEmailInput } from '@/components/admin/common/Input/email-input';
import { AdPwdInput } from '@/components/admin/common/Input/pwd-input';
import { REGEX, ROLE, YUP_MESSAGES } from '@/constant';
import { AdLoginWrapper } from '@/containers/ad-layout/ad-login-wrapper';
import { useIsManager } from '@/hooks/use-is-manager';
import { yup } from '@/libs';
import { authAtom } from '@/store';
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
export const AdOrSpLoginPage = () => {
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const isManager = useIsManager(pathName);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    email: yup.string().required().email(YUP_MESSAGES.AD_LOGIN_EMAIL_INVALID),
    password: yup
      .string()
      .required()
      .min(8, YUP_MESSAGES.AD_LOGIN_PASSWORD_MIN)
      .max(20, YUP_MESSAGES.AD_LOGIN_PASSWORD_MAX)
      .matches(REGEX.PASSWORD, YUP_MESSAGES.AD_LOGIN_PASSWORD_INVALID),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
  });

  const [isLoginError, setIsLoginError] = useState(true);
  const setAuthInfo = useSetRecoilState(authAtom);
  const handleLogin = () => {
    setAuthInfo((pre) => {
      return {
        ...pre,
        isLogined: true,
        loginType: isManager ? ROLE.ADMIN : ROLE.AGENT,
        applayType: isManager ? ROLE.ADMIN : ROLE.AGENT,

        manager: isManager
          ? {
              id: null,
              email: formik.values.email,
            }
          : pre.manager,
        salesPerson: isManager
          ? pre.salesPerson
          : {
              id: null,
              email: formik.values.email,
            },
      };
    });
  };

  return (
    <AdLoginWrapper bgImage={`url(${background})`}>
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} minHeight={'100vh'}>
        <Stack
          boxShadow={'0px 2px 8px rgba(0, 0, 0, 0.15)'}
          bgcolor={'white'}
          borderRadius={'5px'}
          width={'430px'}
          justifyContent={'center'}
          alignItems={'center'}
          p={10}
          onKeyDown={handleLogin}
        >
          <Avatar src={logoCompany} variant="square" sx={{ height: '64px', width: '272px' }} />
          <Typography variant="login_title" my={5}>
            ログイン
          </Typography>
          {isLoginError && (
            <Stack my={5} direction="row" justifyContent="center" alignItems="center" spacing={1}>
              <AdCircleNotice />
              <Typography variant="login_error" whiteSpace={'nowrap'}>
                メールアドレスまたはパスワードが正しくありません。
              </Typography>
            </Stack>
          )}

          <FormikProvider value={formik}>
            <Stack alignItems={'flex-start'} width={'100%'} mb={4}>
              <Typography variant="login_input">メールアドレス</Typography>
              <AdEmailInput placeholder="入力してください" name="email" />
            </Stack>
            <Stack alignItems={'flex-start'} width={'100%'} mb={10}>
              <Typography variant="login_input">パスワード</Typography>
              <AdPwdInput placeholder="入力してください" name="password" />
            </Stack>
          </FormikProvider>
          <Button
            disabled={formik.isSubmitting}
            sx={{
              bgcolor: 'white',
              boxShadow: 'none',
              width: '200px',
              height: '36px',
              marginBottom: 5,
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
              ログイン
            </Typography>
          </Button>

          <Typography variant="login_footer">
            パスワードを忘れた方はこ
            <Typography
              variant="login_footer_link"
              color="primary.main"
              onClick={() => {
                isManager ? navigate('/manager/reset-password') : navigate('/agent/reset-password');
              }}
            >
              ちらから設定
            </Typography>
            をお願いします
          </Typography>
        </Stack>
      </Box>
    </AdLoginWrapper>
  );
};
