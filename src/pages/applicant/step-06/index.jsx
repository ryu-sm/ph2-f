import { ApLayout, ApStepFooter } from '@/containers';
import { Fragment, useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { agentSendedSelector, applicationAtom, applyNoSelector } from '@/store';
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
  ApUpdateApply,
  ApZipCodeInputField,
} from '@/components';
import { Stack, Typography } from '@mui/material';
import { genderOptions, yearOptions } from './options';
import { PREFECTURES } from '@/constant';
import { useNavigate } from 'react-router-dom';
import { Icons } from '@/assets';
import { cloneDeep } from 'lodash';
import { useApUpdateApplyInfo, useBoolean } from '@/hooks';
import { routeNames } from '@/router/settings';

export const ApStep06Page = () => {
  const navigate = useNavigate();
  const setApplicationInfo = useSetRecoilState(applicationAtom);
  const applyNo = useRecoilValue(applyNoSelector);
  const agentSended = useRecoilValue(agentSendedSelector);
  const updateModal = useBoolean(false);
  const {
    apNextStepId,
    apPreStepId,
    hasJoinGuarantor,
    changeToIncomeTotalizer,
    changeJoinGuarantor,
    p_join_guarantors,
    p_application_headers,
  } = useRecoilValue(applicationAtom);
  const updateApply = useApUpdateApplyInfo();
  const formik = useFormik({
    initialValues: { hasJoinGuarantor, p_join_guarantors },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (changeToIncomeTotalizer) {
        setApplicationInfo((pre) => {
          return { ...pre, ...values };
        });
        navigate(routeNames.apStep11Page.path);
      } else if (changeJoinGuarantor) {
        await updateApply(applyNo, { ...values, p_application_headers: p_application_headers });
        updateModal.onTrue();
      } else if (agentSended) {
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
  const parseVaildData = useMemo(() => {
    const dataCopy = cloneDeep(formik.values);
    return dataCopy;
  }, [formik.values]);

  const handelLeft = () => {
    if (changeToIncomeTotalizer) {
      navigate(routeNames.apStep05Page.path);
    } else if (changeJoinGuarantor) {
      navigate(routeNames.apStep01Page.path);
    } else if (agentSended) {
      navigate(routeNames.apTopPage.path);
    } else {
      navigate(`/step-id-${apPreStepId}`);
    }
  };

  return (
    <FormikProvider value={formik}>
      <ApErrorScroll />
      <ApLayout hasMenu hasStepBar pb={18}>
        <ApUpdateApply isOpen={updateModal.value} onClose={updateModal.onFalse} />
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
                        id: '',
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
        <ApStepFooter
          left={handelLeft}
          right={formik.handleSubmit}
          rightLabel={changeToIncomeTotalizer ? false : agentSended && '保存'}
        />
      </ApLayout>
    </FormikProvider>
  );
};
