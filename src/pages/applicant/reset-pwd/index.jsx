import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormikProvider, useFormik } from 'formik';
import {
  ApItemGroup,
  ApModalWrapper,
  ApNotifyTitle,
  ApPageTitle,
  ApPrimaryButton,
  ApPwdInputField,
} from '@/components';
import { ApLayout } from '@/containers';
import { validationSchema } from './validatior';
import { Box, Stack, Typography } from '@mui/material';
import { Icons } from '@/assets';
import { routeNames } from '@/router/settings';
import { useBoolean, useCurrSearchParams } from '@/hooks';
import { apResetPassword } from '@/services';
import { jwtDecode } from 'jwt-decode';

export const ApResetPasswordPage = () => {
  const navigate = useNavigate();
  const token = useCurrSearchParams().get('token');
  const modal = useBoolean(false);
  const [isValidToken, setIsValidToken] = useState(true);
  const [warningText, setWarningText] = useState('');
  const formik = useFormik({
    initialValues: {
      password: '',
      password_confirm: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await apResetPassword({ password: values.password, token: token });
        modal.onTrue();
      } catch (error) {
        switch (error?.status) {
          case 400:
            setIsValidToken(false);
            break;
          default:
            setWarningText('サーバーとの通信に失敗しました。再度お試しください。');
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

  return (
    <FormikProvider value={formik}>
      {isValidToken ? (
        <ApLayout hasFooter>
          <ApPageTitle error={warningText}>{`パスワード再設定`}</ApPageTitle>
          <ApItemGroup label={'新しいパスワード'}>
            <ApPwdInputField name={'password'} onFocus={() => setWarningText('')} showPwdPower />
          </ApItemGroup>
          <ApItemGroup label={'新しいパスワード（確認用）'}>
            <ApPwdInputField name={'password_confirm'} onFocus={() => setWarningText('')} />
          </ApItemGroup>
          <Stack alignItems={'center'}>
            <ApPrimaryButton
              endIcon={<Icons.ApForwardRightWhiteIcon />}
              onClick={formik.handleSubmit}
              disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)}
            >
              変更する
            </ApPrimaryButton>
          </Stack>
          <ApModalWrapper open={modal.value} icon={<Icons.ApSmileIcon />} label={`パスワード再設定完了`}>
            <Typography variant="modal_label">{`パスワード再設定が完了しました。\n引き続きご利用ください。`}</Typography>
            <ApPrimaryButton
              endIcon={<Icons.ApForwardRightWhiteIcon />}
              width={260}
              height={40}
              onClick={() => navigate(routeNames.apLoginPage.path)}
            >
              ログイン
            </ApPrimaryButton>
          </ApModalWrapper>
        </ApLayout>
      ) : (
        <ApLayout hasFooter>
          <ApNotifyTitle icon={<Icons.ApNotifyWaringIcon />} label={`メールの有効期限が\n切れています`} />
          <Stack alignItems={'center'} sx={{ px: 8 }}>
            <Box sx={{ p: 6, width: 1, textAlign: 'center', bgcolor: 'white', borderRadius: '14px' }}>
              <Typography variant="notify" sx={{ color: (theme) => theme.palette.text.main }}>
                {`メール受信後、一定時間内での\n操作が確認できなかったため\nパスワードの再設定に失敗しました。`}
              </Typography>
              <br />
              <br />
              <Typography variant="notify" sx={{ color: (theme) => theme.palette.text.main }}>
                {`恐れ入りますが、\n再度パスワード再設定の手続きを\nお願いいたします。`}
              </Typography>
            </Box>
          </Stack>
          <Stack alignItems={'center'} sx={{ pt: 6 }}>
            <ApPrimaryButton
              endIcon={<Icons.ApForwardRightWhiteIcon />}
              onClick={() => navigate(routeNames.apResetPasswordVerifyEmailPage.path)}
            >
              パスワードの再設定はこちら
            </ApPrimaryButton>
          </Stack>
        </ApLayout>
      )}
    </FormikProvider>
  );
};
