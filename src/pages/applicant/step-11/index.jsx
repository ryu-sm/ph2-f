import { FormikProvider, useFormik } from 'formik';
import {
  ApErrorScroll,
  ApImgUpload,
  ApItemGroup,
  ApPageTitle,
  ApRadioColumnGroupUpload,
  ApSaveDraftButton,
  ApStarHelp,
  ApUpdateApply,
} from '@/components';
import { ApLayout, ApStepFooter } from '@/containers';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { applicationAtom, authAtom } from '@/store';
import { validationSchema } from './validationSchema';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography, Link } from '@mui/material';
import { useCallback, useEffect, useMemo } from 'react';
import { Icons } from '@/assets';
import { cloneDeep } from 'lodash';
import { useApUpdateApplyInfo, useBoolean } from '@/hooks';
import { routeNames } from '@/router/settings';
import { apApplicationFile } from '@/services';
import { diffObj } from '@/utils';
import { toast } from 'react-toastify';
import { API_500_ERROR } from '@/constant';

export const ApStep11Page = () => {
  const navigate = useNavigate();
  const setApplicationInfo = useSetRecoilState(applicationAtom);
  const { applyNo, agentSended } = useRecoilValue(authAtom);
  const updateModal = useBoolean(false);
  const {
    apNextStepId,
    apPreStepId,
    changeToIncomeTotalizer,
    changeJoinGuarantor,
    p_application_headers,
    p_applicant_persons__1,
    p_uploaded_files,
    p_join_guarantors,
  } = useRecoilValue(applicationAtom);
  const updateApply = useApUpdateApplyInfo();

  const setLocalData = (values) => {
    setApplicationInfo((pre) => {
      return {
        ...pre,
        p_uploaded_files: {
          ...pre.p_uploaded_files,
          p_applicant_persons__1__A__01__a: values.p_uploaded_files.p_applicant_persons__1__A__01__a,
          p_applicant_persons__1__A__01__b: values.p_uploaded_files.p_applicant_persons__1__A__01__b,
          p_applicant_persons__1__A__02: values.p_uploaded_files.p_applicant_persons__1__A__02,
          p_applicant_persons__1__A__03__a: values.p_uploaded_files.p_applicant_persons__1__A__03__a,
          p_applicant_persons__1__A__03__b: values.p_uploaded_files.p_applicant_persons__1__A__03__b,
          p_applicant_persons__1__B__a: values.p_uploaded_files.p_applicant_persons__1__B__a,
          p_applicant_persons__1__B__b: values.p_uploaded_files.p_applicant_persons__1__B__b,
          p_applicant_persons__1__C__01: values.p_uploaded_files.p_applicant_persons__1__C__01,
          p_applicant_persons__1__C__02: values.p_uploaded_files.p_applicant_persons__1__C__02,
          p_applicant_persons__1__C__03: values.p_uploaded_files.p_applicant_persons__1__C__03,
          p_applicant_persons__1__C__04: values.p_uploaded_files.p_applicant_persons__1__C__04,
          p_applicant_persons__1__C__05: values.p_uploaded_files.p_applicant_persons__1__C__05,
          p_applicant_persons__1__D__01: values.p_uploaded_files.p_applicant_persons__1__D__01,
          p_applicant_persons__1__D__02: values.p_uploaded_files.p_applicant_persons__1__D__02,
          p_applicant_persons__1__D__03: values.p_uploaded_files.p_applicant_persons__1__D__03,
          p_applicant_persons__1__E: values.p_uploaded_files.p_applicant_persons__1__E,
          p_applicant_persons__1__F__01: values.p_uploaded_files.p_applicant_persons__1__F__01,
          p_applicant_persons__1__F__02: values.p_uploaded_files.p_applicant_persons__1__F__02,
          p_applicant_persons__1__F__03: values.p_uploaded_files.p_applicant_persons__1__F__03,
          p_applicant_persons__1__K: values.p_uploaded_files.p_applicant_persons__1__K,
        },
        p_applicant_persons__1: {
          ...pre.p_applicant_persons__1,
          identity_verification_type: values.p_applicant_persons__1.identity_verification_type,
        },
      };
    });
  };
  const initialValues = {
    p_uploaded_files: {
      p_applicant_persons__1__A__01__a: p_uploaded_files.p_applicant_persons__1__A__01__a,
      p_applicant_persons__1__A__01__b: p_uploaded_files.p_applicant_persons__1__A__01__b,
      p_applicant_persons__1__A__02: p_uploaded_files.p_applicant_persons__1__A__02,
      p_applicant_persons__1__A__03__a: p_uploaded_files.p_applicant_persons__1__A__03__a,
      p_applicant_persons__1__A__03__b: p_uploaded_files.p_applicant_persons__1__A__03__b,
      p_applicant_persons__1__B__a: p_uploaded_files.p_applicant_persons__1__B__a,
      p_applicant_persons__1__B__b: p_uploaded_files.p_applicant_persons__1__B__b,
      p_applicant_persons__1__C__01: p_uploaded_files.p_applicant_persons__1__C__01,
      p_applicant_persons__1__C__02: p_uploaded_files.p_applicant_persons__1__C__02,
      p_applicant_persons__1__C__03: p_uploaded_files.p_applicant_persons__1__C__03,
      p_applicant_persons__1__C__04: p_uploaded_files.p_applicant_persons__1__C__04,
      p_applicant_persons__1__C__05: p_uploaded_files.p_applicant_persons__1__C__05,
      p_applicant_persons__1__D__01: p_uploaded_files.p_applicant_persons__1__D__01,
      p_applicant_persons__1__D__02: p_uploaded_files.p_applicant_persons__1__D__02,
      p_applicant_persons__1__D__03: p_uploaded_files.p_applicant_persons__1__D__03,
      p_applicant_persons__1__E: p_uploaded_files.p_applicant_persons__1__E,
      p_applicant_persons__1__F__01: p_uploaded_files.p_applicant_persons__1__F__01,
      p_applicant_persons__1__F__02: p_uploaded_files.p_applicant_persons__1__F__02,
      p_applicant_persons__1__F__03: p_uploaded_files.p_applicant_persons__1__F__03,
      p_applicant_persons__1__K: p_uploaded_files.p_applicant_persons__1__K,
    },
    p_applicant_persons__1: {
      identity_verification_type: p_applicant_persons__1.identity_verification_type,
    },
  };

  const setUpdateData = (values) => {
    const newData = {
      p_uploaded_files: {
        ...(values.p_applicant_persons__1.identity_verification_type === '1'
          ? {
              p_applicant_persons__1__A__01__a: values.p_uploaded_files.p_applicant_persons__1__A__01__a,
              p_applicant_persons__1__A__01__b: values.p_uploaded_files.p_applicant_persons__1__A__01__b,
              p_applicant_persons__1__A__02: [],
              p_applicant_persons__1__A__03__a: [],
              p_applicant_persons__1__A__03__b: [],
            }
          : {}),
        ...(values.p_applicant_persons__1.identity_verification_type === '2'
          ? {
              p_applicant_persons__1__A__01__a: [],
              p_applicant_persons__1__A__01__b: [],
              p_applicant_persons__1__A__02: values.p_uploaded_files.p_applicant_persons__1__A__02,
              p_applicant_persons__1__A__03__a: [],
              p_applicant_persons__1__A__03__b: [],
            }
          : {}),
        ...(values.p_applicant_persons__1.identity_verification_type === '3'
          ? {
              p_applicant_persons__1__A__01__a: [],
              p_applicant_persons__1__A__01__b: [],
              p_applicant_persons__1__A__02: [],
              p_applicant_persons__1__A__03__a: values.p_uploaded_files.p_applicant_persons__1__A__03__a,
              p_applicant_persons__1__A__03__b: values.p_uploaded_files.p_applicant_persons__1__A__03__b,
            }
          : {}),
        p_applicant_persons__1__B__a: values.p_uploaded_files.p_applicant_persons__1__B__a,
        p_applicant_persons__1__B__b: values.p_uploaded_files.p_applicant_persons__1__B__b,
        p_applicant_persons__1__C__01: values.p_uploaded_files.p_applicant_persons__1__C__01,
        p_applicant_persons__1__C__02: values.p_uploaded_files.p_applicant_persons__1__C__02,
        p_applicant_persons__1__C__03: values.p_uploaded_files.p_applicant_persons__1__C__03,
        p_applicant_persons__1__C__04: values.p_uploaded_files.p_applicant_persons__1__C__04,
        p_applicant_persons__1__C__05: values.p_uploaded_files.p_applicant_persons__1__C__05,
        p_applicant_persons__1__D__01: values.p_uploaded_files.p_applicant_persons__1__D__01,
        p_applicant_persons__1__D__02: values.p_uploaded_files.p_applicant_persons__1__D__02,
        p_applicant_persons__1__D__03: values.p_uploaded_files.p_applicant_persons__1__D__03,
        p_applicant_persons__1__E: values.p_uploaded_files.p_applicant_persons__1__E,
        p_applicant_persons__1__F__01: values.p_uploaded_files.p_applicant_persons__1__F__01,
        p_applicant_persons__1__F__02: values.p_uploaded_files.p_applicant_persons__1__F__02,
        p_applicant_persons__1__F__03: values.p_uploaded_files.p_applicant_persons__1__F__03,
        p_applicant_persons__1__K: values.p_uploaded_files.p_applicant_persons__1__K,
      },
      p_applicant_persons__1: {
        identity_verification_type: values.p_applicant_persons__1.identity_verification_type,
      },
    };
    const diffData = {
      p_uploaded_files: {
        ...diffObj(initialValues.p_uploaded_files, newData.p_uploaded_files),
        ...(changeToIncomeTotalizer
          ? {
              p_applicant_persons__1__H__a: p_uploaded_files.p_applicant_persons__1__H__a,
              p_applicant_persons__1__H__b: p_uploaded_files.p_applicant_persons__1__H__b,
            }
          : {}),
      },
      p_applicant_persons__1: {
        ...diffObj(initialValues.p_applicant_persons__1, newData.p_applicant_persons__1),
        ...(changeToIncomeTotalizer
          ? {
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
              //
              office_occupation: p_applicant_persons__1.office_occupation,
              office_occupation_other: p_applicant_persons__1.office_occupation_other,
              office_industry: p_applicant_persons__1.office_industry,
              office_industry_other: p_applicant_persons__1.office_industry_other,
              office_occupation_detail: p_applicant_persons__1.office_occupation_detail,
              office_occupation_detail_other: p_applicant_persons__1.office_occupation_detail_other,
              office_name_kanji: p_applicant_persons__1.office_name_kanji,
              office_department: p_applicant_persons__1.office_department,
              office_phone: p_applicant_persons__1.office_phone,
              office_postal_code: p_applicant_persons__1.office_postal_code,
              office_prefecture_kanji: p_applicant_persons__1.office_prefecture_kanji,
              office_city_kanji: p_applicant_persons__1.office_city_kanji,
              office_district_kanji: p_applicant_persons__1.office_district_kanji,
              office_other_address_kanji: p_applicant_persons__1.office_other_address_kanji,
              office_prefecture_kana: p_applicant_persons__1.office_prefecture_kana,
              office_city_kana: p_applicant_persons__1.office_city_kana,
              office_district_kana: p_applicant_persons__1.office_district_kana,
              office_employee_num: p_applicant_persons__1.office_employee_num,
              office_joining_date: p_applicant_persons__1.office_joining_date,
              last_year_income: p_applicant_persons__1.last_year_income,
              last_year_bonus_income: p_applicant_persons__1.last_year_bonus_income,
              income_sources: p_applicant_persons__1.income_sources,
              tax_return: p_applicant_persons__1.tax_return,
              tax_return_reasons: p_applicant_persons__1.tax_return_reasons,
              tax_return_reason_other: p_applicant_persons__1.tax_return_reason_other,
              transfer_office: p_applicant_persons__1.transfer_office,
              transfer_office_name_kanji: p_applicant_persons__1.transfer_office_name_kanji,
              transfer_office_name_kana: p_applicant_persons__1.transfer_office_name_kana,
              transfer_office_phone: p_applicant_persons__1.transfer_office_phone,
              transfer_office_postal_code: p_applicant_persons__1.transfer_office_postal_code,
              transfer_office_prefecture_kanji: p_applicant_persons__1.transfer_office_prefecture_kanji,
              transfer_office_city_kanji: p_applicant_persons__1.transfer_office_city_kanji,
              transfer_office_district_kanji: p_applicant_persons__1.transfer_office_district_kanji,
              transfer_office_other_address_kanji: p_applicant_persons__1.transfer_office_other_address_kanji,
              maternity_paternity_leave: p_applicant_persons__1.maternity_paternity_leave,
              maternity_paternity_leave_start_date: p_applicant_persons__1.maternity_paternity_leave_start_date,
              maternity_paternity_leave_end_date: p_applicant_persons__1.maternity_paternity_leave_end_date,
              nursing_leave: p_applicant_persons__1.nursing_leave,
            }
          : {}),
      },
      ...(changeJoinGuarantor ? { p_join_guarantors: p_join_guarantors } : {}),
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
        if (agentSended) {
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
        formik.setFieldValue(
          'p_uploaded_files.p_applicant_persons__1__A__01__a',
          res.data.p_applicant_persons__1__A__01__a
        );
        formik.setFieldValue(
          'p_uploaded_files.p_applicant_persons__1__A__01__b',
          res.data.p_applicant_persons__1__A__01__b
        );
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__A__02', res.data.p_applicant_persons__1__A__02);
        formik.setFieldValue(
          'p_uploaded_files.p_applicant_persons__1__A__03__a',
          res.data.p_applicant_persons__1__A__03__a
        );
        formik.setFieldValue(
          'p_uploaded_files.p_applicant_persons__1__A__03__b',
          res.data.p_applicant_persons__1__A__03__b
        );
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__B__a', res.data.p_applicant_persons__1__B__a);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__B__b', res.data.p_applicant_persons__1__B__b);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__C__01', res.data.p_applicant_persons__1__C__01);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__C__02', res.data.p_applicant_persons__1__C__02);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__C__03', res.data.p_applicant_persons__1__C__03);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__C__04', res.data.p_applicant_persons__1__C__04);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__C__05', res.data.p_applicant_persons__1__C__05);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__D__01', res.data.p_applicant_persons__1__D__01);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__D__02', res.data.p_applicant_persons__1__D__02);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__D__03', res.data.p_applicant_persons__1__D__03);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__E', res.data.p_applicant_persons__1__E);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__F__01', res.data.p_applicant_persons__1__F__01);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__F__02', res.data.p_applicant_persons__1__F__02);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__F__03', res.data.p_applicant_persons__1__F__03);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__K', res.data.p_applicant_persons__1__K);
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
    return dataCopy;
  }, [formik.values]);

  const handelLeft = () => {
    if (changeToIncomeTotalizer) {
      setLocalData(formik.values);
      navigate(routeNames.apStep05Page.path);
    } else if (agentSended) {
      navigate(routeNames.apTopPage.path);
    } else {
      setLocalData(formik.values);
      navigate(`/step-id-${apPreStepId}`);
    }
  };

  const plan = useMemo(() => {
    if (
      p_applicant_persons__1.tax_return === '1' &&
      (p_applicant_persons__1.tax_return_reasons.includes('1') ||
        p_applicant_persons__1.tax_return_reasons.includes('2') ||
        p_applicant_persons__1.tax_return_reasons.includes('3') ||
        p_applicant_persons__1.tax_return_reasons.includes('6') ||
        p_applicant_persons__1.tax_return_reasons.includes('99'))
    ) {
      return 'B';
    } else {
      return 'A';
    }
  }, [p_applicant_persons__1.tax_return, p_applicant_persons__1.tax_return_reasons]);

  const identityVerificationOption = [
    {
      value: '1',
      label: '運転免許証',
      touched:
        formik.touched.p_uploaded_files?.p_applicant_persons__1__A__01__a &&
        formik.touched.p_uploaded_files?.p_applicant_persons__1__A__01__b,
      imgUpload: (
        <Stack spacing={3} direction={'row'} alignItems={'start'} sx={{ width: 1, bgcolor: 'white', px: 3 }}>
          <Stack spacing={'6px'}>
            <Typography variant="label" color={'text.main'}>
              〈表面〉
            </Typography>
            <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__A__01__a" singleFile />
          </Stack>
          <Stack spacing={'6px'}>
            <Typography variant="label" color={'text.main'}>
              〈裏面〉
            </Typography>
            <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__A__01__b" singleFile />
          </Stack>
        </Stack>
      ),
    },
    {
      value: '2',
      label: 'マイナンバーカード',
      touched: formik.touched.p_uploaded_files?.p_applicant_persons__1__A__02,
      imgUpload: (
        <Stack spacing={3} direction={'row'} alignItems={'start'} sx={{ width: 1, bgcolor: 'white', px: 3 }}>
          <Stack spacing={'6px'}>
            <Typography variant="label" color={'text.main'}>
              〈表面〉
            </Typography>
            <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__A__02" singleFile />
          </Stack>
        </Stack>
      ),
    },
    {
      value: '3',
      label: '住民基本台帳カード（顔写真付き）',
      touched:
        formik.touched.p_uploaded_files?.p_applicant_persons__1__A__03__a &&
        formik.touched.p_uploaded_files?.p_applicant_persons__1__A__03__b,
      imgUpload: (
        <Stack spacing={3} direction={'row'} alignItems={'start'} sx={{ width: 1, bgcolor: 'white', px: 3 }}>
          <Stack spacing={'6px'}>
            <Typography variant="label" color={'text.main'}>
              〈表面〉
            </Typography>
            <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__A__03__a" singleFile />
          </Stack>
          <Stack spacing={'6px'}>
            <Typography variant="label" color={'text.main'}>
              〈裏面〉
            </Typography>
            <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__A__03__b" singleFile />
          </Stack>
        </Stack>
      ),
    },
  ];

  return (
    <FormikProvider value={formik}>
      <ApErrorScroll />
      <ApLayout hasMenu hasStepBar pb={18}>
        <ApUpdateApply isOpen={updateModal.value} onClose={updateModal.onFalse} />
        <ApPageTitle>{`本人確認書類など\n書類を添付しましょう`}</ApPageTitle>
        <Stack sx={{ px: 4, pb: 4 }}>
          <ApStarHelp label={'審査状況により他の資料提出をお願いすることがありますのでご了承ください。'} />
        </Stack>
        <ApItemGroup
          label={
            <Typography variant="form_item_label" color={'text.main'}>
              本人確認書類
              <Typography variant="note" color={'text.main'}>
                {' '}
                ※どれか一つ選択してください
              </Typography>
            </Typography>
          }
        >
          <ApRadioColumnGroupUpload
            name="p_applicant_persons__1.identity_verification_type"
            options={identityVerificationOption}
          />
        </ApItemGroup>

        <ApItemGroup label={'健康保険証'}>
          <Stack sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}>
            <Stack spacing={3} direction={'row'} alignItems={'start'} sx={{ width: 1, bgcolor: 'white' }}>
              <Stack spacing={'6px'}>
                <Typography variant="label" color={'text.main'}>
                  〈表面〉
                </Typography>
                <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__B__a" singleFile />
              </Stack>
              <Stack spacing={'6px'}>
                <Typography variant="label" color={'text.main'}>
                  〈裏面〉
                </Typography>
                <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__B__b" singleFile />
              </Stack>
            </Stack>
          </Stack>
        </ApItemGroup>
        {plan === 'A' && p_applicant_persons__1.office_occupation === '1' && (
          <Stack>
            <ApItemGroup label={'収入に関する書類'}>
              <Stack spacing={3}>
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    源泉徴収票（前年度分）
                  </Typography>
                  <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__C__01" />
                </Stack>
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    源泉徴収票（前々年度分）
                  </Typography>
                  <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__C__02" />
                </Stack>
              </Stack>
            </ApItemGroup>
            <ApItemGroup label={`非上場企業の役員の方は\n下記の書類も添付してください。`}>
              <Stack spacing={3}>
                <ApStarHelp
                  label={
                    <Typography variant="note" color={'text.main'}>
                      {`枚数が多い場合はPDFファイルを\n`}
                      <Typography
                        component={Link}
                        variant="note"
                        color={'text.main'}
                        href={`mailto:ssnbmbk_info@ssnbagent.netbk.co.jp`}
                        sx={{ textDecorationLine: 'none' }}
                      >
                        ssnbmbk_info@ssnbagent.netbk.co.jp
                      </Typography>
                      へメール送付してください。
                    </Typography>
                  }
                />
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    会社の決算報告書（1期前）
                  </Typography>
                  <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__D__01" />
                </Stack>
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    会社の決算報告書（2期前）
                  </Typography>
                  <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__D__02" />
                </Stack>
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    会社の決算報告書（3期前）
                  </Typography>
                  <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__D__03" />
                </Stack>
              </Stack>
            </ApItemGroup>
          </Stack>
        )}

        {plan === 'A' && ['6', '7', '8'].includes(p_applicant_persons__1.office_occupation) && (
          <Stack>
            <ApItemGroup label={'収入に関する書類'}>
              <Stack
                spacing={'6px'}
                sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
              >
                <Typography variant="label" color={'text.main'}>
                  源泉徴収票（前年度分）
                </Typography>
                <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__C__01" />
              </Stack>
            </ApItemGroup>
            <ApItemGroup label={`雇用契約に関する書類`}>
              <Stack
                spacing={'6px'}
                sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
              >
                <Typography variant="label" color={'text.main'}>
                  雇用契約書
                </Typography>
                <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__E" />
              </Stack>
            </ApItemGroup>
          </Stack>
        )}

        {plan === 'A' && !['1', '6', '7', '8'].includes(p_applicant_persons__1.office_occupation) && (
          <Stack>
            <ApItemGroup label={'収入に関する書類'}>
              <Stack spacing={3}>
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    源泉徴収票（前年度分）
                  </Typography>
                  <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__C__01" />
                </Stack>
                {(p_applicant_persons__1.income_sources.includes('2') ||
                  p_applicant_persons__1.income_sources.includes('3')) && (
                  <Stack
                    spacing={'6px'}
                    sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                  >
                    <Typography variant="label" color={'text.main'}>
                      源泉徴収票（前々年度分）
                    </Typography>
                    <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__C__02" />
                  </Stack>
                )}
              </Stack>
            </ApItemGroup>
            <ApItemGroup label={`親族経営の会社等にご勤務の方は\n下記の書類も添付してください。`}>
              <Stack spacing={3}>
                <ApStarHelp
                  label={
                    <Typography variant="note" color={'text.main'}>
                      {`枚数が多い場合はPDFファイルを\n`}
                      <Typography
                        component={Link}
                        variant="note"
                        color={'text.main'}
                        href={`mailto:ssnbmbk_info@ssnbagent.netbk.co.jp`}
                        sx={{ textDecorationLine: 'none' }}
                      >
                        ssnbmbk_info@ssnbagent.netbk.co.jp
                      </Typography>
                      へメール送付してください。
                    </Typography>
                  }
                />
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    {`会社の決算報告書\nまたは経営する親族の確定申告書（1期前）`}
                  </Typography>
                  <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__F__01" />
                </Stack>
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    {`会社の決算報告書\nまたは経営する親族の確定申告書（2期前）`}
                  </Typography>
                  <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__F__02" />
                </Stack>
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    {`会社の決算報告書\nまたは経営する親族の確定申告書（3期前）`}
                  </Typography>
                  <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__F__03" />
                </Stack>
              </Stack>
            </ApItemGroup>
          </Stack>
        )}

        {plan === 'B' && (
          <Stack>
            <ApItemGroup label={'収入に関する書類'}>
              <Stack spacing={3}>
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    確定申告書（1期前）
                  </Typography>
                  <Stack spacing={1} direction={'row'} alignItems={'center'}>
                    <Icons.ApImportentIcon />
                    <Typography variant="waring" color={'secondary.main'}>
                      個人番号を隠した画像を添付してください
                    </Typography>
                  </Stack>
                  <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__C__03" />
                </Stack>
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    確定申告書（2期前）
                  </Typography>
                  <Stack spacing={1} direction={'row'} alignItems={'center'}>
                    <Icons.ApImportentIcon />
                    <Typography variant="waring" color={'secondary.main'}>
                      個人番号を隠した画像を添付してください
                    </Typography>
                  </Stack>
                  <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__C__04" />
                </Stack>
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    確定申告書（3期前）
                  </Typography>
                  <Stack spacing={1} direction={'row'} alignItems={'center'}>
                    <Icons.ApImportentIcon />
                    <Typography variant="waring" color={'secondary.main'}>
                      個人番号を隠した画像を添付してください
                    </Typography>
                  </Stack>
                  <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__C__05" />
                </Stack>
              </Stack>
            </ApItemGroup>
            {p_applicant_persons__1.office_occupation === '1' && (
              <ApItemGroup label={`非上場企業の役員の方は\n下記の書類も添付してください。`}>
                <Stack spacing={3}>
                  <ApStarHelp
                    label={
                      <Typography variant="note" color={'text.main'}>
                        {`枚数が多い場合はPDFファイルを\n`}
                        <Typography
                          component={Link}
                          variant="note"
                          color={'text.main'}
                          href={`mailto:ssnbmbk_info@ssnbagent.netbk.co.jp`}
                          sx={{ textDecorationLine: 'none' }}
                        >
                          ssnbmbk_info@ssnbagent.netbk.co.jp
                        </Typography>
                        へメール送付してください。
                      </Typography>
                    }
                  />
                  <Stack
                    spacing={'6px'}
                    sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                  >
                    <Typography variant="label" color={'text.main'}>
                      会社の決算報告書（1期前）
                    </Typography>
                    <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__D__01" />
                  </Stack>
                  <Stack
                    spacing={'6px'}
                    sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                  >
                    <Typography variant="label" color={'text.main'}>
                      会社の決算報告書（2期前）
                    </Typography>
                    <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__D__02" />
                  </Stack>
                  <Stack
                    spacing={'6px'}
                    sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                  >
                    <Typography variant="label" color={'text.main'}>
                      会社の決算報告書（3期前）
                    </Typography>
                    <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__D__03" />
                  </Stack>
                </Stack>
              </ApItemGroup>
            )}

            {!['1', '5', '10'].includes(p_applicant_persons__1.office_occupation) && (
              <ApItemGroup label={`親族経営の会社等にご勤務の方は\n下記の書類も添付してください。`}>
                <Stack spacing={3}>
                  <ApStarHelp
                    label={
                      <Typography variant="note" color={'text.main'}>
                        {`枚数が多い場合はPDFファイルを\n`}
                        <Typography
                          component={Link}
                          variant="note"
                          color={'text.main'}
                          href={`mailto:ssnbmbk_info@ssnbagent.netbk.co.jp`}
                          sx={{ textDecorationLine: 'none' }}
                        >
                          ssnbmbk_info@ssnbagent.netbk.co.jp
                        </Typography>
                        へメール送付してください。
                      </Typography>
                    }
                  />
                  <Stack
                    spacing={'6px'}
                    sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                  >
                    <Typography variant="label" color={'text.main'}>
                      {`会社の決算報告書\nまたは経営する親族の確定申告書（1期前）`}
                    </Typography>
                    <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__F__01" />
                  </Stack>
                  <Stack
                    spacing={'6px'}
                    sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                  >
                    <Typography variant="label" color={'text.main'}>
                      {`会社の決算報告書\nまたは経営する親族の確定申告書（2期前）`}
                    </Typography>
                    <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__F__02" />
                  </Stack>
                  <Stack
                    spacing={'6px'}
                    sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                  >
                    <Typography variant="label" color={'text.main'}>
                      {`会社の決算報告書\nまたは経営する親族の確定申告書（3期前）`}
                    </Typography>
                    <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__F__03" />
                  </Stack>
                </Stack>
              </ApItemGroup>
            )}
          </Stack>
        )}

        <ApItemGroup optional label={'その他の書類'}>
          <Stack spacing={3}>
            {plan === 'B' && !['1', '5', '10'].includes(p_applicant_persons__1.office_occupation) && (
              <ApStarHelp label={'契約社員・派遣社員・嘱託の方は雇用契約書を添付してください。'} />
            )}
            <Stack sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}>
              <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__K" />
            </Stack>
          </Stack>
        </ApItemGroup>
        <ApSaveDraftButton pageInfo={parseVaildData} />
        <ApStepFooter left={handelLeft} right={formik.handleSubmit} rightLabel={agentSended && '保存'} />
      </ApLayout>
    </FormikProvider>
  );
};
