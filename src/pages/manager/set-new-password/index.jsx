import background from '@/assets/images/ad-background.png';
import logoCompany from '@/assets/images/logo-company.png';
import { AdPwdInput } from '@/components/admin/common/Input/pwd-input';
import { YUP_MESSAGES } from '@/constant';
import { AdLoginWrapper } from '@/containers/ad-layout/ad-login-wrapper';
import { yup } from '@/libs';
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';

export const AdOrSpSetNewPasswordPage = () => {
  const initialValues = {
    password: '',
    confirmPassword: '',
  };
  const validationSchema = yup.object({
    confirmPassword: yup.string().oneOf([yup.ref('password')], YUP_MESSAGES.AD_SET_PASSWORD_CONFIRM),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
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

          <FormikProvider value={formik}>
            <Stack alignItems={'flex-start'} width={'100%'}>
              <Typography variant="login_input">新しいパスワード</Typography>
              <AdPwdInput placeholder="入力してください" name="password" showPwdVerify={true} />
            </Stack>
            <Stack alignItems={'flex-start'} width={'100%'} mb={10}>
              <Typography variant="login_input">新しいパスワード（確認用）</Typography>
              <AdPwdInput placeholder="入力してください" name="confirmPassword" />
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
    </AdLoginWrapper>
  );
};
