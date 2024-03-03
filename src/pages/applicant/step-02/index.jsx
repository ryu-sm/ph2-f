import { ApLayout, ApStepFooter } from '@/containers';
import { useCallback, useEffect, useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  agentSendedSelector,
  apNextStepIdSelector,
  apPreStepIdSelector,
  applicationAtom,
  applyNoSelector,
  userEmailSelector,
} from '@/store';
import { FormikProvider, useFormik } from 'formik';
import { validationSchema } from './validationSchema';
import {
  ApEmailInputField,
  ApErrorScroll,
  ApImgUpload,
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
import { Stack, Typography } from '@mui/material';
import { genderOptions, nationalityOptions, yearOptions } from './options';
import { PREFECTURES } from '@/constant';

import { useNavigate } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import { useApUpdateApplyInfo, useBoolean } from '@/hooks';
import { apApplicationImg } from '@/services';
import { routeNames } from '@/router/settings';

export const ApStep02Page = () => {
  const navigate = useNavigate();
  const setApplicationInfo = useSetRecoilState(applicationAtom);
  const userEmail = useRecoilValue(userEmailSelector);
  const applyNo = useRecoilValue(applyNoSelector);
  const agentSended = useRecoilValue(agentSendedSelector);
  const updateModal = useBoolean(false);

  const { apNextStepId, apPreStepId, p_applicant_persons__0, p_uploaded_files } = useRecoilValue(applicationAtom);
  const updateApply = useApUpdateApplyInfo();
  const formik = useFormik({
    initialValues: {
      p_applicant_persons__0: {
        ...p_applicant_persons__0,
        email: p_applicant_persons__0.email || userEmail,
      },
      p_uploaded_files,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (agentSended) {
        await updateApply(applyNo, values);
        updateModal.onTrue();
      } else {
        setApplicationInfo((pre) => {
          return { ...pre, ...values };
        });
        navigate(`/step-id-${apNextStepId}`);
      }
    },
  });

  const sendedImg = useCallback(async () => {
    if (agentSended) {
      try {
        const res = await apApplicationImg(applyNo);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__0__H__a', res.data.p_applicant_persons__0__H__a);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__0__H__b', res.data.p_applicant_persons__0__H__b);
      } catch (error) {
        console.error(error);
      }
    }
  });

  useEffect(() => {
    sendedImg();
  }, [agentSended, applyNo]);

  const parseVaildData = useMemo(() => {
    const dataCopy = cloneDeep(formik.values);
    return dataCopy;
  }, [formik.values]);

  const handelLeft = () => {
    if (agentSended) {
      navigate(routeNames.apTopPage.path);
    } else {
      navigate(`/step-id-${apPreStepId}`);
    }
  };

  useEffect(() => {
    console.log(formik.errors);
  }, [formik.errors]);

  return (
    <FormikProvider value={formik}>
      <ApErrorScroll />
      <ApLayout hasMenu hasStepBar pb={18}>
        <ApUpdateApply isOpen={updateModal.value} onClose={updateModal.onFalse} />
        <ApPageTitle py={8}>{`あなたについて\n教えてください。`}</ApPageTitle>
        <ApItemGroup label={'お名前'}>
          <Stack spacing={3}>
            <ApTextInputField name="p_applicant_persons__0.last_name_kanji" placeholder={'姓'} convertFullWidth />
            <ApTextInputField name="p_applicant_persons__0.first_name_kanji" placeholder={'名'} convertFullWidth />
            <ApStarHelp label={'外国籍のかたは、在留カード通りに入力ください。'} />
            <ApStarHelp label={'お名前の漢字が外字等で変換できない場合は常用漢字でご入力ください。'} />
          </Stack>
        </ApItemGroup>
        <ApItemGroup label={'お名前（フリガナ）'}>
          <Stack spacing={3}>
            <ApTextInputField name="p_applicant_persons__0.last_name_kana" placeholder={'セイ'} convertFullWidth />
            <ApTextInputField name="p_applicant_persons__0.first_name_kana" placeholder={'メイ'} convertFullWidth />
          </Stack>
        </ApItemGroup>
        <ApItemGroup label={'性別'}>
          <ApRadioRowGroup name="p_applicant_persons__0.gender" options={genderOptions} />
        </ApItemGroup>
        <ApItemGroup label={'生年月日'}>
          <Stack spacing={3}>
            <ApSelectFieldYmd name="p_applicant_persons__0.birthday" yearOptions={yearOptions} />
            <ApStarHelp label={'借入時満18歳以上満65歳以下・完済時満80歳未満の方がご利用いただけます。'} />
          </Stack>
        </ApItemGroup>
        <ApItemGroup label={'現在の国籍'}>
          <Stack spacing={3}>
            <ApRadioRowGroup
              name="p_applicant_persons__0.nationality"
              options={nationalityOptions}
              onChange={(e) => {
                if (e.target.value === '1') {
                  formik.setFieldValue('p_uploaded_files.p_applicant_persons__0__H__a', []);
                  formik.setFieldValue('p_uploaded_files.p_applicant_persons__0__H__b', []);
                }
              }}
            />

            {formik.values.p_applicant_persons__0.nationality === '2' && (
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
                      {((formik.touched.p_uploaded_files?.p_applicant_persons__0__H__a &&
                        formik.errors.p_uploaded_files?.p_applicant_persons__0__H__a) ||
                        (formik.touched.p_uploaded_files?.p_applicant_persons__0__H__b &&
                          formik.errors.p_uploaded_files?.p_applicant_persons__0__H__b)) && (
                        <Typography variant="waring" color={'secondary.main'}>
                          {'※外国籍の場合、在留カードまたは特別永住者証明書を添付することは必須です'}
                        </Typography>
                      )}
                      <Stack spacing={3} direction={'row'} alignItems={'start'}>
                        <Stack spacing={'6px'}>
                          <Typography variant="label" color={'text.main'}>
                            〈表面〉
                          </Typography>
                          <ApImgUpload name="p_uploaded_files.p_applicant_persons__0__H__a" singleFile />
                        </Stack>
                        <Stack spacing={'6px'}>
                          <Typography variant="label" color={'text.main'}>
                            〈裏面〉
                          </Typography>
                          <ApImgUpload name="p_uploaded_files.p_applicant_persons__0__H__b" singleFile />
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
              name="p_applicant_persons__0.mobile_phone"
              label={'携帯'}
              onFocus={() => formik.setFieldTouched('p_applicant_persons__0.home_phone', false)}
            />
            <ApPhoneInputField
              name="p_applicant_persons__0.home_phone"
              label={'自宅'}
              onFocus={() => formik.setFieldTouched('p_applicant_persons__0.mobile_phone', false)}
            />
            <ApStarHelp label={'半角数字でご入力ください。'} />
          </Stack>
        </ApItemGroup>
        <ApItemGroup label={'現住所'} note={'※国内にお住まいの方がご利用できます。'}>
          <Stack spacing={4}>
            <ApZipCodeInputField
              name="p_applicant_persons__0.postal_code"
              callback={(addr) => {
                formik.setFieldValue('p_applicant_persons__0.prefecture_kanji', addr.prefecture_kanji);
                formik.setFieldValue('p_applicant_persons__0.city_kanji', addr.city_kanji);
                formik.setFieldValue('p_applicant_persons__0.district_kanji', addr.district_kanji);
              }}
              errorCallback={() => {
                formik.setFieldValue('p_applicant_persons__0.prefecture_kanji', '');
                formik.setFieldValue('p_applicant_persons__0.city_kanji', '');
                formik.setFieldValue('p_applicant_persons__0.district_kanji', '');
              }}
              onChange={(e) => {
                console.log(e);
              }}
            />
            <ApSelectField
              name="p_applicant_persons__0.prefecture_kanji"
              options={PREFECTURES}
              placeholder={'----'}
              width={110}
              label={'都道府県'}
            />
            <ApTextInputField
              name="p_applicant_persons__0.city_kanji"
              placeholder={'例：港区'}
              label={'市区郡　（例：港区）'}
              convertFullWidth
            />
            <ApTextInputField
              name="p_applicant_persons__0.district_kanji"
              placeholder={'例：芝浦４丁目'}
              label={'町村丁目（例：芝浦４丁目）'}
              convertFullWidth
            />
            <ApTextInputField
              name="p_applicant_persons__0.other_address_kanji"
              placeholder={'例：12-38　キャナルゲート芝浦605号室'}
              label={'丁目以下・建物名・部屋番号（例：12-38　キャナルゲート芝浦605号室）'}
              convertFullWidth
            />
          </Stack>
        </ApItemGroup>
        <ApItemGroup label={'ご連絡先用メールアドレス'}>
          <Stack spacing={3}>
            <ApEmailInputField name="p_applicant_persons__0.email" placeholder="例：sample@sample.co.jp" />
            <ApStarHelp
              label={`会員登録メールアドレスを表示しています。\n別途、ご連絡先用のメールアドレスを登録したい方は修正してください。`}
            />
          </Stack>
        </ApItemGroup>
        <ApSaveDraftButton pageInfo={parseVaildData} />
        <ApStepFooter left={handelLeft} right={formik.handleSubmit} rightLabel={agentSended && '保存'} />
      </ApLayout>
    </FormikProvider>
  );
};
