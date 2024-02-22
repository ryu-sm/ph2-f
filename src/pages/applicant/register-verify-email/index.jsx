import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormikProvider, useFormik } from 'formik';
import {
  ApAcceptCheckox,
  ApEmailInputField,
  ApItemGroup,
  ApNotifyTitle,
  ApPageTitle,
  ApPrimaryButton,
} from '@/components';
import { ApLayout } from '@/containers';
import { validationSchema } from './validatior';
import { Box, Stack, Typography } from '@mui/material';
import { Icons } from '@/assets';

import { TERM_OF_SERVICE } from '@/configs';
import { routeNames } from '@/router/settings';
import { apRegisterVerifyEmail } from '@/services';
import { getSalesCompanyOrgId } from '@/libs';

export const ApRegisterVerifyEmailPage = () => {
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const [sended, setSended] = useState(false);
  const [warningText, setWarningText] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const s_sales_company_org_id = getSalesCompanyOrgId();
      try {
        await apRegisterVerifyEmail({ email: values.email, ...(s_sales_company_org_id && { s_sales_company_org_id }) });
        setSended(true);
      } catch (error) {
        switch (error?.status) {
          case 400:
            setWarningText('このメールアドレスは既に存在しています。別のメールアドレスで登録してください。');
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
          <ApPageTitle error={warningText}>{`新規登録`}</ApPageTitle>
          <ApItemGroup label={'メールアドレス'}>
            <ApEmailInputField
              name={'email'}
              placeholder={'例：sample@sample.co.jp'}
              onFocus={() => setWarningText('')}
            />
          </ApItemGroup>
          <Stack spacing={6}>
            <Stack spacing={2} direction={'row'} alignItems={'center'} justifyContent={'center'}>
              <ApAcceptCheckox checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} />
              <Typography variant="label" sx={{ color: (theme) => theme.palette.text.main }}>
                <Typography
                  component={'a'}
                  variant="label"
                  target="_blank"
                  href={TERM_OF_SERVICE}
                  sx={{ textDecorationLine: 'underline', color: (theme) => theme.palette.primary.main }}
                >
                  利用規約
                </Typography>
                に同意する
              </Typography>
            </Stack>
            <Stack sx={{ px: 4 }}>
              <Typography variant="note" sx={{ color: (theme) => theme.palette.text.main }}>
                {`※入力したメールアドレス宛に仮登録メールが届きます。\nメール受信制限をされている方は info@milibank.co.jp\nからのメール受信を許可してください。`}
              </Typography>
            </Stack>
            <Stack alignItems={'center'}>
              <ApPrimaryButton
                endIcon={<Icons.ApForwardRightWhiteIcon />}
                onClick={formik.handleSubmit}
                disabled={formik.isSubmitting || !(formik.isValid && formik.dirty) || !confirmed}
              >
                登録する
              </ApPrimaryButton>
            </Stack>
            <Stack
              spacing={2}
              direction={'row'}
              alignItems={'center'}
              justifyContent={'center'}
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate(routeNames.apLoginPage.path)}
            >
              <Typography variant="radio_checkbox_button" sx={{ color: (theme) => theme.palette.primary.main }}>
                既にアカウントをお持ちの方
              </Typography>
              <Icons.ApForwardRightRadioOutlineIcon />
            </Stack>
          </Stack>
        </ApLayout>
      ) : (
        <ApLayout hasFooter>
          <ApNotifyTitle icon={<Icons.ApEmailSendedIcon />} label={`メールを送信しました`} />
          <Stack alignItems={'center'} sx={{ px: 8 }}>
            <Box sx={{ p: 6, width: 1, textAlign: 'center', bgcolor: 'white', borderRadius: '14px' }}>
              <Typography variant="notify" sx={{ color: (theme) => theme.palette.text.main }}>
                {`メールに記載されている\nURLにアクセスし\n新規登録を完了してください。`}
              </Typography>
            </Box>
          </Stack>
        </ApLayout>
      )}
    </FormikProvider>
  );
};
