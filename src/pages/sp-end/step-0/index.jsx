import { FormikProvider, useFormik } from 'formik';
import { Yup } from '@/libs';
import { useSpContext } from '@/hooks';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SpPdfOutlineIcon } from '@/assets/svgs';
import { confirmationOptions, consentOptions } from './option';
import { SpGroup, SpLayout, SpStepFooter } from '@/layouts/sp-end';
import { Center, Flex, Stack, Text, useTheme } from '@chakra-ui/react';
import { SpFileViewer, SpGroupButton, SpPageTitle } from '@/components/sp-end';
import { userPaths } from '@/routers/users/paths';

export default function SpStep0() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, setErrMsg, updateSpLocalState, p_application_headers_a_consent_confirmation_form } = useSpContext();
  const [isValidconsent, setIsValidconsent] = useState(false);
  const [isValidconfirmation, setIsValidconfirmation] = useState(false);

  const handleOnRight = useCallback(async () => {
    if (user?.first_login) {
      navigate(userPaths.top);
    } else {
      navigate(userPaths.spStep1);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      consent: '',
      confirmation: '',
    },
    validationSchema: Yup.object({
      consent: Yup.number().required().oneOf([1], 'ご確認ください'),
      confirmation: Yup.number().required().oneOf([1], 'ご確認ください'),
    }),
    onSubmit: async () => {
      try {
        await handleOnRight();
      } catch (error) {
        setErrMsg(`サーバー内部でエラーが発生しました。 再度お試し下さい。`);
      }
    },
  });
  useEffect(() => {
    if (
      (formik.touched.consent && formik.errors.consent) ||
      (formik.touched.confirmation && formik.errors.confirmation)
    ) {
      setErrMsg('同意いただけない場合、本サービスをご利用いただけません。');
    }
    if (formik.touched.consent && formik.values.consent && formik.touched.confirmation && formik.values.confirmation) {
      updateSpLocalState({ p_application_headers_a_consent_confirmation_form: 1 });
      setErrMsg(null);
    } else {
      updateSpLocalState({ p_application_headers_a_consent_confirmation_form: 0 });
    }
  }, [
    formik.touched.consent,
    formik.errors.consent,
    formik.touched.confirmation,
    formik.errors.confirmation,
    formik.values.consent,
    formik.values.confirmation,
  ]);
  return (
    <SpLayout hasHeader={true}>
      <FormikProvider value={formik}>
        <SpPageTitle>{'はじめに'}</SpPageTitle>
        <Center pb={'24px'}>
          <Text variant={'sp_14_170'} textAlign={'center'}>
            {`下記2つの同意事項をよくお読みいただき\n必ずお申込人が選択してください。`}
          </Text>
        </Center>
        <SpGroup title={'個人情報の取扱いに関する同意書 兼 表明および確約書'}>
          <Stack spacing={'12px'}>
            <SpFileViewer
              url={`pdfs/個人情報の取扱いに関する同意書兼表明および確約書.pdf`}
              onScrollBottom={setIsValidconsent}
            />
            <Flex
              as={'a'}
              alignItems={'center'}
              gap={'4px'}
              alignSelf={'end'}
              cursor={'pointer'}
              href={userPaths.spConsentUrl}
              target={'_blank'}
              onClick={() => setIsValidconsent(true)}
            >
              <SpPdfOutlineIcon color={theme.colors.sp.primary[100]} />{' '}
              <Text variant={'sp_14_130_link'}>全文を見る</Text>
            </Flex>
            <SpGroupButton
              name="consent"
              options={consentOptions}
              isDisabled={!isValidconsent}
              errMsg={formik.touched.consent && formik.errors.consent}
            />
          </Stack>
        </SpGroup>
        <SpGroup title={'銀行代理業にかかる確認書　兼　個人情報の取扱い等に関する同意書'} sx={{ pb: '80px' }}>
          <Stack spacing={'12px'}>
            <SpFileViewer url={`pdfs/銀行代理業にかかる確認書.pdf`} onScrollBottom={setIsValidconfirmation} />
            <Flex
              as={'a'}
              alignItems={'center'}
              gap={'4px'}
              alignSelf={'end'}
              cursor={'pointer'}
              href={userPaths.spConfirmationUrl}
              target={'_blank'}
              onClick={() => setIsValidconfirmation(true)}
            >
              <SpPdfOutlineIcon color={theme.colors.sp.primary[100]} />{' '}
              <Text variant={'sp_14_130_link'}>全文を見る</Text>
            </Flex>
            <SpGroupButton
              name="confirmation"
              options={confirmationOptions}
              isDisabled={!isValidconfirmation}
              errMsg={formik.touched.confirmation && formik.errors.confirmation}
            />
          </Stack>
        </SpGroup>
        <SpStepFooter isDisabled={!p_application_headers_a_consent_confirmation_form} onRight={formik.handleSubmit} />
      </FormikProvider>
    </SpLayout>
  );
}
