import { ApLayout, ApStepFooter } from '@/containers';
import { useEffect, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authAtom, localApplication } from '@/store';
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
import { API_500_ERROR, PREFECTURES } from '@/constant';

import { useNavigate } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import { useApplicationContext, useBoolean, useIsSalesPerson } from '@/hooks';
import { routeNames } from '@/router/settings';
import { diffObj } from '@/utils';
import { toast } from 'react-toastify';
import { apGetPapplicantPersonsFiles } from '@/services';

export const ApStep02Page = () => {
  const { updateSendedInfo } = useApplicationContext();
  const navigate = useNavigate();
  const isSalesPerson = useIsSalesPerson();
  const updateModal = useBoolean(false);

  const {
    agentSended,
    user: { email, id },
  } = useRecoilValue(authAtom);

  const [localApplicationInfo, setLocalApplicationInfo] = useRecoilState(localApplication);
  const { apNextStepId, apPreStepId, p_applicant_persons__0 } = localApplicationInfo;

  const setLocalData = (values) => {
    setLocalApplicationInfo((pre) => {
      return {
        ...pre,
        p_applicant_persons__0: {
          ...pre.p_applicant_persons__0,
          last_name_kanji: values.p_applicant_persons__0.last_name_kanji,
          first_name_kanji: values.p_applicant_persons__0.first_name_kanji,
          last_name_kana: values.p_applicant_persons__0.last_name_kana,
          first_name_kana: values.p_applicant_persons__0.first_name_kana,
          gender: values.p_applicant_persons__0.gender,
          birthday: values.p_applicant_persons__0.birthday,
          nationality: values.p_applicant_persons__0.nationality,
          mobile_phone: values.p_applicant_persons__0.mobile_phone,
          home_phone: values.p_applicant_persons__0.home_phone,
          postal_code: values.p_applicant_persons__0.postal_code,
          prefecture_kanji: values.p_applicant_persons__0.prefecture_kanji,
          city_kanji: values.p_applicant_persons__0.city_kanji,
          district_kanji: values.p_applicant_persons__0.district_kanji,
          other_address_kanji: values.p_applicant_persons__0.other_address_kanji,
          prefecture_kana: values.p_applicant_persons__0.prefecture_kana,
          city_kana: values.p_applicant_persons__0.city_kana,
          district_kana: values.p_applicant_persons__0.district_kana,
          email: values.p_applicant_persons__0.email,
          H__a: values.p_applicant_persons__0.H__a,
          H__b: values.p_applicant_persons__0.H__b,
        },
      };
    });
  };
  const initialValues = {
    p_applicant_persons__0: {
      last_name_kanji: p_applicant_persons__0.last_name_kanji,
      first_name_kanji: p_applicant_persons__0.first_name_kanji,
      last_name_kana: p_applicant_persons__0.last_name_kana,
      first_name_kana: p_applicant_persons__0.first_name_kana,
      gender: p_applicant_persons__0.gender,
      birthday: p_applicant_persons__0.birthday,
      nationality: p_applicant_persons__0.nationality,
      mobile_phone: p_applicant_persons__0.mobile_phone,
      home_phone: p_applicant_persons__0.home_phone,
      postal_code: p_applicant_persons__0.postal_code,
      prefecture_kanji: p_applicant_persons__0.prefecture_kanji,
      city_kanji: p_applicant_persons__0.city_kanji,
      district_kanji: p_applicant_persons__0.district_kanji,
      other_address_kanji: p_applicant_persons__0.other_address_kanji,
      prefecture_kana: p_applicant_persons__0.prefecture_kana,
      city_kana: p_applicant_persons__0.city_kana,
      district_kana: p_applicant_persons__0.district_kana,
      email: isSalesPerson ? p_applicant_persons__0.email : p_applicant_persons__0.email || email,
      H__a: p_applicant_persons__0.H__a,
      H__b: p_applicant_persons__0.H__b,
    },
  };

  const setUpdateData = (values) => {
    const diffData = {
      p_applicant_persons__0: {
        ...diffObj(initialValues.p_applicant_persons__0, values.p_applicant_persons__0),
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
          await updateSendedInfo(setUpdateData(values));
          updateModal.onTrue();
        } else {
          setLocalData(values);
          navigate(`${isSalesPerson ? '/sales-person' : ''}/step-id-${apNextStepId}`);
        }
      } catch (error) {
        toast.error(API_500_ERROR);
      }
    },
  });

  const parseVaildData = useMemo(() => {
    const dataCopy = cloneDeep(formik.values);
    return dataCopy;
  }, [formik.values]);

  const handelLeft = () => {
    if (agentSended) {
      navigate(routeNames.apTopPage.path);
    } else {
      setLocalData(formik.values);
      navigate(`${isSalesPerson ? '/sales-person' : ''}/step-id-${apPreStepId}`);
    }
  };

  const fetchPapplicantPersonsFiles = async () => {
    try {
      const res = await apGetPapplicantPersonsFiles(id, 0);
      formik.setFieldValue('p_applicant_persons__0.H__a', res.data?.H__a);
      formik.setFieldValue('p_applicant_persons__0.H__b', res.data?.H__b);
      console.log(res.data);
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };

  useEffect(() => {
    if (agentSended) {
      fetchPapplicantPersonsFiles();
    }
  }, []);

  const { refreshsendedApllication } = useApplicationContext();

  useEffect(() => {
    if (agentSended) {
      refreshsendedApllication();
    }
  }, []);
  useEffect(() => {
    if (agentSended) {
      formik.setValues(initialValues);
    }
  }, [localApplicationInfo]);

  return (
    <FormikProvider value={formik}>
      <ApErrorScroll />
      <ApLayout
        hasMenu
        hasStepBar
        bottomContent={
          <>
            <ApSaveDraftButton pageInfo={parseVaildData} />
            <ApStepFooter
              left={handelLeft}
              right={formik.handleSubmit}
              rightLabel={agentSended && '保存'}
              rightDisable={formik.isSubmitting}
            />
          </>
        }
      >
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
          </Stack>
        </ApItemGroup>
        <ApItemGroup label={'現在の国籍'}>
          <Stack spacing={3}>
            <ApRadioRowGroup
              name="p_applicant_persons__0.nationality"
              options={nationalityOptions}
              onChange={(e) => {
                if (e.target.value === '1') {
                  formik.setFieldValue('p_applicant_persons__0.H__a', []);
                  formik.setFieldValue('p_applicant_persons__0.H__b', []);
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
                      {((formik.touched.p_applicant_persons__0?.H__a && formik.errors.p_applicant_persons__0?.H__a) ||
                        (formik.touched.p_applicant_persons__0?.H__b &&
                          formik.errors.p_applicant_persons__0?.H__b)) && (
                        <Typography variant="waring" color={'secondary.main'}>
                          {'※外国籍の場合、在留カードまたは特別永住者証明書を添付することは必須です'}
                        </Typography>
                      )}
                      <Stack spacing={3} direction={'row'} alignItems={'start'}>
                        <Stack spacing={'6px'}>
                          <Typography variant="label" color={'text.main'}>
                            〈表面〉
                          </Typography>
                          <ApImgUpload name="p_applicant_persons__0.H__a" singleFile />
                        </Stack>
                        <Stack spacing={'6px'}>
                          <Typography variant="label" color={'text.main'}>
                            〈裏面〉
                          </Typography>
                          <ApImgUpload name="p_applicant_persons__0.H__b" singleFile />
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
              setPrefectureKanji={(value, touched) => {
                formik.setFieldValue('p_applicant_persons__0.prefecture_kanji', value);
                formik.setFieldTouched('p_applicant_persons__0.prefecture_kanji', touched);
              }}
              setCityKanji={(value, touched) => {
                formik.setFieldValue('p_applicant_persons__0.city_kanji', value);
                formik.setFieldTouched('p_applicant_persons__0.city_kanji', touched);
              }}
              setDistrictKanji={(value, touched) => {
                formik.setFieldValue('p_applicant_persons__0.district_kanji', value);
                formik.setFieldTouched('p_applicant_persons__0.district_kanji', touched);
              }}
              setOtherAddressKanji={(value, touched) => {
                formik.setFieldValue('p_applicant_persons__0.other_address_kanji', value);
                formik.setFieldTouched('p_applicant_persons__0.other_address_kanji', touched);
              }}
              setPrefectureKana={(value, touched) => {
                formik.setFieldValue('p_applicant_persons__0.prefecture_kana', value);
                formik.setFieldTouched('p_applicant_persons__0.prefecture_kana', touched);
              }}
              setCityKana={(value, touched) => {
                formik.setFieldValue('p_applicant_persons__0.city_kana', value);
                formik.setFieldTouched('p_applicant_persons__0.city_kana', touched);
              }}
              setDistrictKana={(value, touched) => {
                formik.setFieldValue('p_applicant_persons__0.district_kana', value);
                formik.setFieldTouched('p_applicant_persons__0.district_kana', touched);
              }}
            />
            <ApSelectField
              name="p_applicant_persons__0.prefecture_kanji"
              options={PREFECTURES}
              placeholder={'----'}
              width={110}
              label={'都道府県'}
              handleChangeInit={() => {
                formik.setFieldValue('p_applicant_persons__0.prefecture_kana', '');
                formik.setFieldTouched('p_applicant_persons__0.prefecture_kana', true);
              }}
            />
            <ApTextInputField
              name="p_applicant_persons__0.city_kanji"
              placeholder={'例：港区'}
              label={'市区郡　（例：港区）'}
              convertFullWidth
              handleChangeInit={() => {
                formik.setFieldValue('p_applicant_persons__0.city_kana', '');
                formik.setFieldTouched('p_applicant_persons__0.city_kana', true);
              }}
            />
            <ApTextInputField
              name="p_applicant_persons__0.district_kanji"
              placeholder={'例：芝浦４丁目'}
              label={'町村丁目（例：芝浦４丁目）'}
              convertFullWidth
              handleChangeInit={() => {
                formik.setFieldValue('p_applicant_persons__0.district_kana', '');
                formik.setFieldTouched('p_applicant_persons__0.district_kana', true);
              }}
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
      </ApLayout>
    </FormikProvider>
  );
};
