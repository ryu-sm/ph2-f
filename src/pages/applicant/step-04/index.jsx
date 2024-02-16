import { ApLayout, ApStepFooter } from '@/containers';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { apNextStepIdSelector, apPreStepIdSelector, applicationAtom } from '@/store';
import { FormikProvider, useFormik } from 'formik';
import { validationSchema } from './validationSchema';
import {
  ApErrorScroll,
  ApFileViewer,
  ApIncomeTotalizerModal,
  ApItemGroup,
  ApPageTitle,
  ApPhoneInputField,
  ApRadioRowGroup,
  ApSelectField,
  ApSelectFieldYmd,
  ApStarHelp,
  ApTextInputField,
  ApZipCodeInputField,
} from '@/components';
import { Box, Link, Stack, Typography } from '@mui/material';
import { agreeOptions, ganderOptions, nationalityOptions, yearOptions } from './options';
import { PREFECTURES } from '@/constant';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Icons } from '@/assets';
import { CONFIRMATION_URL, CONSENT_URL } from '@/configs';

export const ApStep04Page = () => {
  const navigate = useNavigate();
  const apNextStepId = useRecoilValue(apNextStepIdSelector);
  const apPreStepId = useRecoilValue(apPreStepIdSelector);
  const setApplicationInfo = useSetRecoilState(applicationAtom);
  const {
    p_applicant_persons_b_agreement,
    p_applicant_persons__1__last_name_kanji,
    p_applicant_persons__1__first_name_kanji,
    p_applicant_persons__1__last_name_kana,
    p_applicant_persons__1__first_name_kana,
    p_applicant_persons__1__gender,
    p_applicant_persons__1__rel_to_applicant_a_name,
    p_applicant_persons__1__birthday,
    p_applicant_persons__1__nationality,
    p_applicant_persons__1__mobile_phone,
    p_applicant_persons__1__home_phone,
    p_applicant_persons__1__postal_code,
    p_applicant_persons__1__prefecture_kanji,
    p_applicant_persons__1__city_kanji,
    p_applicant_persons__1__district_kanji,
    p_applicant_persons__1__other_address_kanji,
  } = useRecoilValue(applicationAtom);

  const formik = useFormik({
    initialValues: {
      consent: '',
      confirmation: '',
      p_applicant_persons_b_agreement,
      p_applicant_persons__1__last_name_kanji,
      p_applicant_persons__1__first_name_kanji,
      p_applicant_persons__1__last_name_kana,
      p_applicant_persons__1__first_name_kana,
      p_applicant_persons__1__gender,
      p_applicant_persons__1__rel_to_applicant_a_name,
      p_applicant_persons__1__birthday,
      p_applicant_persons__1__nationality,
      p_applicant_persons__1__mobile_phone,
      p_applicant_persons__1__home_phone,
      p_applicant_persons__1__postal_code,
      p_applicant_persons__1__prefecture_kanji,
      p_applicant_persons__1__city_kanji,
      p_applicant_persons__1__district_kanji,
      p_applicant_persons__1__other_address_kanji,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      setApplicationInfo((pre) => {
        return { ...pre, ...values };
      });
      navigate(`/step-id-${apNextStepId}`);
    },
  });

  const handelLeft = () => {
    navigate(`/step-id-${apPreStepId}`);
  };
  const [isReadedConsent, setIsReadedConsent] = useState(false);
  const [isReadedConfirmation, setIsReadedConfirmation] = useState(false);

  useEffect(() => {
    if (p_applicant_persons_b_agreement) {
      formik.setFieldValue('consent', '1');
      formik.setFieldValue('confirmation', '1');
    } else {
      formik.setFieldValue('consent', '');
      formik.setFieldValue('confirmation', '');
    }
  }, [p_applicant_persons_b_agreement]);

  useEffect(() => {
    if (formik.values.consent && formik.values.confirmation) {
      formik.setFieldValue('p_applicant_persons_b_agreement', true);
    } else {
      formik.setFieldValue('p_applicant_persons_b_agreement', false);
    }
  }, [formik.values.consent, formik.values.confirmation]);

  useEffect(() => {
    if (
      formik.values.p_applicant_persons__1__postal_code.length === 8 &&
      !formik.errors.p_applicant_persons__1__postal_code
    ) {
      axios
        .get(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${formik.values.p_applicant_persons__1__postal_code}`)
        .then((res) => {
          formik.setFieldValue('p_applicant_persons__1__prefecture_kanji', res.data.results[0].address1);
          formik.setFieldValue('p_applicant_persons__1__city_kanji', res.data.results[0].address2);
          formik.setFieldValue('p_applicant_persons__1__district_kanji', res.data.results[0].address3);
        })
        .catch(() => {
          console.log(999);
          formik.setFieldError(
            'p_applicant_persons__1__postal_code',
            '住所が取得できませんでした。再度入力してください。'
          );
        });
    }
  }, [formik.values.p_applicant_persons__1__postal_code, formik.errors.p_applicant_persons__1__postal_code]);

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  return (
    <FormikProvider value={formik}>
      <ApErrorScroll />
      <ApLayout hasMenu hasStepBar pb={38}>
        <ApPageTitle py={8}>{`収入合算者について\n教えてください。`}</ApPageTitle>
        <Stack alignItems={'center'} sx={{ pb: 6 }}>
          <ApIncomeTotalizerModal />
        </Stack>
        {!p_applicant_persons_b_agreement && (
          <Stack>
            <Stack spacing={8} alignItems={'center'} sx={{ px: 4, pb: 8 }}>
              <Box
                sx={{
                  p: 3,
                  width: 1,
                  borderRadius: 2,
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                }}
              >
                <Stack spacing={2} alignItems={'center'}>
                  <Typography variant="form_item_label" sx={{ color: 'primary.main' }}>
                    連帯保証人予定者（収入合算者）の方へ
                  </Typography>
                  <Typography variant="notify" sx={{ color: 'text.main' }}>
                    {`下記2つの同意事項をよくお読みいただき \n 必ず連帯保証人予定者が選択してください。`}
                  </Typography>
                </Stack>
              </Box>
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
          </Stack>
        )}
        {formik.values.p_applicant_persons_b_agreement && (
          <Stack>
            <ApItemGroup label={'お名前'}>
              <Stack spacing={3}>
                <ApTextInputField name="p_applicant_persons__1__last_name_kanji" placeholder={'姓'} />
                <ApTextInputField name="p_applicant_persons__1__first_name_kanji" placeholder={'名'} />
                <ApStarHelp label={'外国籍のかたは、在留カード通りに入力ください。'} />
                <ApStarHelp label={'お名前の漢字が外字等で変換できない場合は常用漢字でご入力ください。'} />
              </Stack>
            </ApItemGroup>
            <ApItemGroup label={'お名前（フリガナ）'}>
              <Stack spacing={3}>
                <ApTextInputField name="p_applicant_persons__1__last_name_kana" placeholder={'セイ'} />
                <ApTextInputField name="p_applicant_persons__1__first_name_kana" placeholder={'メイ'} />
              </Stack>
            </ApItemGroup>
            <ApItemGroup label={'性別'}>
              <ApRadioRowGroup name="p_applicant_persons__1__gender" options={ganderOptions} />
            </ApItemGroup>
            <ApItemGroup label={'生年月日'}>
              <Stack spacing={3}>
                <ApSelectFieldYmd name="p_applicant_persons__1__birthday" yearOptions={yearOptions} />
                <ApStarHelp label={'借入時満18歳以上満65歳以下・完済時満80歳未満の方がご利用いただけます。'} />
              </Stack>
            </ApItemGroup>
            <ApItemGroup label={'現在の国籍'}>
              <ApRadioRowGroup name="p_applicant_persons__1__nationality" options={nationalityOptions} />
            </ApItemGroup>
            <ApItemGroup label={'電話番号'}>
              <Stack spacing={3}>
                <ApPhoneInputField name="p_applicant_persons__1__mobile_phone" label={'携帯'} />
                <ApPhoneInputField name="p_applicant_persons__1__home_phone" label={'自宅'} />
                <ApStarHelp label={'半角数字でご入力ください。'} />
              </Stack>
            </ApItemGroup>
            <ApItemGroup label={'現住所'}>
              <Stack spacing={4}>
                <ApZipCodeInputField name="p_applicant_persons__1__postal_code" />
                <ApSelectField
                  name="p_applicant_persons__1__prefecture_kanji"
                  options={PREFECTURES}
                  placeholder={'----'}
                  width={110}
                  label={'都道府県'}
                />
                <ApTextInputField
                  name="p_applicant_persons__1__city_kanji"
                  placeholder={'例：港区'}
                  label={'市区郡　（例：港区）'}
                  convertFullWidth
                />
                <ApTextInputField
                  name="p_applicant_persons__1__district_kanji"
                  placeholder={'例：芝浦４丁目'}
                  label={'町村丁目（例：芝浦４丁目）'}
                  convertFullWidth
                />
                <ApTextInputField
                  name="p_applicant_persons__1__other_address_kanji"
                  placeholder={'例：12-38　キャナルゲート芝浦605号室'}
                  label={'丁目以下・建物名・部屋番号（例：12-38　キャナルゲート芝浦605号室）'}
                  convertFullWidth
                />
              </Stack>
            </ApItemGroup>
          </Stack>
        )}

        <ApStepFooter left={handelLeft} right={formik.handleSubmit} />
      </ApLayout>
    </FormikProvider>
  );
};
