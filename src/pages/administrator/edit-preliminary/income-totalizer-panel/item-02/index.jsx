import { EditRow } from '../../common/content-edit-row';
import { FormikProvider, useFormik } from 'formik';
import { formatJapanDate } from '@/utils';
import { useEffect } from 'react';
import { AdEditInput, AdSelectRadios, AdZipCodeInput, DayPicker } from '@/components/administrator';
import { genderOptions, nationalityOptions } from './options';
import { diffObj } from '@/utils';
import { PREFECTURES } from '@/constant';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { ContentEditGroup } from '../../common/content-edit-group';
import { tab02Schema, tab02SchemaI } from '../../fullSchema';
import dayjs from 'dayjs';
import { infoGroupTabAtom } from '@/store';
import { useSetRecoilState } from 'recoil';

export const Item02 = () => {
  const setInfoGroupTab = useSetRecoilState(infoGroupTabAtom);
  const {
    preliminaryInfo: { p_application_headers, p_applicant_persons__1 },
    preliminarySnap: { changeJoinGuarantor, changeToIncomeTotalizer },
    setPreliminarySnap,
    handleSave,
    isEditable,
  } = usePreliminaryContext();

  const initialValues = {
    p_applicant_persons__1: {
      last_name_kanji: p_applicant_persons__1?.last_name_kanji,
      first_name_kanji: p_applicant_persons__1?.first_name_kanji,
      last_name_kana: p_applicant_persons__1?.last_name_kana,
      first_name_kana: p_applicant_persons__1?.first_name_kana,
      gender: p_applicant_persons__1?.gender,
      birthday: p_applicant_persons__1?.birthday,
      nationality: p_applicant_persons__1?.nationality,
      mobile_phone: p_applicant_persons__1?.mobile_phone,
      home_phone: p_applicant_persons__1?.home_phone,
      emergency_contact: p_applicant_persons__1?.emergency_contact,
      postal_code: p_applicant_persons__1?.postal_code,
      prefecture_kanji: p_applicant_persons__1?.prefecture_kanji,
      city_kanji: p_applicant_persons__1?.city_kanji,
      district_kanji: p_applicant_persons__1?.district_kanji,
      other_address_kanji: p_applicant_persons__1?.other_address_kanji,
      prefecture_kana: p_applicant_persons__1?.prefecture_kana,
      city_kana: p_applicant_persons__1?.city_kana,
      district_kana: p_applicant_persons__1?.district_kana,
      other_address_kana: p_applicant_persons__1?.other_address_kana,
      email: p_applicant_persons__1?.email,
    },
  };

  const setUpdateData = (values) => {
    const diffData = {
      p_applicant_persons__1: {
        ...diffObj(initialValues.p_applicant_persons__1, values.p_applicant_persons__1),
      },
      p_application_headers: {
        loan_type: p_application_headers?.loan_type,
      },
    };
    return diffData;
  };

  const formik = useFormik({
    initialValues,
    validationSchema: tab02SchemaI,
    validateOnMount: true,
    onSubmit: (values) => {
      setInfoGroupTab(3);
    },
  });

  useEffect(() => {
    setPreliminarySnap((pre) => {
      return {
        ...pre,
        p_applicant_persons__1: {
          ...pre.p_applicant_persons__1,
          ...formik.values.p_applicant_persons__1,
        },
      };
    });
  }, [formik.values]);

  useEffect(() => {
    console.log(formik.errors);
  }, [formik.errors]);

  return (
    <FormikProvider value={formik}>
      <ContentEditGroup
        isEditable={isEditable}
        handleSave={() => {
          if (changeToIncomeTotalizer) {
            formik.handleSubmit();
          } else {
            handleSave(setUpdateData(formik.values));
          }
        }}
      >
        <EditRow
          label={'お名前（姓）'}
          isRequired
          field={
            isEditable ? (
              <AdEditInput name="p_applicant_persons__1.last_name_kanji" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.last_name_kanji
            )
          }
          error={formik.errors?.p_applicant_persons__1?.last_name_kanji}
        />
        <EditRow
          label={'お名前（名）'}
          isRequired
          field={
            isEditable ? (
              <AdEditInput name="p_applicant_persons__1.first_name_kanji" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.first_name_kanji
            )
          }
          error={formik.errors?.p_applicant_persons__1?.first_name_kanji}
        />
        <EditRow
          label={'お名前（姓）（フリガナ）'}
          isRequired
          field={
            isEditable ? (
              <AdEditInput name="p_applicant_persons__1.last_name_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.last_name_kana
            )
          }
          error={formik.errors?.p_applicant_persons__1?.last_name_kana}
        />
        <EditRow
          label={'お名前（名）（フリガナ）'}
          isRequired
          field={
            isEditable ? (
              <AdEditInput name="p_applicant_persons__1.first_name_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.first_name_kana
            )
          }
          error={formik.errors?.p_applicant_persons__1?.first_name_kana}
        />
        <EditRow
          label={'性別'}
          isRequired
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios name="p_applicant_persons__1.gender" options={genderOptions} />
            ) : (
              genderOptions.find((item) => item.value === formik.values.p_applicant_persons__1.gender)?.label
            )
          }
          error={formik.errors?.p_applicant_persons__1?.gender}
        />
        <EditRow
          label={'生年月日'}
          isRequired
          hasPleft={isEditable}
          field={
            isEditable ? (
              <DayPicker
                name="p_applicant_persons__1.birthday"
                minDate={dayjs().subtract(65, 'y')}
                maxDate={dayjs().subtract(18, 'y')}
              />
            ) : (
              formatJapanDate(formik.values.p_applicant_persons__1.birthday, true)
            )
          }
          error={formik.errors?.p_applicant_persons__1?.birthday}
        />
        <EditRow
          label={'現在の国籍'}
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios name="p_applicant_persons__1.nationality" options={nationalityOptions} />
            ) : (
              nationalityOptions.find((item) => item.value === formik.values.p_applicant_persons__1.nationality)?.label
            )
          }
          error={formik.errors?.p_applicant_persons__1?.nationality}
        />
        <EditRow
          label={'電話番号携帯'}
          isLogicRequired
          field={
            isEditable ? (
              <AdEditInput name="p_applicant_persons__1.mobile_phone" />
            ) : (
              formik.values.p_applicant_persons__1.mobile_phone
            )
          }
          error={formik.errors?.p_applicant_persons__1?.mobile_phone}
        />
        <EditRow
          label={'電話番号自宅'}
          isLogicRequired
          field={
            isEditable ? (
              <AdEditInput name="p_applicant_persons__1.home_phone" />
            ) : (
              formik.values.p_applicant_persons__1.home_phone
            )
          }
          error={formik.errors?.p_applicant_persons__1?.home_phone}
        />
        <EditRow
          label={'緊急連絡先'}
          isAddendum
          field={
            isEditable ? (
              <AdEditInput name="p_applicant_persons__1.emergency_contact" />
            ) : (
              formik.values.p_applicant_persons__1.emergency_contact
            )
          }
          error={formik.errors?.p_applicant_persons__1?.emergency_contact}
        />
        <EditRow
          label={'郵便番号'}
          isRequired
          field={
            isEditable ? (
              <AdZipCodeInput
                name="p_applicant_persons__1.postal_code"
                callback={(values) => {
                  formik.setFieldValue('p_applicant_persons__1.prefecture_kanji', values.prefecture_kanji);
                  formik.setFieldValue('p_applicant_persons__1.city_kanji', values.city_kanji);
                  formik.setFieldValue('p_applicant_persons__1.district_kanji', values.district_kanji);
                  formik.setFieldValue('p_applicant_persons__1.prefecture_kana', values.prefecture_kana);
                  formik.setFieldValue('p_applicant_persons__1.city_kana', values.city_kana);
                  formik.setFieldValue('p_applicant_persons__1.district_kana', values.district_kana);
                }}
              />
            ) : (
              formik.values.p_applicant_persons__1.postal_code
            )
          }
          error={formik.errors?.p_applicant_persons__1?.postal_code}
        />
        <EditRow
          label={'都道府県'}
          isRequired
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios name="p_applicant_persons__1.prefecture_kanji" options={PREFECTURES} />
            ) : (
              PREFECTURES.find((item) => item.value === formik.values.p_applicant_persons__1.prefecture_kanji)?.label
            )
          }
          error={formik.errors?.p_applicant_persons__1?.prefecture_kanji}
        />
        <EditRow
          label={'市区郡'}
          isRequired
          field={
            isEditable ? (
              <AdEditInput name="p_applicant_persons__1.city_kanji" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.city_kanji
            )
          }
          error={formik.errors?.p_applicant_persons__1?.city_kanji}
        />
        <EditRow
          label={'町村丁目'}
          isRequired
          field={
            isEditable ? (
              <AdEditInput name="p_applicant_persons__1.district_kanji" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.district_kanji
            )
          }
          error={formik.errors?.p_applicant_persons__1?.district_kanji}
        />
        <EditRow
          label={'丁目以下・建物名・部屋番号'}
          isRequired
          field={
            isEditable ? (
              <AdEditInput name="p_applicant_persons__1.other_address_kanji" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.other_address_kanji
            )
          }
          error={formik.errors?.p_applicant_persons__1?.other_address_kanji}
        />
        <EditRow
          label={'都道府県（フリガナ）'}
          isRequired
          isAddendum
          field={
            isEditable ? (
              <AdEditInput name="p_applicant_persons__1.prefecture_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.prefecture_kana
            )
          }
          error={formik.errors?.p_applicant_persons__1?.prefecture_kana}
        />
        <EditRow
          label={'市区郡（フリガナ）'}
          isRequired
          isAddendum
          field={
            isEditable ? (
              <AdEditInput name="p_applicant_persons__1.city_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.city_kana
            )
          }
          error={formik.errors?.p_applicant_persons__1?.city_kana}
        />
        <EditRow
          label={'町村丁目（フリガナ）'}
          isRequired
          isAddendum
          field={
            isEditable ? (
              <AdEditInput name="p_applicant_persons__1.district_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.district_kana
            )
          }
          error={formik.errors?.p_applicant_persons__1?.district_kana}
        />
        <EditRow
          label={'丁目以下・建物名・部屋番号（フリガナ）'}
          isRequired
          isAddendum
          field={
            isEditable ? (
              <AdEditInput name="p_applicant_persons__1.other_address_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.other_address_kana
            )
          }
          error={formik.errors?.p_applicant_persons__1?.other_address_kana}
        />
        <EditRow
          label={'ご連絡先用メールアドレス'}
          field={
            isEditable ? (
              <AdEditInput name="p_applicant_persons__1.email" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.email
            )
          }
          error={formik.errors?.p_applicant_persons__1?.email}
        />
      </ContentEditGroup>
    </FormikProvider>
  );
};
