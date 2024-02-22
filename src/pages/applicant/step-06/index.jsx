import { ApLayout, ApStepFooter } from '@/containers';
import { Fragment, useEffect, useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { apNextStepIdSelector, apPreStepIdSelector, applicationAtom, isMcjSelector, userEmailSelector } from '@/store';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import { validationSchema } from './validationSchema';
import {
  ApErrorScroll,
  ApItemGroup,
  ApJoinGuarantorModal,
  ApPageTitle,
  ApPhoneInputField,
  ApPrimaryButton,
  ApRadioRowGroup,
  ApSaveDraftButton,
  ApSelectField,
  ApSelectFieldYmd,
  ApStarHelp,
  ApTextInputField,
  ApZipCodeInputField,
} from '@/components';
import { Stack, Typography } from '@mui/material';
import { genderOptions, yearOptions } from './options';
import { PREFECTURES } from '@/constant';
import { useNavigate } from 'react-router-dom';
import { Icons } from '@/assets';

export const ApStep06Page = () => {
  const navigate = useNavigate();
  const apNextStepId = useRecoilValue(apNextStepIdSelector);
  const apPreStepId = useRecoilValue(apPreStepIdSelector);
  const setApplicationInfo = useSetRecoilState(applicationAtom);
  const isMCJ = useRecoilValue(isMcjSelector);
  const { p_join_guarantors, p_application_headers__loan_type } = useRecoilValue(applicationAtom);

  const formik = useFormik({
    initialValues: { p_join_guarantors },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setApplicationInfo((pre) => {
        return { ...pre, ...values };
      });
      navigate(`/step-id-${apNextStepId}`);
    },
  });
  const parseVaildData = useMemo(() => {
    return {
      p_join_guarantors: formik.values.p_join_guarantors,
    };
  }, [formik.values]);
  const handelLeft = () => {
    navigate(`/step-id-${apPreStepId}`);
  };

  return (
    <FormikProvider value={formik}>
      <ApErrorScroll />
      <ApLayout hasMenu hasStepBar pb={18}>
        <ApPageTitle py={8}>{`担保提供者について\n教えてください。`}</ApPageTitle>
        <Stack alignItems={'center'} sx={{ pb: 6 }}>
          <ApJoinGuarantorModal />
        </Stack>
        <Stack px={4} pb={8}>
          <ApStarHelp label={'ペアローンの場合、どちらかの申込者の方に記入いただければ結構です。'} />
        </Stack>
        <FieldArray
          name="p_join_guarantors"
          render={(arrayHelpers) => (
            <Fragment>
              <Stack spacing={8} sx={{ px: 4 }}>
                {formik.values.p_join_guarantors.map((item, index) => (
                  <Stack
                    key={index}
                    sx={{
                      borderRadius: 2,
                      border: (theme) => `1px solid ${theme.palette.primary.main}`,
                      bgcolor: 'primary.main',
                      boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    {index > 0 && (
                      <Stack
                        direction={'row'}
                        justifyItems={'center'}
                        justifyContent={'space-between'}
                        sx={{ px: 4, py: 1, cursor: 'pointer' }}
                        onClick={() => {
                          arrayHelpers.remove(index);
                        }}
                      >
                        <Typography variant="form_item_label" color="white">
                          {`${index + 1}人目`}
                        </Typography>
                        <Stack spacing={'6px'} direction={'row'} alignItems={'center'}>
                          <Icons.ApDeleteIcon />
                          <Typography variant="label" color={'white'}>
                            削除する
                          </Typography>
                        </Stack>
                      </Stack>
                    )}
                    <Stack
                      sx={{
                        bgcolor: 'white',
                        borderRadius: '7px',
                      }}
                    >
                      <ApItemGroup
                        label={'担保提供者の氏名'}
                        pb={3}
                        px={2}
                        borderTopRightRadius={index > 0 ? 0 : '7px'}
                        borderTopLeftRadius={index > 0 ? 0 : '7px'}
                      >
                        <Stack spacing={3}>
                          <ApTextInputField
                            name={`p_join_guarantors[${index}].last_name_kanji`}
                            placeholder={'姓'}
                            convertFullWidth
                          />
                          <ApTextInputField
                            name={`p_join_guarantors[${index}].first_name_kanji`}
                            placeholder={'名'}
                            convertFullWidth
                          />
                        </Stack>
                      </ApItemGroup>
                      <ApItemGroup label={'担保提供者の氏名（フリガナ）'} pb={3} px={2}>
                        <Stack spacing={3}>
                          <ApTextInputField
                            name={`p_join_guarantors[${index}].last_name_kana`}
                            placeholder={'セイ'}
                            convertFullWidth
                          />
                          <ApTextInputField
                            name={`p_join_guarantors[${index}].first_name_kana`}
                            placeholder={'メイ'}
                            convertFullWidth
                          />
                        </Stack>
                      </ApItemGroup>
                      <ApItemGroup label={'性別'} pb={3} px={2}>
                        <ApRadioRowGroup name={`p_join_guarantors[${index}].gender`} options={genderOptions} />
                      </ApItemGroup>
                      <ApItemGroup label={'続柄'} pb={3} px={2}>
                        <ApTextInputField
                          name={`p_join_guarantors[${index}].rel_to_applicant_a_name`}
                          placeholder={'例：父'}
                          convertFullWidth
                        />
                      </ApItemGroup>
                      <ApItemGroup label={'生年月日'} pb={3} px={2}>
                        <ApSelectFieldYmd name={`p_join_guarantors[${index}].birthday`} yearOptions={yearOptions} />
                      </ApItemGroup>
                      <ApItemGroup label={'電話番号'} pb={3} px={2}>
                        <Stack spacing={3}>
                          <ApPhoneInputField
                            name={`p_join_guarantors[${index}].mobile_phone`}
                            label={'携帯'}
                            onFocus={() => formik.setFieldTouched(`p_join_guarantors[${index}].home_phone`, false)}
                          />
                          <ApPhoneInputField
                            name={`p_join_guarantors[${index}].home_phone`}
                            label={'自宅'}
                            onFocus={() => formik.setFieldTouched(`p_join_guarantors[${index}].mobile_phone`, false)}
                          />
                          <ApStarHelp label={'半角数字でご入力ください。'} />
                        </Stack>
                      </ApItemGroup>
                      <ApItemGroup label={'現住所'} pb={3} px={2}>
                        <Stack spacing={4}>
                          <ApZipCodeInputField
                            name={`p_join_guarantors[${index}].postal_code`}
                            callback={(addr) => {
                              formik.setFieldValue(
                                `p_join_guarantors[${index}].prefecture_kanji`,
                                addr.prefecture_kanji
                              );
                              formik.setFieldValue(`p_join_guarantors[${index}].city_kanji`, addr.city_kanji);
                              formik.setFieldValue(`p_join_guarantors[${index}].district_kanji`, addr.district_kanji);
                            }}
                            errorCallback={() => {
                              formik.setFieldValue(`p_join_guarantors[${index}].prefecture_kanji`, '');
                              formik.setFieldValue(`p_join_guarantors[${index}].city_kanji`, '');
                              formik.setFieldValue(`p_join_guarantors[${index}].district_kanji`, '');
                            }}
                          />
                          <ApSelectField
                            name={`p_join_guarantors[${index}].prefecture_kanji`}
                            options={PREFECTURES}
                            placeholder={'----'}
                            width={110}
                            label={'都道府県'}
                          />
                          <ApTextInputField
                            name={`p_join_guarantors[${index}].city_kanji`}
                            placeholder={'例：港区'}
                            label={'市区郡　（例：港区）'}
                            convertFullWidth
                          />
                          <ApTextInputField
                            name={`p_join_guarantors[${index}].district_kanji`}
                            placeholder={'例：芝浦４丁目'}
                            label={'町村丁目（例：芝浦４丁目）'}
                            convertFullWidth
                          />
                          <ApTextInputField
                            name={`p_join_guarantors[${index}].other_address_kanji`}
                            placeholder={'例：12-38　キャナルゲート芝浦605号室'}
                            label={'丁目以下・建物名・部屋番号（例：12-38　キャナルゲート芝浦605号室）'}
                            convertFullWidth
                          />
                        </Stack>
                      </ApItemGroup>
                    </Stack>
                  </Stack>
                ))}
              </Stack>

              {formik.values.p_join_guarantors.length < 3 && (
                <Stack spacing={2} alignItems={'center'} sx={{ py: 8 }}>
                  <ApStarHelp label={'担保提供者が複数いる場合は、追加してください。'} />
                  <ApPrimaryButton
                    height={40}
                    onClick={() => {
                      arrayHelpers.push({
                        id: null,
                        last_name_kanji: '',
                        first_name_kanji: '',
                        last_name_kana: '',
                        first_name_kana: '',
                        gender: '',
                        rel_to_applicant_a_name: '',
                        birthday: '',
                        mobile_phone: '',
                        home_phone: '',
                        postal_code: '',
                        prefecture_kanji: '',
                        city_kanji: '',
                        district_kanji: '',
                        other_address_kanji: '',
                      });
                    }}
                  >
                    <Stack spacing={2} direction={'row'} alignItems={'center'}>
                      <Icons.ApAddIcon />
                      <Typography variant="radio_checkbox_button">担保提供者を追加</Typography>
                    </Stack>
                  </ApPrimaryButton>
                </Stack>
              )}
            </Fragment>
          )}
        />
        <ApSaveDraftButton pageInfo={parseVaildData} />
        <ApStepFooter left={handelLeft} right={formik.handleSubmit} />
      </ApLayout>
    </FormikProvider>
  );
};
