import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormikProvider, useFormik } from 'formik';
import { ApEmailInputField, ApItemGroup, ApNotifyTitle, ApPageTitle, ApPrimaryButton } from '@/components';
import { ApLayout } from '@/containers';
import { validationSchema } from './validatior';
import { Box, Stack, Typography } from '@mui/material';
import { Icons } from '@/assets';
import { apRegisterVerifyEmail, apResetPasswordVerifyEmail } from '@/services';

export const ApResetPasswordVerifyEmailPage = () => {
  const [sended, setSended] = useState(false);
  const [warningText, setWarningText] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await apResetPasswordVerifyEmail({ email: values.email });
        setSended(true);
      } catch (error) {
        switch (error?.status) {
          case 400:
            // TODO:
            setWarningText('未登録のメールアドレスは送信されません。ご登録のメールアドレスを入力してください。');
            break;
          default:
            setWarningText('サーバーとの通信に失敗しました。再度お試しください。');
        }
      }
    },
  });

  return (
    <FormikProvider value={formik}>
      {!sended ? (
        <ApLayout hasFooter>
          <ApPageTitle error={warningText}>{`パスワード再設定`}</ApPageTitle>
          <Stack alignItems={'center'} sx={{ pb: 6 }}>
            <Typography variant="notify" sx={{ color: (theme) => theme.palette.text.main }}>
              {`ご登録のメールアドレスを入力してください。\nパスワード再設定用のメールをお送りします。`}
            </Typography>
          </Stack>
          <ApItemGroup label={'メールアドレス'}>
            <ApEmailInputField
              name={'email'}
              placeholder={'例：sample@sample.co.jp'}
              onFocus={() => setWarningText('')}
            />
          </ApItemGroup>
          <Stack spacing={6}>
            <Stack alignItems={'center'}>
              <ApPrimaryButton
                endIcon={<Icons.ApForwardRightWhiteIcon />}
                onClick={formik.handleSubmit}
                disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)}
              >
                再設定メールを送信
              </ApPrimaryButton>
            </Stack>
          </Stack>
        </ApLayout>
      ) : (
        <ApLayout hasFooter>
          <ApNotifyTitle icon={<Icons.ApEmailSendedIcon />} label={`メールを送信しました`} />
          <Stack alignItems={'center'} sx={{ px: 8 }}>
            <Box sx={{ p: 6, width: 1, textAlign: 'center', bgcolor: 'white', borderRadius: '14px' }}>
              <Typography variant="notify" sx={{ color: (theme) => theme.palette.text.main }}>
                {`メールに記載されている\nURLにアクセスし\nパスワード再設定を完了してください。`}
              </Typography>
              <br />
              <br />
              <Typography variant="notify" sx={{ color: (theme) => theme.palette.text.main }}>
                {`＊未登録の方には再設定用のメールは\n送信されません。`}
              </Typography>
            </Box>
          </Stack>
        </ApLayout>
      )}
    </FormikProvider>
  );
};
