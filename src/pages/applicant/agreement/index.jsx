import { ApFileViewer, ApItemGroup, ApPageTitle, ApPrimaryButton, ApRadioRowGroup } from '@/components';
import { ApLayout } from '@/containers';
import { yup } from '@/libs';
import { routeNames } from '@/router/settings';
import { Link, Stack, Typography } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { agreeOptions } from './options';
import { CONFIRMATION_URL, CONSENT_URL } from '@/configs';
import { Icons } from '@/assets';
import { useNavigate } from 'react-router-dom';

export const ApAgreementPage = () => {
  const navigate = useNavigate();
  const [warningText, setWarningText] = useState('');
  const [isReadedConsent, setIsReadedConsent] = useState(false);
  const [isReadedConfirmation, setIsReadedConfirmation] = useState(false);
  const formik = useFormik({
    initialValues: {
      consent: '',
      confirmation: '',
    },
    validationSchema: yup.object({
      consent: yup.string().oneOf(['1'], 'ご確認ください'),
      confirmation: yup.string().oneOf(['1'], 'ご確認ください'),
    }),
    onSubmit: () => {
      navigate(routeNames.apTopPage.path);
    },
  });

  useEffect(() => {
    if (formik.errors.consent || formik.errors.confirmation)
      return setWarningText('同意いただけない場合、本サービスをご利用いただけません。');
    setWarningText('');
  }, [formik.errors.consent, formik.errors.confirmation]);

  return (
    <ApLayout pb={18}>
      <FormikProvider value={formik}>
        <ApPageTitle error={warningText}>{`はじめに`}</ApPageTitle>
        <Stack alignItems={'center'} sx={{ pb: 6 }}>
          <Typography
            variant="note"
            sx={{ fontSize: 14, textAlign: 'center', color: (theme) => theme.palette.text.main }}
          >
            {`下記2つの同意事項をよくお読みいただき\n必ずお申込人が選択してください。`}
          </Typography>
        </Stack>
        <ApItemGroup label={'個人情報の取扱いに関する同意書 兼 表明および確約書'}>
          <Stack spacing={3}>
            <ApFileViewer url={CONSENT_URL} onScrollBottom={() => setIsReadedConsent(true)} />
            <Stack spacing={1} direction={'row'} alignItems={'center'} justifyContent={'end'}>
              <Icons.ApPdfOutlineMainIcon />
              <Typography
                component={Link}
                variant="label"
                sx={{ color: (theme) => theme.palette.primary.main, textDecorationLine: 'underline' }}
                href={CONSENT_URL}
                target="_blank"
                onClick={() => setIsReadedConsent(true)}
              >
                全文を見る
              </Typography>
            </Stack>
            <ApRadioRowGroup name="consent" options={agreeOptions} disabled={!isReadedConsent} />
          </Stack>
        </ApItemGroup>
        <ApItemGroup label={'銀行代理業にかかる確認書　兼　個人情報の取扱い等に関する同意書'}>
          <Stack spacing={3}>
            <ApFileViewer url={CONFIRMATION_URL} onScrollBottom={() => setIsReadedConfirmation(true)} />
            <Stack spacing={1} direction={'row'} alignItems={'center'} justifyContent={'end'}>
              <Icons.ApPdfOutlineMainIcon />
              <Typography
                component={Link}
                variant="label"
                sx={{ color: (theme) => theme.palette.primary.main, textDecorationLine: 'underline' }}
                href={CONFIRMATION_URL}
                target="_blank"
                onClick={() => setIsReadedConfirmation(true)}
              >
                全文を見る
              </Typography>
            </Stack>
            <ApRadioRowGroup name="confirmation" options={agreeOptions} disabled={!isReadedConfirmation} />
          </Stack>
        </ApItemGroup>
        <Stack
          justifyContent={'center'}
          alignItems={'center'}
          spacing={4}
          sx={{
            position: 'fixed',
            py: 4,
            bottom: 0,
            width: 1,
            maxWidth: 480,
            bgcolor: 'white',
            boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.05)',
          }}
        >
          <ApPrimaryButton
            endIcon={<Icons.ApForwardRightWhiteIcon />}
            width={260}
            height={40}
            onClick={formik.handleSubmit}
            disabled={
              formik.isSubmitting ||
              !(formik.isValid && formik.dirty) ||
              !(formik.values.consent === '1' && formik.values.confirmation === '1')
            }
          >
            次へ
          </ApPrimaryButton>
        </Stack>
      </FormikProvider>
    </ApLayout>
  );
};
