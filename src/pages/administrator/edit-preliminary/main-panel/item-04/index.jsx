import { EditRow } from '../../common/content-edit-row';
import { FieldArray, FormikProvider, useFormik } from 'formik';

import { Fragment, useEffect } from 'react';
import {
  AdEditFullWidthInput,
  AdEditOutLineInput,
  AdPhoneInputField,
  AdSelectRadios,
  AdZipCodeInput,
  DayPicker,
} from '@/components/administrator';
import { genderOptions, relToApplicantAOptions } from './options';

import dayjs from 'dayjs';
import { PREFECTURES } from '@/constant';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { ContentEditGroup } from '../../common/content-edit-group';
import { AdPrimaryButton } from '@/components/administrator/button';
import { Icons } from '@/assets';
import { Stack } from '@mui/material';
import { tab04Schema } from '../../fullSchema';
import { editMainTabStatusAtom, infoGroupTabAtom, joinGuarantorInitialValues } from '@/store';
import { useSetRecoilState } from 'recoil';
import { formatJapanDate } from '@/utils';

export const Item04 = () => {
  const setInfoGroupTab = useSetRecoilState(infoGroupTabAtom);
  const setMainTabStatus = useSetRecoilState(editMainTabStatusAtom);
  const {
    preliminaryInfo: { p_join_guarantors },
    preliminarySnap: {
      changeJoinGuarantor,
      changeToIncomeTotalizer,
      p_application_headers,
      p_application_banks,
      p_borrowing_details__1,
      p_borrowing_details__2,
    },
    setPreliminarySnap,
    handleSave,
    isEditable,
  } = usePreliminaryContext();
  const initialValues = {
    p_join_guarantors: p_join_guarantors,
  };

  const setUpdateData = (values) => {
    const diffData = {
      p_join_guarantors: values.p_join_guarantors,
      ...(changeJoinGuarantor && {
        p_application_headers: {
          created_at: p_application_headers?.created_at,
          apply_date: p_application_headers?.apply_date,
          move_scheduled_date: p_application_headers?.move_scheduled_date,
          loan_target: p_application_headers?.loan_target,
          land_advance_plan: p_application_headers?.land_advance_plan,
          loan_type: p_application_headers?.loan_type,
          pair_loan_last_name: p_application_headers?.pair_loan_last_name,
          pair_loan_first_name: p_application_headers?.pair_loan_first_name,
          pair_loan_rel_name: p_application_headers?.pair_loan_rel_name,
          pair_loan_rel: p_application_headers?.pair_loan_rel,
          join_guarantor_umu: p_application_headers?.join_guarantor_umu,
          loan_plus: p_application_headers?.loan_plus,
        },
        p_application_banks,
        p_borrowing_details__1: {
          desired_borrowing_date: p_borrowing_details__1?.desired_borrowing_date,
          desired_loan_amount: p_borrowing_details__1?.desired_loan_amount,
          bonus_repayment_amount: p_borrowing_details__1?.bonus_repayment_amount,
          bonus_repayment_month: p_borrowing_details__1?.bonus_repayment_month,
          loan_term_year: p_borrowing_details__1?.loan_term_year,
          repayment_method: p_borrowing_details__1?.repayment_method,
        },
        p_borrowing_details__2: {
          desired_borrowing_date: p_borrowing_details__2?.desired_borrowing_date,
          desired_loan_amount: p_borrowing_details__2?.desired_loan_amount,
          bonus_repayment_amount: p_borrowing_details__2?.bonus_repayment_amount,
        },
      }),
    };

    return diffData;
  };

  const formik = useFormik({
    initialValues,
    validationSchema: tab04Schema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (changeToIncomeTotalizer) {
        setMainTabStatus(2);
        setInfoGroupTab(2);
      } else {
        await handleSave(setUpdateData(values));
      }
    },
  });

  useEffect(() => {
    console.log('debug', formik.values.p_join_guarantors);
    setPreliminarySnap((pre) => {
      return {
        ...pre,
        p_join_guarantors: formik.values.p_join_guarantors,
      };
    });
  }, [formik.values]);

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  useEffect(() => {
    if (changeJoinGuarantor) {
      formik.setFieldValue('p_join_guarantors', [joinGuarantorInitialValues]);
    }
  }, [changeJoinGuarantor]);

  return (
    <FormikProvider value={formik}>
      <FieldArray
        name="p_join_guarantors"
        render={(arrayHelpers) => (
          <Fragment>
            {formik.values.p_join_guarantors.map((item, index) => (
              <ContentEditGroup
                key={index}
                isEditable={index === 0 ? isEditable : false}
                label={'担保提供者'}
                subLabel={`（${index + 1}人目）`}
                handleDeleteItem={() => arrayHelpers.remove(index)}
                handleSave={formik.handleSubmit}
              >
                <EditRow
                  label={'担保提供者の氏名（姓）'}
                  upConfig={{
                    key: `p_join_guarantors.last_name_kanji.${item?.id}`,
                  }}
                  isRequired
                  field={
                    isEditable ? (
                      <AdEditFullWidthInput name={`p_join_guarantors[${index}].last_name_kanji`} convertFullWidth />
                    ) : (
                      item.last_name_kanji
                    )
                  }
                />
                <EditRow
                  label={'担保提供者の氏名（名）'}
                  upConfig={{
                    key: `p_join_guarantors.first_name_kanji.${item?.id}`,
                  }}
                  isRequired
                  field={
                    isEditable ? (
                      <AdEditFullWidthInput name={`p_join_guarantors[${index}].first_name_kanji`} convertFullWidth />
                    ) : (
                      item.first_name_kanji
                    )
                  }
                />
                <EditRow
                  label={'担保提供者の氏名（姓）（フリガナ）'}
                  upConfig={{
                    key: `p_join_guarantors.last_name_kana.${item?.id}`,
                  }}
                  isRequired
                  field={
                    isEditable ? (
                      <AdEditFullWidthInput name={`p_join_guarantors[${index}].last_name_kana`} convertFullWidth />
                    ) : (
                      item.last_name_kana
                    )
                  }
                />
                <EditRow
                  label={'担保提供者の氏名（名）（フリガナ）'}
                  upConfig={{
                    key: `p_join_guarantors.first_name_kana.${item?.id}`,
                  }}
                  isRequired
                  field={
                    isEditable ? (
                      <AdEditFullWidthInput name={`p_join_guarantors[${index}].first_name_kana`} convertFullWidth />
                    ) : (
                      item.first_name_kana
                    )
                  }
                />
                <EditRow
                  label={'性別'}
                  upConfig={{
                    key: `p_join_guarantors.gender.${item?.id}`,
                    options: genderOptions,
                  }}
                  hasPleft={isEditable}
                  field={
                    isEditable ? (
                      <AdSelectRadios name={`p_join_guarantors[${index}].gender`} options={genderOptions} cancelable />
                    ) : (
                      genderOptions.find((item) => item.value === item.gender)?.label
                    )
                  }
                />
                <EditRow
                  label={'続柄'}
                  upConfig={{
                    key: `p_join_guarantors.rel_to_applicant_a_name.${item?.id}`,
                  }}
                  field={
                    isEditable ? (
                      <AdEditFullWidthInput
                        name={`p_join_guarantors[${index}].rel_to_applicant_a_name`}
                        convertFullWidth
                      />
                    ) : (
                      item.rel_to_applicant_a_name
                    )
                  }
                  subField={
                    isEditable ? (
                      <Stack spacing={2} direction={'row'} alignItems={'center'}>
                        <Stack sx={{ minWidth: 80 }}>
                          <AdSelectRadios
                            name={`p_join_guarantors[${index}].rel_to_applicant_a`}
                            options={relToApplicantAOptions}
                          />
                        </Stack>

                        {item.rel_to_applicant_a === '99' && (
                          <Stack>
                            {isEditable ? (
                              <AdEditOutLineInput
                                name={`p_join_guarantors[${index}].rel_to_applicant_a_other`}
                                width={180}
                                convertFullWidth
                              />
                            ) : (
                              item.rel_to_applicant_a_other
                            )}
                          </Stack>
                        )}
                      </Stack>
                    ) : (
                      relToApplicantAOptions.find((item) => item.value === item.rel_to_applicant_a)?.label
                    )
                  }
                />
                <EditRow
                  label={'生年月日'}
                  upConfig={{
                    key: `p_join_guarantors.birthday.${item?.id}`,
                    formatJaDate: true,
                  }}
                  isRequired
                  hasPleft={isEditable}
                  field={
                    isEditable ? (
                      <DayPicker
                        name={`p_join_guarantors[${index}].birthday`}
                        minDate={dayjs().subtract(65, 'y')}
                        maxDate={dayjs().subtract(18, 'y')}
                      />
                    ) : (
                      formatJapanDate(item.birthday, true)
                    )
                  }
                />
                <EditRow
                  label={'電話番号携帯'}
                  upConfig={{
                    key: `p_join_guarantors.mobile_phone.${item?.id}`,
                  }}
                  isLogicRequired
                  field={
                    isEditable ? (
                      <AdPhoneInputField name={`p_join_guarantors[${index}].mobile_phone`} convertHalfWidth />
                    ) : (
                      item.mobile_phone
                    )
                  }
                />
                <EditRow
                  label={'電話番号自宅'}
                  isLogicRequired
                  upConfig={{
                    key: `p_join_guarantors.home_phone.${item?.id}`,
                  }}
                  field={
                    isEditable ? (
                      <AdPhoneInputField name={`p_join_guarantors[${index}].home_phone`} convertHalfWidth />
                    ) : (
                      item.home_phone
                    )
                  }
                />
                <EditRow
                  label={'緊急連絡先'}
                  upConfig={{
                    key: `p_join_guarantors.emergency_contact.${item?.id}`,
                  }}
                  isAddendum
                  field={
                    isEditable ? (
                      <AdPhoneInputField name={`p_join_guarantors[${index}].emergency_contact`} convertHalfWidth />
                    ) : (
                      item.emergency_contact
                    )
                  }
                />
                <EditRow
                  label={'郵便番号'}
                  upConfig={{
                    key: `p_join_guarantors.postal_code.${item?.id}`,
                  }}
                  field={
                    isEditable ? (
                      <AdZipCodeInput
                        name={`p_join_guarantors[${index}].postal_code`}
                        setPrefectureKanji={(value, touched) => {
                          formik.setFieldValue(`p_join_guarantors[${index}].prefecture_kanji`, value);
                          formik.setFieldTouched('p_join_guarantors[${index}].prefecture_kanji', touched);
                        }}
                        setCityKanji={(value, touched) => {
                          formik.setFieldValue(`p_join_guarantors[${index}].city_kanji`, value);
                          formik.setFieldTouched(`p_join_guarantors[${index}].city_kanji`, touched);
                        }}
                        setDistrictKanji={(value, touched) => {
                          formik.setFieldValue(`p_join_guarantors[${index}].district_kanji`, value);
                          formik.setFieldTouched(`p_join_guarantors[${index}].district_kanji`, touched);
                        }}
                        setOtherAddressKanji={(value, touched) => {
                          formik.setFieldValue(`p_join_guarantors[${index}].other_address_kanji`, value);
                          formik.setFieldTouched(`p_join_guarantors[${index}].other_address_kanji`, touched);
                        }}
                        setPrefectureKana={(value, touched) => {
                          formik.setFieldValue(`p_join_guarantors[${index}].prefecture_kana`, value);
                          formik.setFieldTouched(`p_join_guarantors[${index}].prefecture_kana`, touched);
                        }}
                        setCityKana={(value, touched) => {
                          formik.setFieldValue(`p_join_guarantors[${index}].city_kana`, value);
                          formik.setFieldTouched(`p_join_guarantors[${index}].city_kana`, touched);
                        }}
                        setDistrictKana={(value, touched) => {
                          formik.setFieldValue(`p_join_guarantors[${index}].district_kana`, value);
                          formik.setFieldTouched(`p_join_guarantors[${index}].district_kana`, touched);
                        }}
                      />
                    ) : (
                      item.postal_code
                    )
                  }
                />
                <EditRow
                  label={'都道府県'}
                  upConfig={{
                    key: `p_join_guarantors.prefecture_kanji.${item?.id}`,
                  }}
                  isRequired
                  hasPleft={isEditable}
                  field={
                    isEditable ? (
                      <AdSelectRadios name={`p_join_guarantors[${index}].prefecture_kanji`} options={PREFECTURES} />
                    ) : (
                      PREFECTURES.find((item) => item.value === item.prefecture_kanji)?.label
                    )
                  }
                />
                <EditRow
                  label={'市区郡'}
                  upConfig={{
                    key: `p_join_guarantors.city_kanji.${item?.id}`,
                  }}
                  isRequired
                  field={
                    isEditable ? (
                      <AdEditFullWidthInput name={`p_join_guarantors[${index}].city_kanji`} convertFullWidth />
                    ) : (
                      item.city_kanji
                    )
                  }
                />
                <EditRow
                  label={'町村丁目'}
                  upConfig={{
                    key: `p_join_guarantors.district_kanji.${item?.id}`,
                  }}
                  isRequired
                  field={
                    isEditable ? (
                      <AdEditFullWidthInput name={`p_join_guarantors[${index}].district_kanji`} convertFullWidth />
                    ) : (
                      item.district_kanji
                    )
                  }
                />
                <EditRow
                  label={'丁目以下・建物名・部屋番号'}
                  upConfig={{
                    key: `p_join_guarantors.other_address_kanji.${item?.id}`,
                  }}
                  isRequired
                  field={
                    isEditable ? (
                      <AdEditFullWidthInput name={`p_join_guarantors[${index}].other_address_kanji`} convertFullWidth />
                    ) : (
                      item.other_address_kanji
                    )
                  }
                />
                <EditRow
                  label={'都道府県（フリガナ）'}
                  upConfig={{
                    key: `p_join_guarantors.prefecture_kana.${item?.id}`,
                  }}
                  isAddendum
                  field={
                    isEditable ? (
                      <AdEditFullWidthInput name={`p_join_guarantors[${index}].prefecture_kana`} convertFullWidth />
                    ) : (
                      item.prefecture_kana
                    )
                  }
                />
                <EditRow
                  label={'市区郡（フリガナ）'}
                  upConfig={{
                    key: `p_join_guarantors.city_kana.${item?.id}`,
                  }}
                  isAddendum
                  field={
                    isEditable ? (
                      <AdEditFullWidthInput name={`p_join_guarantors[${index}].city_kana`} convertFullWidth />
                    ) : (
                      item.city_kana
                    )
                  }
                />
                <EditRow
                  label={'町村丁目（フリガナ）'}
                  upConfig={{
                    key: `p_join_guarantors.district_kana.${item?.id}`,
                  }}
                  isAddendum
                  field={
                    isEditable ? (
                      <AdEditFullWidthInput name={`p_join_guarantors[${index}].district_kana`} convertFullWidth />
                    ) : (
                      item.district_kana
                    )
                  }
                />
                <EditRow
                  label={'丁目以下・建物名・部屋番号（フリガナ）'}
                  upConfig={{
                    key: `p_join_guarantors.other_address_kana.${item?.id}`,
                  }}
                  isAddendum
                  field={
                    isEditable ? (
                      <AdEditFullWidthInput name={`p_join_guarantors[${index}].other_address_kana`} convertFullWidth />
                    ) : (
                      item.other_address_kana
                    )
                  }
                />
                <EditRow
                  label={'メールアドレス'}
                  upConfig={{
                    key: `p_join_guarantors.email.${item?.id}`,
                  }}
                  isAddendum
                  field={
                    isEditable ? (
                      <AdEditFullWidthInput name={`p_join_guarantors[${index}].email`} convertHalfWidth />
                    ) : (
                      item.email
                    )
                  }
                />
              </ContentEditGroup>
            ))}

            {formik.values.p_join_guarantors.length < 3 && (
              <Stack sx={{ py: 4 }}>
                <AdPrimaryButton
                  width={120}
                  startIcon={<Icons.AdNewApply sx={{ width: 14, height: 16 }} />}
                  onClick={() => {
                    arrayHelpers.push({
                      id: '',
                      last_name_kanji: '',
                      first_name_kanji: '',
                      last_name_kana: '',
                      first_name_kana: '',
                      gender: '',
                      rel_to_applicant_a_name: '',
                      rel_to_applicant_a: '',
                      rel_to_applicant_a_other: '',
                      birthday: '',
                      mobile_phone: '',
                      home_phone: '',
                      emergency_contact: '',
                      email: '',
                      postal_code: '',
                      prefecture_kanji: '',
                      city_kanji: '',
                      district_kanji: '',
                      other_address_kanji: '',
                      prefecture_kana: '',
                      city_kana: '',
                      district_kana: '',
                      other_address_kana: '',
                    });
                  }}
                >
                  新規作成
                </AdPrimaryButton>
              </Stack>
            )}
          </Fragment>
        )}
      />
    </FormikProvider>
  );
};
