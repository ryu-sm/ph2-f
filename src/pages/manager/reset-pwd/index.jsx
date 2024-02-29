import { AdLoginWrapper } from '@/containers/ad-layout/ad-login-wrapper';
import background from '@/assets/images/ad-background.png';
import logoCompany from '@/assets/images/logo-company.png';
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { AdEmailInput } from '@/components/admin/common/Input/email-input';
import { useLocation, useNavigate } from 'react-router-dom';
import { yup } from '@/libs';
import { YUP_MESSAGES } from '@/constant';
import { useIsManager } from '@/hooks/use-is-manager';

export const AdOrSpResetPasswordPage = () => {
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const isManager = useIsManager(pathName);
  const handleSendEmail = () => {
    if (isManager) {
      navigate('/manager/send-mail');
    } else {
      navigate('/agent/send-mail');
    }
  };
  const validationSchema = yup.object({
    email: yup.string().required().email(YUP_MESSAGES.AD_LOGIN_EMAIL_INVALID),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: handleSendEmail,
  });
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
        >
          <Avatar src={logoCompany} variant="square" sx={{ height: '64px', width: '272px' }} />
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
    </AdLoginWrapper>
  );
};
