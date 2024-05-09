import { ApFileViewer, ApItemGroup, ApPageTitle, ApRadioRowGroup } from '@/components';
import { ApLayout, ApStepFooter } from '@/containers';
import { yup } from '@/libs';
import { routeNames } from '@/router/settings';
import { Link, Stack, Typography } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { CONFIRMATION_URL, CONSENT_URL } from '@/configs';
import { Icons } from '@/assets';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authAtom, localApplication } from '@/store';
import { dayjs } from '@/libs';
import { agreeOptions } from './options';
import { useIsSalesPerson } from '@/hooks';
import { adGetSalesCompanyId, adGetSalesPersonInfo } from '@/services';
import { toast } from 'react-toastify';
import { API_500_ERROR, YUP_MESSAGES } from '@/constant';

export const ApAgreementPage = () => {
  const navigate = useNavigate();
  const [warningText, setWarningText] = useState('');
  const [isReadedConsent, setIsReadedConsent] = useState(false);
  const [isReadedConfirmation, setIsReadedConfirmation] = useState(false);
  const isSalesPerson = useIsSalesPerson();
  const setLocalApplicationInfo = useSetRecoilState(localApplication);
  const { salesPerson } = useRecoilValue(authAtom);
  const formik = useFormik({
    initialValues: {
      consent: '',
      confirmation: '',
    },
    validationSchema: yup.object({
      consent: yup.string().required(YUP_MESSAGES.RADIO_REQUIRED).oneOf(['1'], 'ご確認ください'),
      confirmation: yup.string().required(YUP_MESSAGES.RADIO_REQUIRED).oneOf(['1'], 'ご確認ください'),
    }),
    onSubmit: () => {
      setLocalApplicationInfo((pre) => {
        return {
          ...pre,
          p_applicant_persons_a_agreement: true,
          p_application_headers: {
            ...pre.p_application_headers,
            apply_date: dayjs().format('YYYY/MM/DD'),
          },
        };
      });
      navigate(isSalesPerson ? routeNames.adSalesPersonStep01Page.path : routeNames.apTopPage.path);
    },
  });

  const fetchSalesCompanyId = async () => {
    try {
      const res = await adGetSalesCompanyId();
      let orgsCId = '';
      let orgsBId = '';
      let orgsEId = '';
      // C
      const orgsC = res.data.filter((item) => item?.category === 'C');
      orgsCId = orgsC[0].id;
      // B
      const orgsB = res.data.filter((item) => item?.category === 'B');
      const uniqueOrgsB = [...new Set(orgsB.map((item) => item?.id))];
      if (uniqueOrgsB?.length === 1) {
        orgsBId = orgsB[0].id;
      }
      // E
      const orgsE = res.data.filter((item) => item?.category === 'B');
      const uniqueOrgsE = [...new Set(orgsE.map((item) => item?.id))];
      if (uniqueOrgsE.length === 1) {
        orgsEId = orgsE[0].id;
      }

      const resonse = await adGetSalesPersonInfo(salesPerson.id);

      setLocalApplicationInfo((pre) => {
        return {
          ...pre,
          p_application_headers: {
            ...pre.p_application_headers,
            sales_company_id: orgsCId,
            sales_area_id: orgsBId,
            sales_exhibition_hall_id: orgsEId,
            s_sales_person_id: salesPerson.id,
            vendor_name: resonse.data?.name_kanji,
            vendor_phone: resonse.data?.mobile_phone,
          },
        };
      });
    } catch (error) {
      console.log(error);
      toast.error(API_500_ERROR);
    }
  };
  useEffect(() => {
    if (isSalesPerson) {
      fetchSalesCompanyId();
    }
  }, [isSalesPerson]);

  useEffect(() => {
    if (isReadedConsent && isReadedConfirmation && !formik.errors.consent && !formik.errors.confirmation) {
      setWarningText('');
    } else {
      if (isReadedConsent && isReadedConfirmation && formik.touched.consent && formik.touched.confirmation) {
        setWarningText('同意いただけない場合、本サービスをご利用いただけません。');
      }
    }
  }, [
    formik.errors.consent,
    formik.errors.confirmation,
    formik.touched.consent,
    formik.touched.confirmation,
    isReadedConsent,
    isReadedConfirmation,
  ]);

  return (
    <ApLayout
      bottomContent={
        <ApStepFooter
          right={formik.handleSubmit}
          rightDisable={formik.isSubmitting || !(formik.isValid && formik.dirty)}
        />
      }
    >
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
      </FormikProvider>
    </ApLayout>
  );
};
