import { Button, Stack, Typography } from '@mui/material';
import { EditRow } from '../../common/content-edit-row';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import { validationSchema } from './validationSchema';

import { Fragment, useEffect, useMemo } from 'react';
import {
  AdEditInput,
  AdEditOutLineInput,
  AdNumericInput,
  AdSelectCheckbox,
  AdSelectRadios,
  DayPicker,
  MonthPicker,
} from '@/components/administrator';
import { genderOptions, nationalityOptions, relToApplicantAOptions, yearOptions } from './options';

import dayjs from 'dayjs';
import { useApUpdateApplyInfo } from '@/hooks';
import { diffObj } from '@/utils';
import { toast } from 'react-toastify';
import { API_500_ERROR, PREFECTURES } from '@/constant';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { ContentEditGroup } from '../../common/content-edit-group';
import { AdPrimaryButton } from '@/components/administrator/button';
import { Icons } from '@/assets';

export const Item04 = () => {
  const {
    preliminaryInfo: { p_application_headers, p_join_guarantors },
    preliminarySnap: { hasJoinGuarantor },
  } = usePreliminaryContext();
  const initialValues = {
    p_join_guarantors: p_join_guarantors,
    hasJoinGuarantor: hasJoinGuarantor,
  };
  const updateApply = useApUpdateApplyInfo();
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
      console.log(values);
      try {
        await updateApply(p_application_headers.apply_no, setUpdateData(values));
        toast.success('申込内容を更新しました。');
      } catch (error) {
        toast.error(API_500_ERROR);
      }
    },
  });
  const isEditable = useMemo(() => {
    return true;
  }, []);
  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);
  useEffect(() => {
    console.log(formik.errors);
  }, [formik.errors]);
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
              >
                <EditRow
                  label={'担保提供者の氏名（姓）'}
                  isRequired
                  field={
                    isEditable ? (
                      <AdEditInput name={`p_join_guarantors[${index}].last_name_kanji`} convertFullWidth />
                    ) : (
                      item.last_name_kanji
                    )
                  }
                  error={
                    formik.errors?.p_join_guarantors?.length > index &&
                    formik.errors?.p_join_guarantors[index]?.last_name_kanji
                  }
                />
                <EditRow
                  label={'担保提供者の氏名（名）'}
                  isRequired
                  field={
                    isEditable ? (
                      <AdEditInput name={`p_join_guarantors[${index}].first_name_kanji`} convertFullWidth />
                    ) : (
                      item.first_name_kanji
                    )
                  }
                  error={
                    formik.errors?.p_join_guarantors?.length > index &&
                    formik.errors?.p_join_guarantors[index]?.first_name_kanji
                  }
                />
                <EditRow
                  label={'担保提供者の氏名（姓）（フリガナ）'}
                  isRequired
                  field={
                    isEditable ? (
                      <AdEditInput name={`p_join_guarantors[${index}].last_name_kana`} convertFullWidth />
                    ) : (
                      item.last_name_kana
                    )
                  }
                  error={
                    formik.errors?.p_join_guarantors?.length > index &&
                    formik.errors?.p_join_guarantors[index]?.last_name_kana
                  }
                />
                <EditRow
                  label={'担保提供者の氏名（名）（フリガナ）'}
                  isRequired
                  field={
                    isEditable ? (
                      <AdEditInput name={`p_join_guarantors[${index}].first_name_kana`} convertFullWidth />
                    ) : (
                      item.first_name_kana
                    )
                  }
                  error={
                    formik.errors?.p_join_guarantors?.length > index &&
                    formik.errors?.p_join_guarantors[index]?.first_name_kana
                  }
                />
                <EditRow
                  label={'性別'}
                  hasPleft={isEditable}
                  field={
                    isEditable ? (
                      <AdSelectRadios name={`p_join_guarantors[${index}].gender`} options={genderOptions} />
                    ) : (
                      genderOptions.find((item) => item.value === item.gender)?.label
                    )
                  }
                  error={
                    formik.errors?.p_join_guarantors?.length > index && formik.errors?.p_join_guarantors[index]?.gender
                  }
                />
                <EditRow
                  label={'続柄'}
                  field={
                    isEditable ? (
                      <AdEditInput name={`p_join_guarantors[${index}].rel_to_applicant_a_name`} convertFullWidth />
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
                  error={
                    formik.errors?.p_join_guarantors?.length > index &&
                    formik.errors?.p_join_guarantors[index]?.rel_to_applicant_a_name
                  }
                />
                <EditRow
                  label={'生年月日'}
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
                  error={
                    formik.errors?.p_join_guarantors?.length > index &&
                    formik.errors?.p_join_guarantors[index]?.last_name_kanji
                  }
                />
                <EditRow
                  label={'電話番号携帯'}
                  field={
                    isEditable ? (
                      <AdEditInput name={`p_join_guarantors[${index}].mobile_phone`} convertHalfWidth />
                    ) : (
                      item.mobile_phone
                    )
                  }
                  error={
                    formik.errors?.p_join_guarantors?.length > index &&
                    formik.errors?.p_join_guarantors[index]?.mobile_phone
                  }
                />
                <EditRow
                  label={'電話番号自宅'}
                  field={
                    isEditable ? (
                      <AdEditInput name={`p_join_guarantors[${index}].home_phone`} convertHalfWidth />
                    ) : (
                      item.home_phone
                    )
                  }
                  error={
                    formik.errors?.p_join_guarantors?.length > index &&
                    formik.errors?.p_join_guarantors[index]?.home_phone
                  }
                />
                <EditRow
                  label={'緊急連絡先'}
                  isAddendum
                  field={
                    isEditable ? (
                      <AdEditInput name={`p_join_guarantors[${index}].emergency_contact`} convertHalfWidth />
                    ) : (
                      item.emergency_contact
                    )
                  }
                  error={
                    formik.errors?.p_join_guarantors?.length > index &&
                    formik.errors?.p_join_guarantors[index]?.emergency_contact
                  }
                />
                <EditRow
                  label={'郵便番号'}
                  field={
                    isEditable ? (
                      <AdEditInput name={`p_join_guarantors[${index}].postal_code`} convertHalfWidth />
                    ) : (
                      item.postal_code
                    )
                  }
                  error={
                    formik.errors?.p_join_guarantors?.length > index &&
                    formik.errors?.p_join_guarantors[index]?.postal_code
                  }
                />
                <EditRow
                  label={'都道府県'}
                  isRequired
                  hasPleft={isEditable}
                  field={
                    isEditable ? (
                      <AdSelectRadios name={`p_join_guarantors[${index}].prefecture_kanji`} options={PREFECTURES} />
                    ) : (
                      PREFECTURES.find((item) => item.value === item.prefecture_kanji)?.label
                    )
                  }
                  error={
                    formik.errors?.p_join_guarantors?.length > index &&
                    formik.errors?.p_join_guarantors[index]?.prefecture_kanji
                  }
                />
                <EditRow
                  label={'市区郡'}
                  isRequired
                  field={
                    isEditable ? (
                      <AdEditInput name={`p_join_guarantors[${index}].city_kanji`} convertFullWidth />
                    ) : (
                      item.city_kanji
                    )
                  }
                  error={
                    formik.errors?.p_join_guarantors?.length > index &&
                    formik.errors?.p_join_guarantors[index]?.city_kanji
                  }
                />
                <EditRow
                  label={'町村丁目'}
                  isRequired
                  field={
                    isEditable ? (
                      <AdEditInput name={`p_join_guarantors[${index}].district_kanji`} convertFullWidth />
                    ) : (
                      item.district_kanji
                    )
                  }
                  error={
                    formik.errors?.p_join_guarantors?.length > index &&
                    formik.errors?.p_join_guarantors[index]?.district_kanji
                  }
                />
                <EditRow
                  label={'丁目以下・建物名・部屋番号'}
                  isRequired
                  field={
                    isEditable ? (
                      <AdEditInput name={`p_join_guarantors[${index}].other_address_kanji`} convertFullWidth />
                    ) : (
                      item.other_address_kanji
                    )
                  }
                  error={
                    formik.errors?.p_join_guarantors?.length > index &&
                    formik.errors?.p_join_guarantors[index]?.other_address_kanji
                  }
                />
                <EditRow
                  label={'都道府県（フリガナ）'}
                  isAddendum
                  field={
                    isEditable ? (
                      <AdEditInput name={`p_join_guarantors[${index}].prefecture_kana`} convertFullWidth />
                    ) : (
                      item.prefecture_kana
                    )
                  }
                  error={
                    formik.errors?.p_join_guarantors?.length > index &&
                    formik.errors?.p_join_guarantors[index]?.prefecture_kana
                  }
                />
                <EditRow
                  label={'市区郡（フリガナ）'}
                  isAddendum
                  field={
                    isEditable ? (
                      <AdEditInput name={`p_join_guarantors[${index}].city_kana`} convertFullWidth />
                    ) : (
                      item.city_kana
                    )
                  }
                  error={
                    formik.errors?.p_join_guarantors?.length > index &&
                    formik.errors?.p_join_guarantors[index]?.city_kana
                  }
                />
                <EditRow
                  label={'町村丁目（フリガナ）'}
                  isAddendum
                  field={
                    isEditable ? (
                      <AdEditInput name={`p_join_guarantors[${index}].district_kana`} convertFullWidth />
                    ) : (
                      item.district_kana
                    )
                  }
                  error={
                    formik.errors?.p_join_guarantors?.length > index &&
                    formik.errors?.p_join_guarantors[index]?.district_kana
                  }
                />
                <EditRow
                  label={'丁目以下・建物名・部屋番号（フリガナ）'}
                  isAddendum
                  field={
                    isEditable ? (
                      <AdEditInput name={`p_join_guarantors[${index}].other_address_kana`} convertFullWidth />
                    ) : (
                      item.other_address_kana
                    )
                  }
                  error={
                    formik.errors?.p_join_guarantors?.length > index &&
                    formik.errors?.p_join_guarantors[index]?.other_address_kana
                  }
                />
                <EditRow
                  label={'メールアドレス'}
                  isAddendum
                  field={
                    isEditable ? (
                      <AdEditInput name={`p_join_guarantors[${index}].email`} convertHalfWidth />
                    ) : (
                      item.email
                    )
                  }
                  error={
                    formik.errors?.p_join_guarantors?.length > index && formik.errors?.p_join_guarantors[index]?.email
                  }
                />
              </ContentEditGroup>
            ))}

            {formik.values.p_join_guarantors.length < 4 && (
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
