import { ApLayout, ApStepFooter } from '@/containers';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { apNextStepIdSelector, apPreStepIdSelector, applicationAtom } from '@/store';
import { FormikProvider, useFormik } from 'formik';
import { validationSchema } from './validationSchema';
import {
  ApErrorScroll,
  ApFileViewer,
  ApImgUpload,
  ApIncomeTotalizerModal,
  ApItemGroup,
  ApPageTitle,
  ApPhoneInputField,
  ApRadioRowGroup,
  ApSaveDraftButton,
  ApSelectField,
  ApSelectFieldYmd,
  ApStarHelp,
  ApTextInputField,
  ApZipCodeInputField,
} from '@/components';
import { Box, Link, Stack, Typography } from '@mui/material';
import { agreeOptions, genderOptions, nationalityOptions, yearOptions } from './options';
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
    p_applicant_persons__1__H__a,
    p_applicant_persons__1__H__b,
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
      p_applicant_persons__1__H__a,
      p_applicant_persons__1__H__b,
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
      setApplicationInfo((pre) => {
        return {
          ...pre,
          p_applicant_persons_b_agreement: formik.values.p_applicant_persons_b_agreement,
          p_applicant_persons__1__last_name_kanji: formik.values.p_applicant_persons__1__last_name_kanji,
          p_applicant_persons__1__first_name_kanji: formik.values.p_applicant_persons__1__first_name_kanji,
          p_applicant_persons__1__last_name_kana: formik.values.p_applicant_persons__1__last_name_kana,
          p_applicant_persons__1__first_name_kana: formik.values.p_applicant_persons__1__first_name_kana,
          p_applicant_persons__1__gender: formik.values.p_applicant_persons__1__gender,
          p_applicant_persons__1__birthday: formik.values.p_applicant_persons__1__birthday,
          p_applicant_persons__1__nationality: formik.values.p_applicant_persons__1__nationality,
          p_applicant_persons__1__H__a: formik.values.p_applicant_persons__1__H__a,
          p_applicant_persons__1__H__b: formik.values.p_applicant_persons__1__H__b,
          p_applicant_persons__1__mobile_phone: formik.values.p_applicant_persons__1__mobile_phone,
          p_applicant_persons__1__home_phone: formik.values.p_applicant_persons__1__home_phone,
          p_applicant_persons__1__postal_code: formik.values.p_applicant_persons__1__postal_code,
          p_applicant_persons__1__prefecture_kanji: formik.values.p_applicant_persons__1__prefecture_kanji,
          p_applicant_persons__1__city_kanji: formik.values.p_applicant_persons__1__city_kanji,
          p_applicant_persons__1__district_kanji: formik.values.p_applicant_persons__1__district_kanji,
          p_applicant_persons__1__other_address_kanji: formik.values.p_applicant_persons__1__other_address_kanji,
        };
      });
      navigate(`/step-id-${apNextStepId}`);
    },
  });

  const parseVaildData = useMemo(() => {
    return {
      p_applicant_persons_b_agreement: formik.values.p_applicant_persons_b_agreement,
      p_applicant_persons__1__last_name_kanji: formik.values.p_applicant_persons__1__last_name_kanji,
      p_applicant_persons__1__first_name_kanji: formik.values.p_applicant_persons__1__first_name_kanji,
      p_applicant_persons__1__last_name_kana: formik.values.p_applicant_persons__1__last_name_kana,
      p_applicant_persons__1__first_name_kana: formik.values.p_applicant_persons__1__first_name_kana,
      p_applicant_persons__1__gender: formik.values.p_applicant_persons__1__gender,
      p_applicant_persons__1__birthday: formik.values.p_applicant_persons__1__birthday,
      p_applicant_persons__1__nationality: formik.values.p_applicant_persons__1__nationality,
      p_applicant_persons__1__H__a: formik.values.p_applicant_persons__1__H__a,
      p_applicant_persons__1__H__b: formik.values.p_applicant_persons__1__H__b,
      p_applicant_persons__1__mobile_phone: formik.values.p_applicant_persons__1__mobile_phone,
      p_applicant_persons__1__home_phone: formik.values.p_applicant_persons__1__home_phone,
      p_applicant_persons__1__postal_code: formik.values.p_applicant_persons__1__postal_code,
      p_applicant_persons__1__prefecture_kanji: formik.values.p_applicant_persons__1__prefecture_kanji,
      p_applicant_persons__1__city_kanji: formik.values.p_applicant_persons__1__city_kanji,
      p_applicant_persons__1__district_kanji: formik.values.p_applicant_persons__1__district_kanji,
      p_applicant_persons__1__other_address_kanji: formik.values.p_applicant_persons__1__other_address_kanji,
    };
  }, [formik.values]);

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

  return (
    <FormikProvider value={formik}>
      <ApErrorScroll />
      <ApLayout hasMenu hasStepBar pb={18}>
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
                <ApTextInputField name="p_applicant_persons__1__last_name_kanji" placeholder={'姓'} convertFullWidth />
                <ApTextInputField name="p_applicant_persons__1__first_name_kanji" placeholder={'名'} convertFullWidth />
                <ApStarHelp label={'外国籍のかたは、在留カード通りに入力ください。'} />
                <ApStarHelp label={'お名前の漢字が外字等で変換できない場合は常用漢字でご入力ください。'} />
              </Stack>
            </ApItemGroup>
            <ApItemGroup label={'お名前（フリガナ）'}>
              <Stack spacing={3}>
                <ApTextInputField name="p_applicant_persons__1__last_name_kana" placeholder={'セイ'} convertFullWidth />
                <ApTextInputField
                  name="p_applicant_persons__1__first_name_kana"
                  placeholder={'メイ'}
                  convertFullWidth
                />
              </Stack>
            </ApItemGroup>
            <ApItemGroup label={'性別'}>
              <ApRadioRowGroup name="p_applicant_persons__1__gender" options={genderOptions} />
            </ApItemGroup>
            <ApItemGroup label={'続柄'} pb={3} px={2}>
              <ApTextInputField
                name="p_applicant_persons__1__rel_to_applicant_a_name"
                placeholder={'例：父'}
                convertFullWidth
              />
            </ApItemGroup>
            <ApItemGroup label={'生年月日'}>
              <Stack spacing={3}>
                <ApSelectFieldYmd name="p_applicant_persons__1__birthday" yearOptions={yearOptions} />
                <ApStarHelp label={'借入時満18歳以上満65歳以下・完済時満80歳未満の方がご利用いただけます。'} />
              </Stack>
            </ApItemGroup>
            <ApItemGroup label={'現在の国籍'}>
              <Stack spacing={3}>
                <ApRadioRowGroup
                  name="p_applicant_persons__1__nationality"
                  options={nationalityOptions}
                  onChange={(e) => {
                    if (e.target.value === '1') {
                      formik.setFieldValue('p_applicant_persons__1___h__surface', []);
                      formik.setFieldValue('p_applicant_persons__1___h__backside', []);
                    }
                  }}
                />
                {formik.values.p_applicant_persons__1__nationality === '2' && (
                  <Stack
                    sx={{
                      borderRadius: 2,
                      border: (theme) => `1px solid ${theme.palette.primary.main}`,
                      bgcolor: 'primary.main',
                      boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    <Stack
                      sx={{
                        bgcolor: 'white',
                        borderRadius: '7px',
                      }}
                    >
                      <ApItemGroup
                        label={
                          <Typography variant="notify">在留カードまたは特別永住者証明書を添付してください。</Typography>
                        }
                        pb={3}
                        px={2}
                        borderTopRightRadius={'7px'}
                        borderTopLeftRadius={'7px'}
                      >
                        <Stack spacing={'6px'}>
                          {((formik.touched.p_applicant_persons__1__H__a &&
                            formik.errors.p_applicant_persons__1__H__a) ||
                            (formik.touched.p_applicant_persons__1__H__b &&
                              formik.errors.p_applicant_persons__1__H__b)) && (
                            <Typography variant="waring" color={'secondary.main'}>
                              {'※外国籍の場合、在留カードまたは特別永住者証明書を添付することは必須です'}
                            </Typography>
                          )}
                          <Stack spacing={3} direction={'row'} alignItems={'start'}>
                            <Stack spacing={'6px'}>
                              <Typography variant="label" color={'text.main'}>
                                〈表面〉
                              </Typography>
                              <ApImgUpload name="p_applicant_persons__1__H__a" singleFile />
                            </Stack>
                            <Stack spacing={'6px'}>
                              <Typography variant="label" color={'text.main'}>
                                〈裏面〉
                              </Typography>
                              <ApImgUpload name="p_applicant_persons__1__H__b" singleFile />
                            </Stack>
                          </Stack>
                        </Stack>
                      </ApItemGroup>
                    </Stack>
                  </Stack>
                )}
              </Stack>
            </ApItemGroup>
            <ApItemGroup label={'電話番号'}>
              <Stack spacing={3}>
                <ApPhoneInputField
                  name="p_applicant_persons__1__mobile_phone"
                  label={'携帯'}
                  onFocus={() => formik.setFieldTouched('p_applicant_persons__1__home_phone', false)}
                />
                <ApPhoneInputField
                  name="p_applicant_persons__1__home_phone"
                  label={'自宅'}
                  onFocus={() => formik.setFieldTouched('p_applicant_persons__1__mobile_phone', false)}
                />
                <ApStarHelp label={'半角数字でご入力ください。'} />
              </Stack>
            </ApItemGroup>
            <ApItemGroup label={'現住所'}>
              <Stack spacing={4}>
                <ApZipCodeInputField
                  name="p_applicant_persons__1__postal_code"
                  callback={(addr) => {
                    formik.setFieldValue('p_applicant_persons__1__prefecture_kanji', addr.prefecture_kanji);
                    formik.setFieldValue('p_applicant_persons__1__city_kanji', addr.city_kanji);
                    formik.setFieldValue('p_applicant_persons__1__district_kanji', addr.district_kanji);
                  }}
                  errorCallback={() => {
                    formik.setFieldValue('p_applicant_persons__1__prefecture_kanji', '');
                    formik.setFieldValue('p_applicant_persons__1__city_kanji', '');
                    formik.setFieldValue('p_applicant_persons__1__district_kanji', '');
                  }}
                />
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
        <ApSaveDraftButton pageInfo={parseVaildData} />
        <ApStepFooter left={handelLeft} right={formik.handleSubmit} />
      </ApLayout>
    </FormikProvider>
  );
};
