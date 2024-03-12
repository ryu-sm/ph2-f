import { ApLayout, ApStepFooter } from '@/containers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { agentSendedSelector, applicationAtom, applyNoSelector, authAtom } from '@/store';
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
  ApUpdateApply,
  ApZipCodeInputField,
} from '@/components';
import { Box, Link, Stack, Typography } from '@mui/material';
import { agreeOptions, genderOptions, nationalityOptions, yearOptions } from './options';
import { API_500_ERROR, PREFECTURES } from '@/constant';
import { useNavigate } from 'react-router-dom';
import { Icons } from '@/assets';
import { CONFIRMATION_URL, CONSENT_URL } from '@/configs';
import { cloneDeep } from 'lodash';
import { useApUpdateApplyInfo, useBoolean } from '@/hooks';
import { apApplicationFile } from '@/services';
import { routeNames } from '@/router/settings';
import { diffObj } from '@/utils';
import { toast } from 'react-toastify';

export const ApStep04Page = () => {
  const navigate = useNavigate();
  const setApplicationInfo = useSetRecoilState(applicationAtom);

  const { applyNo, agentSended } = useRecoilValue(authAtom);
  const updateModal = useBoolean(false);
  const {
    apNextStepId,
    apPreStepId,
    changeToIncomeTotalizer,
    hasIncomeTotalizer,
    //
    p_application_headers,
    p_applicant_persons_b_agreement,
    p_applicant_persons__1,
    p_uploaded_files,
  } = useRecoilValue(applicationAtom);
  const updateApply = useApUpdateApplyInfo();

  const setLocalData = (values) => {
    setApplicationInfo((pre) => {
      return {
        ...pre,
        p_applicant_persons__1: {
          ...pre.p_applicant_persons__1,
          last_name_kanji: values.p_applicant_persons__1.last_name_kanji,
          first_name_kanji: values.p_applicant_persons__1.first_name_kanji,
          last_name_kana: values.p_applicant_persons__1.last_name_kana,
          first_name_kana: values.p_applicant_persons__1.first_name_kana,
          gender: values.p_applicant_persons__1.gender,
          birthday: values.p_applicant_persons__1.birthday,
          nationality: values.p_applicant_persons__1.nationality,
          mobile_phone: values.p_applicant_persons__1.mobile_phone,
          home_phone: values.p_applicant_persons__1.home_phone,
          postal_code: values.p_applicant_persons__1.postal_code,
          prefecture_kanji: values.p_applicant_persons__1.prefecture_kanji,
          city_kanji: values.p_applicant_persons__1.city_kanji,
          district_kanji: values.p_applicant_persons__1.district_kanji,
          other_address_kanji: values.p_applicant_persons__1.other_address_kanji,
          prefecture_kana: values.p_applicant_persons__1.prefecture_kana,
          city_kana: values.p_applicant_persons__1.city_kana,
          district_kana: values.p_applicant_persons__1.district_kana,
          rel_to_applicant_a_name: values.p_applicant_persons__1.rel_to_applicant_a_name,
        },
        p_uploaded_files: {
          ...pre.p_uploaded_files,
          p_applicant_persons__1__H__a: values.p_uploaded_files.p_applicant_persons__1__H__a,
          p_applicant_persons__1__H__b: values.p_uploaded_files.p_applicant_persons__1__H__b,
        },
        p_applicant_persons_b_agreement: values.p_applicant_persons_b_agreement,
      };
    });
  };
  const initialValues = {
    consent: '',
    confirmation: '',
    hasIncomeTotalizer,
    p_applicant_persons_b_agreement,
    p_applicant_persons__1: {
      last_name_kanji: p_applicant_persons__1.last_name_kanji,
      first_name_kanji: p_applicant_persons__1.first_name_kanji,
      last_name_kana: p_applicant_persons__1.last_name_kana,
      first_name_kana: p_applicant_persons__1.first_name_kana,
      gender: p_applicant_persons__1.gender,
      birthday: p_applicant_persons__1.birthday,
      nationality: p_applicant_persons__1.nationality,
      mobile_phone: p_applicant_persons__1.mobile_phone,
      home_phone: p_applicant_persons__1.home_phone,
      postal_code: p_applicant_persons__1.postal_code,
      prefecture_kanji: p_applicant_persons__1.prefecture_kanji,
      city_kanji: p_applicant_persons__1.city_kanji,
      district_kanji: p_applicant_persons__1.district_kanji,
      other_address_kanji: p_applicant_persons__1.other_address_kanji,
      prefecture_kana: p_applicant_persons__1.prefecture_kana,
      city_kana: p_applicant_persons__1.city_kana,
      district_kana: p_applicant_persons__1.district_kana,
      rel_to_applicant_a_name: p_applicant_persons__1.rel_to_applicant_a_name,
    },
    p_uploaded_files: {
      p_applicant_persons__1__H__a: p_uploaded_files.p_applicant_persons__1__H__a,
      p_applicant_persons__1__H__b: p_uploaded_files.p_applicant_persons__1__H__b,
    },
  };
  const setUpdateData = (values) => {
    const diffData = {
      p_applicant_persons__1: {
        ...diffObj(initialValues.p_applicant_persons__1, values.p_applicant_persons__1),
      },
      p_uploaded_files: {
        ...diffObj(initialValues.p_uploaded_files, values.p_uploaded_files),
      },
      p_application_headers: {
        loan_type: p_application_headers.loan_type,
      },
    };
    return diffData;
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (changeToIncomeTotalizer) {
          setLocalData(values);
          navigate(routeNames.apStep05Page.path);
        } else if (agentSended) {
          await updateApply(applyNo, setUpdateData(values));
          updateModal.onTrue();
        } else {
          setLocalData(values);
          navigate(`/step-id-${apNextStepId}`);
        }
      } catch (error) {
        toast.error(API_500_ERROR);
      }
    },
  });

  const sendedFile = useCallback(async () => {
    if (agentSended) {
      try {
        const res = await apApplicationFile(applyNo);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__H__a', res.data.p_applicant_persons__1__H__a);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__H__b', res.data.p_applicant_persons__1__H__b);
      } catch (error) {
        console.error(error);
      }
    }
  });

  useEffect(() => {
    sendedFile();
  }, [agentSended, applyNo]);

  const parseVaildData = useMemo(() => {
    const dataCopy = cloneDeep(formik.values);
    delete dataCopy.confirmation;
    delete dataCopy.consent;
    return dataCopy;
  }, [formik.values]);

  const handelLeft = () => {
    if (changeToIncomeTotalizer) {
      setLocalData(formik.values);
      navigate(routeNames.apStep01Page.path);
    } else if (agentSended) {
      navigate(routeNames.apTopPage.path);
    } else {
      setLocalData(formik.values);
      navigate(`/step-id-${apPreStepId}`);
    }
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
        <ApUpdateApply isOpen={updateModal.value} onClose={updateModal.onFalse} />
        <ApPageTitle py={8}>{`収入合算者について\n教えてください。`}</ApPageTitle>
        <Stack alignItems={'center'} sx={{ pb: 6 }}>
          <ApIncomeTotalizerModal />
        </Stack>
        {(!p_applicant_persons_b_agreement || changeToIncomeTotalizer) && (
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
                <ApTextInputField name="p_applicant_persons__1.last_name_kanji" placeholder={'姓'} convertFullWidth />
                <ApTextInputField name="p_applicant_persons__1.first_name_kanji" placeholder={'名'} convertFullWidth />
                <ApStarHelp label={'外国籍のかたは、在留カード通りに入力ください。'} />
                <ApStarHelp label={'お名前の漢字が外字等で変換できない場合は常用漢字でご入力ください。'} />
              </Stack>
            </ApItemGroup>
            <ApItemGroup label={'お名前（フリガナ）'}>
              <Stack spacing={3}>
                <ApTextInputField name="p_applicant_persons__1.last_name_kana" placeholder={'セイ'} convertFullWidth />
                <ApTextInputField name="p_applicant_persons__1.first_name_kana" placeholder={'メイ'} convertFullWidth />
              </Stack>
            </ApItemGroup>
            <ApItemGroup label={'性別'}>
              <ApRadioRowGroup name="p_applicant_persons__1.gender" options={genderOptions} />
            </ApItemGroup>
            <ApItemGroup label={'続柄'} pb={3} px={2}>
              <ApTextInputField
                name="p_applicant_persons__1.rel_to_applicant_a_name"
                placeholder={'例：父'}
                convertFullWidth
              />
            </ApItemGroup>
            <ApItemGroup label={'生年月日'}>
              <Stack spacing={3}>
                <ApSelectFieldYmd name="p_applicant_persons__1.birthday" yearOptions={yearOptions} />
                {/* <ApStarHelp label={'借入時満18歳以上満65歳以下・完済時満80歳未満の方がご利用いただけます。'} /> */}
              </Stack>
            </ApItemGroup>
            <ApItemGroup label={'現在の国籍'}>
              <Stack spacing={3}>
                <ApRadioRowGroup
                  name="p_applicant_persons__1.nationality"
                  options={nationalityOptions}
                  onChange={(e) => {
                    if (e.target.value === '1') {
                      formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__H__a', []);
                      formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__H__b', []);
                    }
                  }}
                />
                {formik.values.p_applicant_persons__1.nationality === '2' && (
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
                          {((formik.touched.p_uploaded_files?.p_applicant_persons__1__H__a &&
                            formik.errors.p_uploaded_files?.p_applicant_persons__1__H__a) ||
                            (formik.touched.p_uploaded_files?.p_applicant_persons__1__H__b &&
                              formik.errors.p_uploaded_files?.p_applicant_persons__1__H__b)) && (
                            <Typography variant="waring" color={'secondary.main'}>
                              {'※外国籍の場合、在留カードまたは特別永住者証明書を添付することは必須です'}
                            </Typography>
                          )}
                          <Stack spacing={3} direction={'row'} alignItems={'start'}>
                            <Stack spacing={'6px'}>
                              <Typography variant="label" color={'text.main'}>
                                〈表面〉
                              </Typography>
                              <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__H__a" singleFile />
                            </Stack>
                            <Stack spacing={'6px'}>
                              <Typography variant="label" color={'text.main'}>
                                〈裏面〉
                              </Typography>
                              <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__H__b" singleFile />
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
                  name="p_applicant_persons__1.mobile_phone"
                  label={'携帯'}
                  onFocus={() => formik.setFieldTouched('p_applicant_persons__1.home_phone', false)}
                />
                <ApPhoneInputField
                  name="p_applicant_persons__1.home_phone"
                  label={'自宅'}
                  onFocus={() => formik.setFieldTouched('p_applicant_persons__1.mobile_phone', false)}
                />
                <ApStarHelp label={'半角数字でご入力ください。'} />
              </Stack>
            </ApItemGroup>
            <ApItemGroup label={'現住所'}>
              <Stack spacing={4}>
                <ApZipCodeInputField
                  name="p_applicant_persons__1.postal_code"
                  callback={(addr) => {
                    formik.setFieldValue('p_applicant_persons__1.prefecture_kanji', addr.prefecture_kanji);
                    formik.setFieldValue('p_applicant_persons__1.city_kanji', addr.city_kanji);
                    formik.setFieldValue('p_applicant_persons__1.district_kanji', addr.district_kanji);
                    formik.setFieldValue('p_applicant_persons__1.prefecture_kana', addr.prefecture_kana);
                    formik.setFieldValue('p_applicant_persons__1.city_kana', addr.city_kana);
                    formik.setFieldValue('p_applicant_persons__1.district_kana', addr.district_kana);
                  }}
                  errorCallback={() => {
                    formik.setFieldValue('p_applicant_persons__1.prefecture_kanji', '');
                    formik.setFieldValue('p_applicant_persons__1.city_kanji', '');
                    formik.setFieldValue('p_applicant_persons__1.district_kanji', '');
                    formik.setFieldValue('p_applicant_persons__1.prefecture_kana', '');
                    formik.setFieldValue('p_applicant_persons__1.city_kana', '');
                    formik.setFieldValue('p_applicant_persons__1.district_kana', '');
                  }}
                />
                <ApSelectField
                  name="p_applicant_persons__1.prefecture_kanji"
                  options={PREFECTURES}
                  placeholder={'----'}
                  width={110}
                  label={'都道府県'}
                />
                <ApTextInputField
                  name="p_applicant_persons__1.city_kanji"
                  placeholder={'例：港区'}
                  label={'市区郡　（例：港区）'}
                  convertFullWidth
                />
                <ApTextInputField
                  name="p_applicant_persons__1.district_kanji"
                  placeholder={'例：芝浦４丁目'}
                  label={'町村丁目（例：芝浦４丁目）'}
                  convertFullWidth
                />
                <ApTextInputField
                  name="p_applicant_persons__1.other_address_kanji"
                  placeholder={'例：12-38　キャナルゲート芝浦605号室'}
                  label={'丁目以下・建物名・部屋番号（例：12-38　キャナルゲート芝浦605号室）'}
                  convertFullWidth
                />
              </Stack>
            </ApItemGroup>
          </Stack>
        )}
        <ApSaveDraftButton pageInfo={parseVaildData} />
        <ApStepFooter
          left={handelLeft}
          right={formik.handleSubmit}
          rightLabel={changeToIncomeTotalizer ? false : agentSended && '保存'}
        />
      </ApLayout>
    </FormikProvider>
  );
};
