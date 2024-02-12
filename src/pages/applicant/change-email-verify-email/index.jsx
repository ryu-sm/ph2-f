import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormikProvider, useFormik } from 'formik';
import { ApEmailInputField, ApItemGroup, ApNotifyTitle, ApPageTitle, ApPrimaryButton } from '@/components';
import { ApLayout } from '@/containers';
import { validationSchema } from './validatior';
import { Box, Stack, Typography } from '@mui/material';
import { Icons } from '@/assets';
import { routeNames } from '@/router/settings';
import { apChangeEmailVerifyEmail } from '@/services';
import { userEmailSelector } from '@/store';
import { useRecoilValue } from 'recoil';

export const ApChangeEmailVerifyEmailPage = () => {
  const navigate = useNavigate();
  const userEmail = useRecoilValue(userEmailSelector);

  const [sended, setSended] = useState(false);
  const [warningText, setWarningText] = useState('');
  const formik = useFormik({
    initialValues: {
      email: userEmail,
      new_email: '',
      new_email_confirm: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        await apChangeEmailVerifyEmail({ email: values.email, new_email: values.new_email });
        setSended(true);
      } catch (error) {
        switch (error?.status) {
          case 400:
            setWarningText('新しいメールアドレスは既に存在しています');
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
        <ApLayout hasFooter hasMenu>
          <ApPageTitle error={warningText}>{`メールアドレス変更`}</ApPageTitle>
          <ApItemGroup label={'現在のメールアドレス'}>
            <Stack>
              <Stack
                justifyContent={'center'}
                sx={{
                  p: 4,
                  height: 48,
                  fontFamily: 'Hiragino Sans',
                  fontSize: 14,
                  fontWeight: 300,
                  lineHeight: '150%',
                  fontStyle: 'normal',
                  letterSpacing: 0.4,
                  borderRadius: 1,
                  color: (theme) => theme.palette.text.main,
                  backgroundColor: (theme) => theme.palette.gray[100],
                }}
              >
                {userEmail}
              </Stack>
            </Stack>
          </ApItemGroup>
          <ApItemGroup label={'新しいメールアドレス'}>
            <ApEmailInputField
              name={'new_email'}
              placeholder={'例：sample@sample.co.jp'}
              onFocus={() => setWarningText('')}
            />
          </ApItemGroup>
          <ApItemGroup label={'新しいメールアドレス（確認用）'}>
            <ApEmailInputField
              name={'new_email_confirm'}
              placeholder={'例：sample@sample.co.jp'}
              onFocus={() => setWarningText('')}
            />
          </ApItemGroup>
          <Stack spacing={6} alignItems={'center'}>
            <ApPrimaryButton
              endIcon={<Icons.ApForwardRightWhiteIcon />}
              onClick={formik.handleSubmit}
              disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)}
            >
              変更する
            </ApPrimaryButton>
            <Stack
              spacing={2}
              direction={'row'}
              alignItems={'center'}
              justifyContent={'center'}
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate(routeNames.apAccountInformationPage.path)}
            >
              <Icons.ApForwardLeftRadioOutlineIcon />
              <Typography variant="radio_checkbox_button" sx={{ color: (theme) => theme.palette.primary.main }}>
                キャンセル
              </Typography>
            </Stack>
          </Stack>
        </ApLayout>
      ) : (
        <ApLayout hasFooter hasMenu>
          <ApNotifyTitle icon={<Icons.ApEmailSendedIcon />} label={`新しいメールアドレスに\nメールを送信しました`} />
          <Stack alignItems={'center'} sx={{ px: 8 }}>
            <Box sx={{ p: 6, width: 1, textAlign: 'center', bgcolor: 'white', borderRadius: '14px' }}>
              <Typography variant="notify" sx={{ color: (theme) => theme.palette.text.main }}>
                {`メールに記載されている\n認証用URLにアクセスし、\nメールアドレスの変更手続きを\n完了してください。`}
              </Typography>
            </Box>
          </Stack>
        </ApLayout>
      )}
    </FormikProvider>
  );
};
