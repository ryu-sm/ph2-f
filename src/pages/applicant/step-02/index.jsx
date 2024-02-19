import { ApLayout, ApStepFooter } from '@/containers';
import { useCallback, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { apNextStepIdSelector, apPreStepIdSelector, applicationAtom, userEmailSelector } from '@/store';
import { FormikProvider, useFormik } from 'formik';
import { validationSchema } from './validationSchema';
import {
  ApEmailInputField,
  ApErrorScroll,
  ApItemGroup,
  ApPageTitle,
  ApPhoneInputField,
  ApPrimaryButton,
  ApRadioRowGroup,
  ApSelectField,
  ApSelectFieldYmd,
  ApStarHelp,
  ApTextInputField,
  ApZipCodeInputField,
} from '@/components';
import { Stack, Typography } from '@mui/material';
import { ganderOptions, nationalityOptions, yearOptions } from './options';
import { PREFECTURES } from '@/constant';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const ApStep02Page = () => {
  const navigate = useNavigate();
  const apNextStepId = useRecoilValue(apNextStepIdSelector);
  const apPreStepId = useRecoilValue(apPreStepIdSelector);
  const setApplicationInfo = useSetRecoilState(applicationAtom);
  const userEmail = useRecoilValue(userEmailSelector);
  const {
    p_applicant_persons__0__last_name_kanji,
    p_applicant_persons__0__first_name_kanji,
    p_applicant_persons__0__last_name_kana,
    p_applicant_persons__0__first_name_kana,
    p_applicant_persons__0__gender,
    p_applicant_persons__0__birthday,
    p_applicant_persons__0__nationality,
    p_applicant_persons__0__mobile_phone,
    p_applicant_persons__0__home_phone,
    p_applicant_persons__0__postal_code,
    p_applicant_persons__0__prefecture_kanji,
    p_applicant_persons__0__city_kanji,
    p_applicant_persons__0__district_kanji,
    p_applicant_persons__0__other_address_kanji,
    p_applicant_persons__0__email,
  } = useRecoilValue(applicationAtom);

  const formik = useFormik({
    initialValues: {
      p_applicant_persons__0__last_name_kanji,
      p_applicant_persons__0__first_name_kanji,
      p_applicant_persons__0__last_name_kana,
      p_applicant_persons__0__first_name_kana,
      p_applicant_persons__0__gender,
      p_applicant_persons__0__birthday,
      p_applicant_persons__0__nationality,
      p_applicant_persons__0__mobile_phone,
      p_applicant_persons__0__home_phone,
      p_applicant_persons__0__postal_code,
      p_applicant_persons__0__prefecture_kanji,
      p_applicant_persons__0__city_kanji,
      p_applicant_persons__0__district_kanji,
      p_applicant_persons__0__other_address_kanji,
      p_applicant_persons__0__email: p_applicant_persons__0__email || userEmail,
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

  return (
    <FormikProvider value={formik}>
      <ApErrorScroll />
      <ApLayout hasMenu hasStepBar pb={38}>
        <ApPageTitle py={8}>{`あなたについて\n教えてください。`}</ApPageTitle>
        <ApItemGroup label={'お名前'}>
          <Stack spacing={3}>
            <ApTextInputField name="p_applicant_persons__0__last_name_kanji" placeholder={'姓'} convertFullWidth />
            <ApTextInputField name="p_applicant_persons__0__first_name_kanji" placeholder={'名'} convertFullWidth />
            <ApStarHelp label={'外国籍のかたは、在留カード通りに入力ください。'} />
            <ApStarHelp label={'お名前の漢字が外字等で変換できない場合は常用漢字でご入力ください。'} />
          </Stack>
        </ApItemGroup>
        <ApItemGroup label={'お名前（フリガナ）'}>
          <Stack spacing={3}>
            <ApTextInputField name="p_applicant_persons__0__last_name_kana" placeholder={'セイ'} convertFullWidth />
            <ApTextInputField name="p_applicant_persons__0__first_name_kana" placeholder={'メイ'} convertFullWidth />
          </Stack>
        </ApItemGroup>
        <ApItemGroup label={'性別'}>
          <ApRadioRowGroup name="p_applicant_persons__0__gender" options={ganderOptions} />
        </ApItemGroup>
        <ApItemGroup label={'生年月日'}>
          <Stack spacing={3}>
            <ApSelectFieldYmd name="p_applicant_persons__0__birthday" yearOptions={yearOptions} />
            <ApStarHelp label={'借入時満18歳以上満65歳以下・完済時満80歳未満の方がご利用いただけます。'} />
          </Stack>
        </ApItemGroup>
        <ApItemGroup label={'現在の国籍'}>
          <Stack spacing={3}>
            <ApRadioRowGroup name="p_applicant_persons__0__nationality" options={nationalityOptions} />
            {/* TODO: IMG */}
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
                  label={<Typography variant="notify">在留カードまたは特別永住者証明書を添付してください。</Typography>}
                  pb={3}
                  px={2}
                  borderTopRightRadius={'7px'}
                  borderTopLeftRadius={'7px'}
                ></ApItemGroup>
              </Stack>
            </Stack>
          </Stack>
        </ApItemGroup>
        <ApItemGroup label={'電話番号'}>
          <Stack spacing={3}>
            <ApPhoneInputField
              name="p_applicant_persons__0__mobile_phone"
              label={'携帯'}
              onFocus={() => formik.setFieldTouched('p_applicant_persons__0__home_phone', false)}
            />
            <ApPhoneInputField
              name="p_applicant_persons__0__home_phone"
              label={'自宅'}
              onFocus={() => formik.setFieldTouched('p_applicant_persons__0__mobile_phone', false)}
            />
            <ApStarHelp label={'半角数字でご入力ください。'} />
          </Stack>
        </ApItemGroup>
        <ApItemGroup label={'現住所'} note={'※国内にお住まいの方がご利用できます。'}>
          <Stack spacing={4}>
            <ApZipCodeInputField
              name="p_applicant_persons__0__postal_code"
              callback={(addr) => {
                formik.setFieldValue('p_applicant_persons__0__prefecture_kanji', addr.prefecture_kanji);
                formik.setFieldValue('p_applicant_persons__0__city_kanji', addr.city_kanji);
                formik.setFieldValue('p_applicant_persons__0__district_kanji', addr.district_kanji);
              }}
              errorCallback={() => {
                formik.setFieldValue('p_applicant_persons__0__prefecture_kanji', '');
                formik.setFieldValue('p_applicant_persons__0__city_kanji', '');
                formik.setFieldValue('p_applicant_persons__0__district_kanji', '');
              }}
            />
            <ApSelectField
              name="p_applicant_persons__0__prefecture_kanji"
              options={PREFECTURES}
              placeholder={'----'}
              width={110}
              label={'都道府県'}
            />
            <ApTextInputField
              name="p_applicant_persons__0__city_kanji"
              placeholder={'例：港区'}
              label={'市区郡　（例：港区）'}
              convertFullWidth
            />
            <ApTextInputField
              name="p_applicant_persons__0__district_kanji"
              placeholder={'例：芝浦４丁目'}
              label={'町村丁目（例：芝浦４丁目）'}
              convertFullWidth
            />
            <ApTextInputField
              name="p_applicant_persons__0__other_address_kanji"
              placeholder={'例：12-38　キャナルゲート芝浦605号室'}
              label={'丁目以下・建物名・部屋番号（例：12-38　キャナルゲート芝浦605号室）'}
              convertFullWidth
            />
          </Stack>
        </ApItemGroup>
        <ApItemGroup label={'ご連絡先用メールアドレス'}>
          <Stack spacing={3}>
            <ApEmailInputField name="p_applicant_persons__0__email" placeholder="例：sample@sample.co.jp" />
            <ApStarHelp
              label={`会員登録メールアドレスを表示しています。\n別途、ご連絡先用のメールアドレスを登録したい方は修正してください。`}
            />
          </Stack>
        </ApItemGroup>
        <ApStepFooter left={handelLeft} right={formik.handleSubmit} />
      </ApLayout>
    </FormikProvider>
  );
};
